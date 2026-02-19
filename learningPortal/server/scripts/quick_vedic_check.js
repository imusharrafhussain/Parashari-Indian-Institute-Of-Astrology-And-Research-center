import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function diagnose() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const Video = mongoose.model('Video');

        // Find the first video for Vedic Astrology course
        const vedicVideo = await Video.findOne()
            .populate({
                path: 'moduleId',
                populate: { path: 'courseId' }
            })
            .lean();

        if (vedicVideo && vedicVideo.moduleId && vedicVideo.moduleId.courseId) {
            const courseSlug = vedicVideo.moduleId.courseId.slug;
            if (courseSlug === 'vedic-astrology') {
                const report = {
                    videoTitle: vedicVideo.title,
                    videoId: vedicVideo._id,
                    r2Path: vedicVideo.r2Path,
                    active: vedicVideo.active,
                    moduleTitle: vedicVideo.moduleId.title,
                    courseSlug: courseSlug,
                    diagnosis: ''
                };

                if (!vedicVideo.r2Path) {
                    report.diagnosis = 'MISSING - No r2Path set';
                } else if (!vedicVideo.r2Path.startsWith('resources/')) {
                    report.diagnosis = 'WRONG_PREFIX - Should start with resources/';
                } else if (vedicVideo.r2Path.includes('test-course')) {
                    report.diagnosis = 'TEST_PATH - Contains test-course';
                } else {
                    report.diagnosis = 'LOOKS_OK';
                }

                fs.writeFileSync('vedic_path_report.json', JSON.stringify(report, null, 2));
                console.log('Report saved to vedic_path_report.json');
                console.log(JSON.stringify(report, null, 2));
            }
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

diagnose();
