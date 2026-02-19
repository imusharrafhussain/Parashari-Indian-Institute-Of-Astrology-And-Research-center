import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

/**
 * Verification Script - Check if PDF resource exists and display details
 */

async function verifyPDFResource() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Find Vedic Astrology course
        const course = await Course.findOne({
            title: { $regex: /vedic.*astrology/i }
        });

        if (!course) {
            console.error('❌ Vedic Astrology course not found');
            process.exit(1);
        }

        console.log(`✅ Course: "${course.title}"\n`);

        // Find Introduction module
        const module = await Module.findOne({
            courseId: course._id,
            title: { $regex: /introduction/i }
        });

        if (!module) {
            console.error('❌ Introduction module not found');
            process.exit(1);
        }

        console.log(`✅ Module: "${module.title}"\n`);

        // Find all videos with resources
        const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

        console.log('📹 Videos in Introduction Module:\n');
        videos.forEach((video, index) => {
            console.log(`${index + 1}. ${video.title}`);
            console.log(`   - Video ID: ${video._id}`);
            console.log(`   - R2 Path: ${video.r2Path}`);

            if (video.resources && video.resources.length > 0) {
                console.log(`   - Resources (${video.resources.length}):`);
                video.resources.forEach((res, resIndex) => {
                    console.log(`     ${resIndex + 1}. ${res.title}`);
                    console.log(`        • Resource ID: ${res._id}`);
                    console.log(`        • Type: ${res.type}`);
                    console.log(`        • R2 Path: ${res.r2Path}`);
                });
            } else {
                console.log(`   - Resources: None`);
            }
            console.log('');
        });

        console.log('✅ Verification complete!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

verifyPDFResource();
