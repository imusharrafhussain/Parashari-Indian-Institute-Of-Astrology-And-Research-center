import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

async function quickCheck() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Find any course that's NOT Vedic Astrology
        const course = await Course.findOne({
            title: { $regex: /nadi/i }
        }).populate({
            path: 'modules',
            populate: {
                path: 'videos'
            }
        });

        if (!course) {
            console.log('No Nadi Jyotish course found');
            return;
        }

        console.log(`Course: ${course.title}`);
        console.log(`Modules: ${course.modules?.length || 0}`);

        if (course.modules && course.modules.length > 0) {
            const firstModule = course.modules[0];
            console.log(`\nFirst Module: ${firstModule.title}`);
            console.log(`Videos: ${firstModule.videos?.length || 0}`);

            if (firstModule.videos && firstModule.videos.length > 0) {
                const firstVideo = firstModule.videos[0];
                console.log(`\nFirst Video: ${firstVideo.title}`);
                console.log(`Resources count: ${firstVideo.resources?.length || 0}`);

                if (firstVideo.resources && firstVideo.resources.length > 0) {
                    console.log('\nResources:');
                    firstVideo.resources.forEach((r, i) => {
                        console.log(`  ${i + 1}. ${r.title} (${r.type})`);
                    });
                    console.log('\n✅ SUCCESS! Resources are showing!');
                } else {
                    console.log('\n❌ PROBLEM: No resources found!');
                }
            }
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

quickCheck();
