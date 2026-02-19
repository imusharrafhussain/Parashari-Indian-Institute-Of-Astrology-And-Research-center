import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import fs from 'fs';

dotenv.config();

async function exportResources() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const videos = await Video.find({ 'resources.0': { $exists: true } });

        const output = {
            timestamp: new Date().toISOString(),
            count: videos.length,
            videos: videos.map(v => ({
                videoId: v._id.toString(),
                videoTitle: v.title,
                videoR2Path: v.r2Path,
                resources: v.resources.map(r => ({
                    resourceId: r._id.toString(),
                    title: r.title,
                    type: r.type,
                    r2Path: r.r2Path
                }))
            }))
        };

        fs.writeFileSync('resource_export.json', JSON.stringify(output, null, 2));
        console.log('✅ Exported to resource_export.json');
        console.log(JSON.stringify(output, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

exportResources();
