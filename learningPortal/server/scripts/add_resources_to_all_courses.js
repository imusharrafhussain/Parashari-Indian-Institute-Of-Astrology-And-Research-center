import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

dotenv.config();

async function addResourcesToAllCourses() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!\n');

        const courses = await Course.find({});
        console.log(`Found ${courses.length} courses\n`);

        let totalProcessed = 0;
        let totalAdded = 0;

        for (const course of courses) {
            console.log(`\n========== ${course.title} ==========`);

            const modules = await Module.find({ courseId: course._id });

            for (const module of modules) {
                const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

                for (const video of videos) {
                    totalProcessed++;

                    let modified = false;

                    // Ensure resources array exists
                    if (!video.resources) {
                        video.resources = [];
                    }

                    const hasLessonNotes = video.resources.some(r =>
                        r.title && (r.title.includes('Lesson Notes') || r.title.includes('Lesson 1 Notes'))
                    );

                    const hasLessonEbook = video.resources.some(r =>
                        r.title && r.title.includes('Lesson eBook')
                    );

                    if (!hasLessonNotes) {
                        video.resources.push({
                            title: 'Lesson Notes',
                            type: 'pdf',
                            r2Path: `courses/${course.title.replace(/\s+/g, '')}/${module.title.replace(/\s+/g, '')}/LessonNotes/lesson${(video.orderIndex || 0) + 1}Notes.pdf`
                        });
                        modified = true;
                        totalAdded++;
                        console.log(`  + Added "Lesson Notes" to: ${video.title}`);
                    }

                    if (!hasLessonEbook) {
                        video.resources.push({
                            title: 'Lesson eBook',
                            type: 'pdf',
                            r2Path: `courses/${course.title.replace(/\s+/g, '')}/${module.title.replace(/\s+/g, '')}/LessonEbooks/lesson${(video.orderIndex || 0) + 1}Ebook.pdf`
                        });
                        modified = true;
                        totalAdded++;
                        console.log(`  + Added "Lesson eBook" to: ${video.title}`);
                    }

                    if (modified) {
                        await video.save();
                    }
                }
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log(`SUMMARY:`);
        console.log(`  Total videos processed: ${totalProcessed}`);
        console.log(`  Total resources added: ${totalAdded}`);
        console.log('='.repeat(60));
        console.log('\nDone! All courses now have resources.');

    } catch (error) {
        console.error('ERROR:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

addResourcesToAllCourses();
