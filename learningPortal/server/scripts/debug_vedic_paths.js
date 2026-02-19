import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Video from '../models/Video.js';

dotenv.config();

/**
 * Debug script to check Vedic Astrology video paths
 */

async function checkVedicAstrologyPaths() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find Vedic Astrology course
        const course = await Course.findOne({ slug: 'vedic-astrology' });
        if (!course) {
            console.log('❌ Vedic Astrology course not found');
            process.exit(1);
        }

        console.log(`📚 Course: ${course.title}`);
        console.log(`   ID: ${course._id}`);
        console.log(`   Slug: ${course.slug}\n`);

        // Get all modules for this course
        const modules = await Module.find({ courseId: course._id }).sort({ orderIndex: 1 });
        console.log(`Found ${modules.length} modules\n`);

        for (const module of modules) {
            console.log(`📁 Module: ${module.title} (Order: ${module.orderIndex})`);

            // Get videos for this module
            const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });
            console.log(`   Videos: ${videos.length}\n`);

            for (const video of videos) {
                console.log(`   🎥 Video ${video.orderIndex + 1}: ${video.title}`);
                console.log(`      ID: ${video._id}`);
                console.log(`      R2 Path: ${video.r2Path || 'MISSING'}`);
                console.log(`      Active: ${video.active}`);

                // Check if path exists and is correct
                if (!video.r2Path) {
                    console.log(`      ⚠️  WARNING: No R2 path set!`);
                } else if (video.r2Path.includes('test-course')) {
                    console.log(`      ❌ ERROR: Still using test-course path!`);
                } else if (!video.r2Path.startsWith('resources/')) {
                    console.log(`      ❌ ERROR: Path doesn't start with resources/`);
                } else {
                    console.log(`      ✅ Path looks correct`);
                }

                console.log('');
            }
            console.log('━'.repeat(80) + '\n');
        }

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

checkVedicAstrologyPaths();
