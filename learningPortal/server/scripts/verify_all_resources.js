import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

async function verifyAllCoursesResources() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected\n');

        const courses = await Course.find({});

        console.log('='.repeat(80));
        console.log('RESOURCES VERIFICATION FOR ALL COURSES');
        console.log('='.repeat(80));

        for (const course of courses) {
            console.log(`\n📚 COURSE: "${course.title}"`);
            console.log('-'.repeat(80));

            const modules = await Module.find({ courseId: course._id });

            for (const module of modules) {
                const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

                if (videos.length > 0) {
                    console.log(`\n   📁 Module: "${module.title}"`);

                    videos.forEach((video, idx) => {
                        console.log(`\n      [${idx + 1}] "${video.title}"`);

                        if (video.resources && video.resources.length > 0) {
                            console.log(`         ✅ Resources (${video.resources.length}):`);
                            video.resources.forEach((res, resIdx) => {
                                console.log(`            ${resIdx + 1}. ${res.title} (${res.type})`);
                            });
                        } else {
                            console.log('         ❌ No resources');
                        }
                    });
                }
            }

            console.log('\n' + '-'.repeat(80));
        }

        console.log('\n' + '='.repeat(80));

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

verifyAllCoursesResources();
