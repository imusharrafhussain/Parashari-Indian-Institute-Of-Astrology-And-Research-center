import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';
import fs from 'fs';

dotenv.config();

async function debugVedicAstrology() {
    let output = '';
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        output += 'Connected to MongoDB\n\n';

        // Find Vedic Astrology course
        const vedicCourse = await Course.findOne({ title: /vedic.*astrology/i });

        if (!vedicCourse) {
            output += 'Vedic Astrology course not found!\n';
            return;
        }

        output += `Course: ${vedicCourse.title}\n`;
        output += `Course ID: ${vedicCourse._id}\n\n`;

        // Get modules
        const modules = await Module.find({ courseId: vedicCourse._id }).sort({ orderIndex: 1 });

        output += '=== VEDIC ASTROLOGY COURSE STRUCTURE ===\n\n';

        for (const module of modules) {
            output += `Module: ${module.title}\n`;
            const videos = await Video.find({ moduleId: module._id }).sort({ orderIndex: 1 });

            videos.forEach((video, idx) => {
                output += `\n  Video ${idx + 1}: "${video.title}"\n`;
                output += `  Video ID: ${video._id}\n`;
                output += `  R2 Path: ${video.r2Path || 'MISSING!'}\n`;
                output += `  Resources: ${video.resources?.length || 0}\n`;

                if (video.resources && video.resources.length > 0) {
                    video.resources.forEach((r, rIdx) => {
                        output += `    ${rIdx + 1}. "${r.title}" (${r.type}) - ID: ${r._id}\n`;
                        output += `       R2 Path: ${r.r2Path}\n`;
                    });
                }
            });
            output += '\n' + '-'.repeat(60) + '\n';
        }

        // Now check another course for comparison
        output += '\n\n=== NADI JYOTISH COURSE (FOR COMPARISON) ===\n\n';

        const nadiCourse = await Course.findOne({ title: /nadi/i });
        if (nadiCourse) {
            const nadiModules = await Module.find({ courseId: nadiCourse._id }).sort({ orderIndex: 1 });
            const firstModule = nadiModules[0];

            if (firstModule) {
                const nadiVideos = await Video.find({ moduleId: firstModule._id }).sort({ orderIndex: 1 });
                const firstVideo = nadiVideos[0];

                if (firstVideo) {
                    output += `First Video: "${firstVideo.title}"\n`;
                    output += `Video ID: ${firstVideo._id}\n`;
                    output += `R2 Path: ${firstVideo.r2Path || 'MISSING!'}\n`;
                    output += `Resources: ${firstVideo.resources?.length || 0}\n`;

                    if (firstVideo.resources && firstVideo.resources.length > 0) {
                        firstVideo.resources.forEach((r, idx) => {
                            output += `  ${idx + 1}. "${r.title}" (${r.type})\n`;
                        });
                    }
                }
            }
        }

        fs.writeFileSync('./scripts/vedic_debug_output.txt', output);
        console.log(output);
        console.log('\n✅ Debug output saved to scripts/vedic_debug_output.txt');

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

debugVedicAstrology();
