import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';
import fs from 'fs';

dotenv.config();

/**
 * PHASE 2: MongoDB Path Migration Script
 * 
 * Migrates all courses/ and test-course/ paths to resources/
 * Uses DB-backed slugs for canonical path construction
 * 
 * SAFETY:
 * - Dry-run mode by default
 * - Atomic updates per document
 * - Full logging
 */

const DRY_RUN = process.env.DRY_RUN !== 'false'; // Default: true

let migrationLog = '';
let summary = {
    totalProcessed: 0,
    videoPaths: 0,
    resourcePaths: 0,
    errors: []
};

function log(message) {
    migrationLog += message + '\n';
    console.log(message);
}

/**
 * Generates canonical resource path from course/module slugs
 */
function generateResourcePath(courseSlug, moduleTitle, lessonNumber, type, filename) {
    // Normalize module title to slug (basic/core/advanced)
    let moduleSlug = moduleTitle.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, 'and')
        .replace(/[()]/g, '');

    // Map to canonical names if needed
    if (moduleTitle.includes('Introduction') || moduleTitle.includes('Basics')) {
        moduleSlug = 'basic';
    } else if (moduleTitle.includes('Core')) {
        moduleSlug = 'core';
    } else if (moduleTitle.includes('Advanced')) {
        moduleSlug = 'advanced';
    }

    // Construct path
    const basePath = `resources/${courseSlug}/${moduleSlug}`;

    if (type === 'video') {
        return `${basePath}/lesson-${lessonNumber}-videos/index.m3u8`;
    } else if (type === 'notes') {
        return `${basePath}/lesson-${lessonNumber}-notes/${filename || `lesson${lessonNumber}Notes.pdf`}`;
    } else if (type === 'ebook') {
        return `${basePath}/lesson-${lessonNumber}-ebooks/${filename || 'ebook.pdf'}`;
    }

    return null;
}

/**
 * Check if path needs migration
 */
function needsMigration(path) {
    if (!path) return false;
    return path.startsWith('courses/') || path.includes('test-course');
}

async function migrateCoursesToResources() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        log('✅ Connected to MongoDB\n');

        if (DRY_RUN) {
            log('🔵 DRY RUN MODE - No changes will be made\n');
        } else {
            log('🔴 LIVE MODE - Changes will be committed to database\n');
        }

        log('='.repeat(80));
        log('PHASE 2: MongoDB Path Migration');
        log('='.repeat(80) + '\n');

        const courses = await Course.find({});
        log(`📚 Found ${courses.length} courses\n`);

        for (const course of courses) {
            log(`\n${'━'.repeat(80)}`);
            log(`📚 Course: ${course.title}`);
            log(`   Slug: ${course.slug}`);

            const modules = await Module.find({ courseId: course._id }).sort({ orderIndex: 1 });
            log(`   Modules: ${modules.length}`);

            for (const module of modules) {
                const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });
                log(`\n   📁 Module: ${module.title} (${videos.length} videos)`);

                for (const video of videos) {
                    summary.totalProcessed++;
                    const lessonNumber = video.orderIndex + 1;
                    let modified = false;

                    // Migrate video R2 path
                    if (needsMigration(video.r2Path)) {
                        const oldPath = video.r2Path;
                        const newPath = generateResourcePath(
                            course.slug,
                            module.title,
                            lessonNumber,
                            'video',
                            'index.m3u8'
                        );

                        log(`\n      🎥 Video: ${video.title}`);
                        log(`         OLD: ${oldPath}`);
                        log(`         NEW: ${newPath}`);

                        if (!DRY_RUN) {
                            video.r2Path = newPath;
                            modified = true;
                        }
                        summary.videoPaths++;
                    }

                    // Migrate resource paths
                    if (video.resources && video.resources.length > 0) {
                        for (const resource of video.resources) {
                            if (needsMigration(resource.r2Path)) {
                                const oldPath = resource.r2Path;
                                const type = resource.title.toLowerCase().includes('notes') ? 'notes' : 'ebook';
                                const filename = oldPath.split('/').pop();

                                const newPath = generateResourcePath(
                                    course.slug,
                                    module.title,
                                    lessonNumber,
                                    type,
                                    filename
                                );

                                log(`\n      📄 Resource: ${resource.title}`);
                                log(`         OLD: ${oldPath}`);
                                log(`         NEW: ${newPath}`);

                                if (!DRY_RUN) {
                                    resource.r2Path = newPath;
                                    modified = true;
                                }
                                summary.resourcePaths++;
                            }
                        }
                    }

                    // Save video if modified
                    if (modified) {
                        try {
                            await video.save();
                            log(`         ✅ Saved`);
                        } catch (error) {
                            const errorMsg = `Error saving video ${video._id}: ${error.message}`;
                            log(`         ❌ ${errorMsg}`);
                            summary.errors.push(errorMsg);
                        }
                    }
                }
            }
        }

        log('\n' + '='.repeat(80));
        log('MIGRATION SUMMARY');
        log('='.repeat(80));
        log(`\nMode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
        log(`Total Videos Processed: ${summary.totalProcessed}`);
        log(`Video Paths Migrated: ${summary.videoPaths}`);
        log(`Resource Paths Migrated: ${summary.resourcePaths}`);
        log(`Total Paths Migrated: ${summary.videoPaths + summary.resourcePaths}`);
        log(`Errors: ${summary.errors.length}`);

        if (summary.errors.length > 0) {
            log('\n❌ ERRORS:');
            summary.errors.forEach(err => log(`   - ${err}`));
        }

        if (DRY_RUN) {
            log('\n🔵 DRY RUN COMPLETE - No changes were made');
            log('   To execute migration, run: DRY_RUN=false node scripts/migrate_courses_to_resources.js');
        } else {
            log('\n✅ MIGRATION COMPLETE');
            log('   Next step: Run schema audit to verify');
            log('   Command: node scripts/step1_schema_audit.js');
        }

        log('\n' + '='.repeat(80));

        // Save log
        const logFilename = DRY_RUN ? 'migration_dry_run.log' : 'migration_live.log';
        fs.writeFileSync(`./scripts/${logFilename}`, migrationLog);
        log(`\n📄 Log saved to: scripts/${logFilename}`);

    } catch (error) {
        log(`\n❌ FATAL ERROR: ${error.message}`);
        log(error.stack);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        log('\n🔌 Disconnected from MongoDB');
    }
}

// Execute
migrateCoursesToResources();
