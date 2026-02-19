/**
 * Fix Vedic Astrology Video Paths
 * 
 * This script updates the r2Path for all Vedic Astrology videos
 * to use the correct format: resources/vedic-astrology/module-slug/lesson-X-videos/index.m3u8
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function fixVedicPaths() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const db = mongoose.connection.db;

        // Find Vedic Astrology course
        const course = await db.collection('courses').findOne({ slug: 'vedic-astrology' });
        if (!course) {
            console.log('❌ Vedic Astrology course not found');
            process.exit(1);
        }

        console.log(`📚 Course: ${course.title}`);
        console.log(`   ID: ${course._id}\n`);

        // Get all modules
        const modules = await db.collection('modules').find({ courseId: course._id }).sort({ orderIndex: 1 }).toArray();
        console.log(`Found ${modules.length} modules\n`);

        let updateCount = 0;

        for (const module of modules) {
            console.log(`📁 Module: ${module.title}`);

            // Determine module slug from title
            const moduleSlug = module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            // Get videos for this module
            const videos = await db.collection('videos').find({ moduleId: module._id }).sort({ orderIndex: 1 }).toArray();
            console.log(`   Videos: ${videos.length}`);

            for (const video of videos) {
                const lessonNumber = video.orderIndex + 1;
                const expectedPath = `resources/vedic-astrology/${moduleSlug}/lesson-${lessonNumber}-videos/index.m3u8`;

                console.log(`   🎥 Lesson ${lessonNumber}: ${video.title}`);
                console.log(`      Current path: ${video.r2Path || 'MISSING'}`);
                console.log(`      Expected path: ${expectedPath}`);

                if (video.r2Path !== expectedPath) {
                    console.log(`      📝 Updating...`);
                    await db.collection('videos').updateOne(
                        { _id: video._id },
                        { $set: { r2Path: expectedPath } }
                    );
                    updateCount++;
                    console.log(`      ✅ Updated`);
                } else {
                    console.log(`      ✓ Already correct`);
                }
                console.log('');
            }
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log(`✅ Update complete!`);
        console.log(`   Total videos updated: ${updateCount}`);
        console.log(`${'='.repeat(60)}\n`);

        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

fixVedicPaths();
