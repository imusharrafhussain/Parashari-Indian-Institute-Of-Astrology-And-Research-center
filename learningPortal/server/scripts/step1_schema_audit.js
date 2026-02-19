import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Video from '../models/Video.js';
import fs from 'fs';

dotenv.config();

/**
 * STEP 1: MongoDB Schema Audit
 * 
 * This script audits the database schema and identifies:
 * 1. Resource path patterns (courses/ vs resources/)
 * 2. Playlist/Module naming conventions
 * 3. Schema drift from required business rules
 */

async function auditMongoDBSchema() {
    let report = '';

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        report += '✅ Connected to MongoDB\n\n';
        report += '='.repeat(80) + '\n';
        report += 'STEP 1: MongoDB Schema Audit Report\n';
        report += '='.repeat(80) + '\n\n';

        const courses = await Course.find({});

        report += `📊 Total Courses: ${courses.length}\n\n`;

        // Audit each course
        for (const course of courses) {
            report += '━'.repeat(80) + '\n';
            report += `📚 Course: ${course.title}\n`;
            report += `   ID: ${course._id}\n`;
            report += `   Slug: ${course.slug}\n`;

            // Check modules
            const modules = await Module.find({ courseId: course._id }).sort({ orderIndex: 1 });
            report += `   Modules: ${modules.length}\n`;

            if (modules.length !== 3) {
                report += `   ⚠️  WARNING: Course has ${modules.length} modules, expected 3 (Basic, Core, Advanced)\n`;
            }

            // Check module names
            const moduleNames = modules.map(m => m.title);
            report += `   Module Names: ${moduleNames.join(', ')}\n`;

            const expectedNames = ['Introduction & Basics', 'Core Concepts', 'Advanced Application'];
            const hasCorrectNaming = moduleNames.some(name =>
                name.includes('Basic') || name.includes('Introduction')
            ) && moduleNames.some(name =>
                name.includes('Core')
            ) && moduleNames.some(name =>
                name.includes('Advanced')
            );

            if (!hasCorrectNaming) {
                report += `   ⚠️  WARNING: Module naming may not follow Business/Core/Advanced pattern\n`;
            }

            // Audit resource paths
            let coursesPathCount = 0;
            let resourcesPathCount = 0;
            let testPathCount = 0;

            for (const module of modules) {
                const videos = await Video.find({ moduleId: module._id });

                for (const video of videos) {
                    // Check video R2 path
                    if (video.r2Path) {
                        if (video.r2Path.startsWith('courses/')) {
                            coursesPathCount++;
                        } else if (video.r2Path.startsWith('resources/')) {
                            resourcesPathCount++;
                        }

                        if (video.r2Path.includes('test-course')) {
                            testPathCount++;
                        }
                    }

                    // Check resource paths
                    if (video.resources && video.resources.length > 0) {
                        for (const resource of video.resources) {
                            if (resource.r2Path) {
                                if (resource.r2Path.startsWith('courses/')) {
                                    coursesPathCount++;
                                } else if (resource.r2Path.startsWith('resources/')) {
                                    resourcesPathCount++;
                                }
                            }
                        }
                    }
                }
            }

            report += `\n   📁 Path Analysis:\n`;
            report += `      ✅ resources/ paths: ${resourcesPathCount}\n`;
            report += `      ❌ courses/ paths: ${coursesPathCount}\n`;
            report += `      ⚠️  test paths: ${testPathCount}\n`;

            if (coursesPathCount > 0) {
                report += `      🔴 SCHEMA DRIFT: ${coursesPathCount} paths use 'courses/' instead of 'resources/'\n`;
            }

            if (testPathCount > 0) {
                report += `      🔴 TEST DATA: ${testPathCount} paths contain test placeholders\n`;
            }

            report += '\n';
        }

        report += '━'.repeat(80) + '\n\n';
        report += '📋 SUMMARY\n';
        report += '━'.repeat(80) + '\n';

        let totalCoursesViolations = 0;
        let totalResourcesOK = 0;
        let totalTestPaths = 0;

        for (const course of courses) {
            const modules = await Module.find({ courseId: course._id });
            for (const module of modules) {
                const videos = await Video.find({ moduleId: module._id });
                for (const video of videos) {
                    if (video.r2Path) {
                        if (video.r2Path.startsWith('courses/')) totalCoursesViolations++;
                        if (video.r2Path.startsWith('resources/')) totalResourcesOK++;
                        if (video.r2Path.includes('test-course')) totalTestPaths++;
                    }
                    if (video.resources) {
                        for (const resource of video.resources) {
                            if (resource.r2Path) {
                                if (resource.r2Path.startsWith('courses/')) totalCoursesViolations++;
                                if (resource.r2Path.startsWith('resources/')) totalResourcesOK++;
                            }
                        }
                    }
                }
            }
        }

        report += `\n✅ Total resources/ paths (CORRECT): ${totalResourcesOK}\n`;
        report += `❌ Total courses/ paths (WRONG): ${totalCoursesViolations}\n`;
        report += `⚠️  Total test paths (NEEDS FIX): ${totalTestPaths}\n\n`;

        if (totalCoursesViolations > 0) {
            report += `🔴 CRITICAL: Schema drift detected - ${totalCoursesViolations} paths violate storage architecture\n`;
            report += `   Action Required: Migrate 'courses/' paths to 'resources/'\n\n`;
        }

        if (totalTestPaths > 0) {
            report += `⚠️  WARNING: ${totalTestPaths} test/placeholder paths found\n`;
            report += `   Action Required: Replace with real resource paths\n\n`;
        }

        if (totalCoursesViolations === 0 && totalTestPaths === 0) {
            report += `✅ All paths correctly use 'resources/' folder\n`;
            report += `✅ No test paths detected\n\n`;
        }

        report += '='.repeat(80) + '\n';
        report += 'END OF SCHEMA AUDIT\n';
        report += '='.repeat(80) + '\n';

        // Save report
        fs.writeFileSync('./scripts/schema_audit_report.txt', report);
        console.log(report);
        console.log('\n📄 Report saved to: scripts/schema_audit_report.txt');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
    } finally {
        await mongoose.disconnect();
    }
}

auditMongoDBSchema();
