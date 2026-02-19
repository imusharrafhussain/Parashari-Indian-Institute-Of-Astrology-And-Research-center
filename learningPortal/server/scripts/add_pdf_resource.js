import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

/**
 * Script to add PDF resource to a specific Video document
 * This script finds the Vedic Astrology Introduction video and adds lesson1Notes.pdf
 */

async function addPDFResource() {
    try {
        // Connect to MongoDB
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Step 1: Find the Vedic Astrology course
        console.log('🔍 Searching for Vedic Astrology course...');
        const course = await Course.findOne({
            title: { $regex: /vedic.*astrology/i }
        });

        if (!course) {
            console.error('❌ Vedic Astrology course not found');
            console.log('\nAvailable courses:');
            const allCourses = await Course.find({}, 'title');
            allCourses.forEach(c => console.log(`   - ${c.title} (ID: ${c._id})`));
            process.exit(1);
        }

        console.log(`✅ Found course: "${course.title}" (ID: ${course._id})\n`);

        // Step 2: Find the Introduction module
        console.log('🔍 Searching for Introduction module...');
        const module = await Module.findOne({
            courseId: course._id,
            title: { $regex: /introduction/i }
        });

        if (!module) {
            console.error('❌ Introduction module not found');
            console.log('\nAvailable modules for this course:');
            const allModules = await Module.find({ courseId: course._id }, 'title');
            allModules.forEach(m => console.log(`   - ${m.title} (ID: ${m._id})`));
            process.exit(1);
        }

        console.log(`✅ Found module: "${module.title}" (ID: ${module._id})\n`);

        // Step 3: Find videos in this module
        console.log('🔍 Finding videos in the Introduction module...');
        const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

        if (videos.length === 0) {
            console.error('❌ No videos found in this module');
            process.exit(1);
        }

        console.log(`✅ Found ${videos.length} video(s) in this module:\n`);
        videos.forEach((v, index) => {
            console.log(`   ${index + 1}. ${v.title}`);
            console.log(`      - ID: ${v._id}`);
            console.log(`      - Existing resources: ${v.resources?.length || 0}`);
            console.log('');
        });

        // Step 4: Select the first video (or you can modify this logic)
        const targetVideo = videos[0];
        console.log(`📌 Target video selected: "${targetVideo.title}"\n`);

        // Step 5: Check if resource already exists
        const existingResource = targetVideo.resources?.find(
            r => r.title === 'Lesson 1 Notes' || r.r2Path.includes('lesson1Notes.pdf')
        );

        if (existingResource) {
            console.log('⚠️  Resource "Lesson 1 Notes" already exists!');
            console.log(`   - Resource ID: ${existingResource._id}`);
            console.log(`   - Title: ${existingResource.title}`);
            console.log(`   - Type: ${existingResource.type}`);
            console.log(`   - R2 Path: ${existingResource.r2Path}`);
            console.log('\n✅ No action needed. Resource is already configured.\n');
            process.exit(0);
        }

        // Step 6: Add the PDF resource
        console.log('📝 Adding PDF resource to the video...\n');

        const newResource = {
            title: 'Lesson 1 Notes',
            type: 'pdf',
            r2Path: 'courses/VedicAstrology/Introduction/LessonNotes/lesson1Notes.pdf'
        };

        targetVideo.resources.push(newResource);
        await targetVideo.save();

        console.log('✅ PDF Resource added successfully!\n');
        console.log('📋 Resource Details:');
        console.log(`   - Title: ${newResource.title}`);
        console.log(`   - Type: ${newResource.type}`);
        console.log(`   - R2 Path: ${newResource.r2Path}`);

        // Get the newly added resource (last in array)
        const addedResource = targetVideo.resources[targetVideo.resources.length - 1];
        console.log(`   - Resource ID: ${addedResource._id}`);
        console.log('');
        console.log('🎉 Implementation complete!\n');
        console.log('📍 Next Steps:');
        console.log('   1. Navigate to the Learning Portal (http://localhost:5173)');
        console.log('   2. Go to: Courses → Vedic Astrology → Introduction');
        console.log(`   3. Click on: "${targetVideo.title}"`);
        console.log('   4. Look for "Resources" section in the right panel');
        console.log('   5. Click on "📄 Lesson 1 Notes" to open the PDF viewer\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the script
addPDFResource();
