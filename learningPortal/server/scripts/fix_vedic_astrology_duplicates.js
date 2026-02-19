import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

async function fixVedicAstrology() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find Vedic Astrology course
        const vedicCourse = await Course.findOne({ title: /vedic.*astrology/i });

        if (!vedicCourse) {
            console.log('❌ Vedic Astrology course not found!');
            return;
        }

        console.log(`📚 Course: ${vedicCourse.title}`);
        console.log(`ID: ${vedicCourse._id}\n`);
        console.log('='.repeat(70));

        // Get all modules
        const modules = await Module.find({ courseId: vedicCourse._id }).sort({ orderIndex: 1 });

        let totalFixed = 0;
        let totalVideos = 0;

        for (const module of modules) {
            console.log(`\n📁 Module: ${module.title}`);
            const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

            for (const video of videos) {
                totalVideos++;
                const videoNum = video.orderIndex + 1;

                console.log(`\n   Video ${videoNum}: "${video.title}"`);
                console.log(`   Before: ${video.resources?.length || 0} resources`);

                let modified = false;

                // Fix 1: Remove duplicate resources
                if (video.resources && video.resources.length > 2) {
                    // Keep only "Lesson Notes" and "Lesson eBook"
                    // Remove "Lecture Notes" and old sample resources
                    const cleanedResources = video.resources.filter(r => {
                        const keep = (
                            r.title === 'Lesson Notes' ||
                            r.title === 'Lesson eBook'
                        ) && !r.r2Path.includes('courses/sample');

                        if (!keep) {
                            console.log(`   🗑️  Removing: "${r.title}" (${r.r2Path})`);
                        }
                        return keep;
                    });

                    video.resources = cleanedResources;
                    modified = true;
                }

                // Fix 2: Fix video R2 path if it's a test path
                if (video.r2Path && video.r2Path.includes('test-course')) {
                    // Use the pattern from the module and video number
                    // Based on Video 1 pattern: resources/vedic-astrology/introduction/lesson-1-videos/index.m3u8
                    const moduleName = module.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
                    const lessonNum = videoNum;
                    const newR2Path = `resources/vedic-astrology/${moduleName}/lesson-${lessonNum}-videos/index.m3u8`;

                    console.log(`   🔧 Fixing video path:`);
                    console.log(`      Old: ${video.r2Path}`);
                    console.log(`      New: ${newR2Path}`);

                    video.r2Path = newR2Path;
                    modified = true;
                }

                if (modified) {
                    await video.save();
                    totalFixed++;
                    console.log(`   ✅ Fixed! Now has ${video.resources.length} resources`);
                } else {
                    console.log(`   ℹ️  No changes needed`);
                }
            }
        }

        console.log('\n' + '='.repeat(70));
        console.log(`\n📊 SUMMARY:`);
        console.log(`   Total videos processed: ${totalVideos}`);
        console.log(`   Videos fixed: ${totalFixed}`);
        console.log('\n✅ Vedic Astrology course has been fixed!');
        console.log('\n📍 Next Steps:');
        console.log('   1. Refresh the browser at http://localhost:5173');
        console.log('   2. Navigate to Vedic Astrology course');
        console.log('   3. Check Lesson 2 and beyond - should show only 2 resources');
        console.log('   4. Test video playback for Lessons 2-9\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

fixVedicAstrology();
