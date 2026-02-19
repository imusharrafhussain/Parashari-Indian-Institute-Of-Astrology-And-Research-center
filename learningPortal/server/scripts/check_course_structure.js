import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Video from '../models/Video.js';
import fs from 'fs';

dotenv.config();

async function checkAllCourses() {
    let output = '';
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const courses = await Course.find({});

        output += 'DATABASE STRUCTURE CHECK\n';
        output += '='.repeat(70) + '\n';

        for (const course of courses) {
            const modulesCount = await Module.countDocuments({ courseId: course._id });
            const modules = await Module.find({ courseId: course._id });

            let totalVideos = 0;
            for (const module of modules) {
                const videoCount = await Video.countDocuments({ moduleId: module._id });
                totalVideos += videoCount;
            }

            output += `\n${course.title}:\n`;
            output += `  Modules: ${modulesCount}\n`;
            output += `  Videos: ${totalVideos}\n`;

            if (totalVideos > 0 && modules.length > 0) {
                // Check resources in first video
                const firstModule = modules[0];
                const firstVideo = await Video.findOne({ moduleId: firstModule._id }).sort({ orderIndex: 1 });

                if (firstVideo) {
                    output += `  First Video: "${firstVideo.title}"\n`;
                    output += `  Resources: ${firstVideo.resources?.length || 0}\n`;
                    if (firstVideo.resources && firstVideo.resources.length > 0) {
                        firstVideo.resources.forEach(r => {
                            output += `    - ${r.title}\n`;
                        });
                    }
                }
            }
        }

        output += '\n' + '='.repeat(70) + '\n';

        // Write to file
        fs.writeFileSync('./scripts/course_structure_report.txt', output);
        console.log(output);
        console.log('\n✅ Report saved to scripts/course_structure_report.txt');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

checkAllCourses();
