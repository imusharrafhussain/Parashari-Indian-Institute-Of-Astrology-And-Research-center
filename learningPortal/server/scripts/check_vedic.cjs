// Quick diagnostic script - run with: node -r dotenv/config scripts/check_vedic.js
const mongoose = require('mongoose');

// Connect and query
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const db = mongoose.connection.db;

    // Find Vedic Astrology course
    const course = await db.collection('courses').find One({ slug: 'vedic-astrology' });
    console.log('\nCourse ID:', course?._id);

    // Find first module
    const module = await db.collection('modules').findOne({ courseId: course._id });
    console.log('Module ID:', module?._id);
    console.log('Module Title:', module?.title);

    // Find first video
    const video = await db.collection('videos').findOne({ moduleId: module._id });
    console.log('\nFirst Video:');
    console.log('  Title:', video?.title);
    console.log('  R2 Path:', video?.r2Path);
    console.log('  Active:', video?.active);

    if (!video?.r2Path) {
        console.log('\n❌ ISSUE: No r2Path set!');
    } else if (!video.r2Path.startsWith('resources/')) {
        console.log(`\n❌ ISSUE: Path should start with resources/ but is: ${video.r2Path}`);
    } else {
        console.log('\n✅ Path looks correct');
    }

    await mongoose.disconnect();
    process.exit(0);
}).catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
