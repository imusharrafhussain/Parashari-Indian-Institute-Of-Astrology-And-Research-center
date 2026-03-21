const fs = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, 'public', 'images');
const OUTPUT_DIR = path.join(__dirname, 'public', 'images-optimized');
const CONCURRENCY_LIMIT = 10;
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png'];

const args = process.argv.slice(2);
const deleteOriginals = args.includes('--delete-originals');

// Helper to get all files recursively
async function getFiles(dir) {
    let files = [];
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                files = files.concat(await getFiles(fullPath));
            } else {
                files.push(fullPath);
            }
        }
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error(`Error reading directory ${dir}:`, error.message);
        }
    }
    return files;
}

// Concurrency limiter to prevent memory crashes with many images
async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = [];
    const executing = [];
    for (const item of array) {
        const p = Promise.resolve().then(() => iteratorFn(item));
        ret.push(p);

        if (poolLimit <= array.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= poolLimit) {
                await Promise.race(executing);
            }
        }
    }
    return Promise.all(ret);
}

// Stats tracking
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;
let skippedCount = 0;
let errorCount = 0;

async function processImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!SUPPORTED_EXTS.includes(ext)) return;

    const relativePath = path.relative(INPUT_DIR, filePath);
    const outputFilePath = path.join(OUTPUT_DIR, relativePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp'));
    const outputDirPath = path.dirname(outputFilePath);

    // Skip if already converted
    if (existsSync(outputFilePath)) {
        skippedCount++;
        return;
    }

    try {
        // Ensure output folder structure exists
        await fs.mkdir(outputDirPath, { recursive: true });

        const originalStat = await fs.stat(filePath);

        // Process with sharp (convert to webp, resize max 1200px, quality 70, remove metadata)
        await sharp(filePath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 70 })
            .withMetadata(false) // removes metadata
            .toFile(outputFilePath);

        const optimizedStat = await fs.stat(outputFilePath);

        const origSizeKb = (originalStat.size / 1024).toFixed(2);
        const optSizeKb = (optimizedStat.size / 1024).toFixed(2);
        const savedPercent = ((1 - (optimizedStat.size / originalStat.size)) * 100).toFixed(1);

        console.log(`[OK] ${relativePath}: ${origSizeKb}KB -> ${optSizeKb}KB (${savedPercent}% saved)`);

        totalOriginalSize += originalStat.size;
        totalOptimizedSize += optimizedStat.size;
        processedCount++;

        // Bonus: Delete original if flag is provided
        if (deleteOriginals) {
            await fs.unlink(filePath);
        }

    } catch (error) {
        errorCount++;
        console.error(`[ERROR] Failed to process ${relativePath}: ${error.message}`);
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {
    console.log(`Starting image optimization...`);
    console.log(`Input: ${INPUT_DIR}`);
    console.log(`Output: ${OUTPUT_DIR}`);
    if (deleteOriginals) console.log(`NOTE: Original images WILL BE DELETED after conversion.`);
    
    // Ensure input dir exists before starting
    if (!existsSync(INPUT_DIR)) {
        console.error(`\n[ERROR] Input directory not found: ${INPUT_DIR}`);
        return;
    }

    const files = await getFiles(INPUT_DIR);
    const imageFiles = files.filter(f => SUPPORTED_EXTS.includes(path.extname(f).toLowerCase()));

    console.log(`Found ${imageFiles.length} images to process.\n`);

    if (imageFiles.length === 0) return;

    // Run parallel processing with a safe limit of 10 concurrent files
    await asyncPool(CONCURRENCY_LIMIT, imageFiles, processImage);

    console.log(`\n--- Optimization Complete ---`);
    console.log(`Processed: ${processedCount}`);
    console.log(`Skipped (already exists): ${skippedCount}`);
    console.log(`Errors: ${errorCount}`);
    
    if (processedCount > 0) {
        const savedSpace = totalOriginalSize - totalOptimizedSize;
        console.log(`\nTotal Original Size: ${formatBytes(totalOriginalSize)}`);
        console.log(`Total Optimized Size: ${formatBytes(totalOptimizedSize)}`);
        console.log(`Total Space Saved: ${formatBytes(savedSpace)} (${((savedSpace / totalOriginalSize) * 100).toFixed(2)}%)`);
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
