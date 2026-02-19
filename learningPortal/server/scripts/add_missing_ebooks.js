import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

async function addMissingEbooks() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        const vedicCourse = await Course.findOne({ title: /vedic.*astrology/i });
        const modules = await Module.find({ courseId: vedicCourse._id }).sort({ orderIndex: 1 });

        let added = 0;

        for (const module of modules) {
            const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

            for (const video of videos) {
                // Check if Lesson eBook is missing
                const hasEbook = video.resources?.some(r =>
                    r.title === 'Lesson eBook' || r.title.includes('eBook')
                );

                if (!hasEbook) {
                    const videoNum = video.orderIndex + 1;
                    const moduleName = module.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

                    video.resources.push({
                        title: 'Lesson eBook',
                        type: 'pdf',
                        r2Path: `resources/vedic-astrology/${moduleName}/lesson-${videoNum}-ebooks/ebook.pdf`
                    });

                    await video.save();
                    added++;
                    console.log(`✅ Added Lesson eBook to: ${video.title}`);
                }
            }
        }

        console.log(`\n📊 Total eBooks added: ${added}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

addMissingEbooks();
