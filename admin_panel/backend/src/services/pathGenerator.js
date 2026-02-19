import Lesson from '../models/Lesson.js';
import Module from '../models/Module.js';
import Course from '../models/Course.js';

/**
 * Generate R2 path for video
 * Format: resources/{course-slug}/{module-slug}/lesson-{N}-videos/index.m3u8
 */
export function generateVideoPath({ courseSlug, moduleSlug, lessonNumber }) {
    return `resources/${courseSlug}/${moduleSlug}/lesson-${lessonNumber}-videos/index.m3u8`;
}

/**
 * Generate R2 path for PDF/resource
 * Format: resources/{course-slug}/{module-slug}/lesson-{N}-{type}/
 */
export function generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType }) {
    // resourceType: 'pdf', 'ebook', 'slides', 'notes'
    return `resources/${courseSlug}/${moduleSlug}/lesson-${lessonNumber}-${resourceType}/`;
}

/**
 * Generate thumbnail path
 * Format: thumbnails/{type}s/{slug}.jpg
 */
export function generateThumbnailPath({ type, slug }) {
    // type: 'course' | 'video'
    return `thumbnails/${type}s/${slug}.jpg`;
}

/**
 * Auto-generate all paths from lesson metadata
 * This is the main function admins will use
 */
export async function generateLessonPaths(lessonId) {
    const lesson = await Lesson.findById(lessonId).populate({
        path: 'moduleId',
        populate: { path: 'courseId' }
    });

    if (!lesson) {
        throw new Error('Lesson not found');
    }

    if (!lesson.moduleId || !lesson.moduleId.courseId) {
        throw new Error('Lesson must have a valid module and course');
    }

    const courseSlug = lesson.moduleId.courseId.slug;
    const moduleSlug = lesson.moduleId.slug;
    const lessonNumber = lesson.orderIndex + 1;

    return {
        videoPath: generateVideoPath({ courseSlug, moduleSlug, lessonNumber }),
        pdfPath: generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType: 'pdf' }),
        ebookPath: generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType: 'ebook' }),
        slidesPath: generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType: 'slides' }),
        notesPath: generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType: 'notes' })
    };
}

/**
 * Generate paths for module-level content
 */
export async function generateModulePaths(moduleId) {
    const module = await Module.findById(moduleId).populate('courseId');

    if (!module) {
        throw new Error('Module not found');
    }

    const courseSlug = module.courseId.slug;
    const moduleSlug = module.slug;

    return {
        courseSlug,
        moduleSlug,
        basePath: `resources/${courseSlug}/${moduleSlug}/`
    };
}

/**
 * Generate path for course thumbnail
 */
export function generateCourseThumbnailPath(courseSlug) {
    return generateThumbnailPath({ type: 'course', slug: courseSlug });
}
