import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

async function debugResources() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected\n');

        const course = await Course.findOne({ title: { $regex: /vedic.*astrology/i } });
        if (!course) {
            console.log('❌ No Vedic Astrology course found');
            return;
        }

        const module = await Module.findOne({ courseId: course._id, title: { $regex: /introduction/i } });
        if (!module) {
            console.log('❌ No Introduction module found');
            return;
        }

        const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

        console.log('='.repeat(80));
        console.log('RESOURCES IN INTRODUCTION MODULE');
        console.log('='.repeat(80));

        videos.forEach((video, idx) => {
            console.log(`\n[${idx + 1}] VIDEO: "${video.title}"`);
            console.log(`    ID: ${video._id}`);
            console.log(`    Video R2 Path: ${video.r2Path}`);

            if (video.resources && video.resources.length > 0) {
                console.log(`\n    RESOURCES (${video.resources.length}):`);
                video.resources.forEach((res, resIdx) => {
                    console.log(`    ┌─ [${resIdx + 1}] ${res.title}`);
                    console.log(`    ├─ Resource ID: ${res._id}`);
                    console.log(`    ├─ Type: ${res.type}`);
                    console.log(`    └─ R2 Path: "${res.r2Path}"`);
                    console.log('');
                });
            } else {
                console.log('    (No resources)');
            }
        });

        console.log('='.repeat(80));

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

debugResources();
