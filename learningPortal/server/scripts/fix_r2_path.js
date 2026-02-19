import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';

dotenv.config();

/**
 * Fix R2 Path for Lesson 1 Notes
 * Current: resources/vedic-astrology/introduction/lesson-1-notes/lesson1Notes.pdf
 * Should be: courses/VedicAstrology/Introduction/LessonNotes/lesson1Notes.pdf
 * (Based on Cloudflare R2 folder structure)
 */

async function fixR2Path() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find the video with the resource
        const video = await Video.findOne({ 'resources.title': 'Lesson Notes' });

        if (!video) {
            console.log('❌ Video with "Lesson Notes" resource not found');
            return;
        }

        console.log(`📹 Video: "${video.title}"`);
        console.log(`   Video ID: ${video._id}\n`);

        // Find the specific resource
        const resource = video.resources.find(r => r.title === 'Lesson Notes');

        if (!resource) {
            console.log('❌ Resource not found');
            return;
        }

        console.log('📄 Current Resource Configuration:');
        console.log(`   Resource ID: ${resource._id}`);
        console.log(`   Title: ${resource.title}`);
        console.log(`   Type: ${resource.type}`);
        console.log(`   Current R2 Path: "${resource.r2Path}"`);
        console.log('');

        // Ask user for confirmation
        console.log('─'.repeat(80));
        console.log('PROPOSED CHANGE:');
        console.log('─'.repeat(80));
        console.log('FROM: ' + resource.r2Path);
        console.log('TO  : courses/VedicAstrology/Introduction/LessonNotes/lesson1Notes.pdf');
        console.log('─'.repeat(80));
        console.log('');
        console.log('Please provide the EXACT R2 path from your Cloudflare bucket.');
        console.log('Looking at your folder structure, it should be one of:');
        console.log('  1. courses/Vedic Astrology/Introduction/Lesson Notes/lesson1Notes.pdf');
        console.log('  2. courses/VedicAstrology/Introduction/LessonNotes/lesson1Notes.pdf');
        console.log('  3. (or the exact path you see in Cloudflare R2)');
        console.log('');
        console.log('⚠️  NOT updating automatically - please verify the correct path first!');
        console.log('');
        console.log('To update, modify this script with the correct path and uncomment the save logic.\n');

        // UNCOMMENT BELOW AFTER CONFIRMING THE CORRECT PATH:
        /*
        resource.r2Path = 'courses/VedicAstrology/Introduction/LessonNotes/lesson1Notes.pdf';
        await video.save();
        console.log('✅ R2 Path updated successfully!');
        */

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

fixR2Path();
