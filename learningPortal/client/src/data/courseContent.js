// Course content database - videos, PDFs, eBooks, and notes for each course

export const courseContent = {
    'vedic-astrology': {
        title: 'Vedic Astrology',
        description: 'Master the foundations of Vedic astrology including planetary positions, houses, and chart interpretation.',
        duration: '6 Months',
        totalVideos: 48,
        instructor: 'Dr. Sharma',
        thumbnail: '/assets/courses/vedic-astrology.jpg',

        videos: [
            {
                id: 1,
                title: 'Introduction to Vedic Astrology',
                duration: '45:30',
                thumbnail: '/assets/videos/vedic-1.jpg',
                videoUrl: 'https://stream.cloudflare.com/sample-1', // Placeholder
                description: 'Understanding the basics of Vedic astrology and its significance',
                completed: false
            },
            {
                id: 2,
                title: 'The 12 Houses Explained',
                duration: '52:15',
                thumbnail: '/assets/videos/vedic-2.jpg',
                videoUrl: 'https://stream.cloudflare.com/sample-2',
                description: 'Deep dive into the meaning and significance of each house',
                completed: false
            },
            {
                id: 3,
                title: 'Planetary Positions and Movements',
                duration: '38:45',
                thumbnail: '/assets/videos/vedic-3.jpg',
                videoUrl: 'https://stream.cloudflare.com/sample-3',
                description: 'Learn how planets move and affect your chart',
                completed: false
            },
            {
                id: 4,
                title: 'Reading Birth Charts - Part 1',
                duration: '55:20',
                thumbnail: '/assets/videos/vedic-4.jpg',
                videoUrl: 'https://stream.cloudflare.com/sample-4',
                description: 'Step-by-step guide to reading birth charts',
                completed: false
            },
            {
                id: 5,
                title: 'Planetary Aspects and Conjunctions',
                duration: '48:10',
                thumbnail: '/assets/videos/vedic-5.jpg',
                videoUrl: 'https://stream.cloudflare.com/sample-5',
                description: 'Understanding planetary relationships in charts',
                completed: false
            }
        ],

        ebooks: [
            {
                id: 1,
                title: 'Vedic Astrology Fundamentals',
                author: 'Dr. Sharma',
                format: 'PDF',
                size: '5.2 MB',
                pages: 324,
                downloadUrl: '/assets/ebooks/vedic-fundamentals.pdf',
                coverImage: '/assets/ebooks/vedic-cover.jpg'
            },
            {
                id: 2,
                title: 'Planetary Remedies Handbook',
                author: 'Guru Parashari',
                format: 'EPUB',
                size: '3.8 MB',
                pages: 210,
                downloadUrl: '/assets/ebooks/remedies-handbook.epub',
                coverImage: '/assets/ebooks/remedies-cover.jpg'
            }
        ],

        pdfs: [
            {
                id: 1,
                title: 'Chart Reading Quick Reference',
                size: '2.1 MB',
                pages: 45,
                downloadUrl: '/assets/pdfs/chart-reference.pdf',
                description: 'Quick reference guide for chart interpretation'
            },
            {
                id: 2,
                title: 'Planetary Strength Calculation Sheet',
                size: '1.5 MB',
                pages: 12,
                downloadUrl: '/assets/pdfs/strength-calc.pdf',
                description: 'Worksheets for calculating planetary strengths'
            },
            {
                id: 3,
                title: 'Dasha System Tables',
                size: '3.2 MB',
                pages: 78,
                downloadUrl: '/assets/pdfs/dasha-tables.pdf',
                description: 'Complete Vimshottari Dasha calculation tables'
            }
        ],

        notes: [
            {
                id: 1,
                title: 'Lesson 1: Introduction Notes',
                content: `# Introduction to Vedic Astrology

## Key Concepts
- Vedic astrology is based on the sidereal zodiac
- 12 houses represent different life areas
- 9 planets influence our destiny
- Nakshatra system provides deeper insights

## Important Points
1. Always use sidereal calculations
2. Birth time accuracy is crucial
3. Consider both planetary positions and aspects
4. Remedies can help balance negative influences`
            },
            {
                id: 2,
                title: 'Lesson 2: Houses Summary',
                content: `# The 12 Houses

1. **1st House (Ascendant)**: Self, personality, physical body
2. **2nd House**: Wealth, family, speech
3. **3rd House**: Courage, siblings, communication
4. **4th House**: Mother, home, emotions
5. **5th House**: Children, intelligence, creativity
6. **6th House**: Enemies, diseases, debts
7. **7th House**: Marriage, partnerships
8. **8th House**: Longevity, transformations
9. **9th House**: Dharma, luck, father
10. **10th House**: Career, status, karma
11. **11th House**: Gains, friends, desires
12. **12th House**: Losses, spirituality, liberation`
            }
        ]
    },

    'kp-astrology': {
        title: 'KP Astrology',
        description: 'Learn Krishnamurti Paddhati system for accurate predictions and precise timing of events.',
        duration: '5 Months',
        totalVideos: 36,
        instructor: 'Prof. KS Krishnamurti',
        thumbnail: '/assets/courses/kp-astrology.jpg',

        videos: [
            {
                id: 1,
                title: 'Introduction to KP System',
                duration: '42:15',
                thumbnail: '/assets/videos/kp-1.jpg',
                videoUrl: 'https://stream.cloudflare.com/kp-sample-1',
                description: 'Understanding the revolutionary KP astrology system',
                completed: false
            },
            {
                id: 2,
                title: 'Cuspal Sub Lord Theory',
                duration: '58:30',
                thumbnail: '/assets/videos/kp-2.jpg',
                videoUrl: 'https://stream.cloudflare.com/kp-sample-2',
                description: 'Master the concept of cuspal sub lords',
                completed: false
            },
            {
                id: 3,
                title: 'Ruling Planets and Significators',
                duration: '46:20',
                thumbnail: '/assets/videos/kp-3.jpg',
                videoUrl: 'https://stream.cloudflare.com/kp-sample-3',
                description: 'How to determine ruling planets for accurate predictions',
                completed: false
            },
            {
                id: 4,
                title: 'Timing of Events - Part 1',
                duration: '51:45',
                thumbnail: '/assets/videos/kp-4.jpg',
                videoUrl: 'https://stream.cloudflare.com/kp-sample-4',
                description: 'Precise event timing techniques in KP',
                completed: false
            }
        ],

        ebooks: [
            {
                id: 1,
                title: 'KP Astrology Reader',
                author: 'Prof. KS Krishnamurti',
                format: 'PDF',
                size: '6.8 MB',
                pages: 456,
                downloadUrl: '/assets/ebooks/kp-reader.pdf',
                coverImage: '/assets/ebooks/kp-cover.jpg'
            }
        ],

        pdfs: [
            {
                id: 1,
                title: 'KP Ayanamsa Tables',
                size: '2.4 MB',
                pages: 34,
                downloadUrl: '/assets/pdfs/kp-ayanamsa.pdf',
                description: 'Complete ayanamsa calculation tables for KP system'
            },
            {
                id: 2,
                title: 'Sub Lord Calculation Guide',
                size: '1.8 MB',
                pages: 28,
                downloadUrl: '/assets/pdfs/sublord-calc.pdf',
                description: 'Step-by-step guide for sub lord calculations'
            }
        ],

        notes: [
            {
                id: 1,
                title: 'KP System Fundamentals',
                content: `# KP Astrology Basics

## Core Principles
- Star (Nakshatra) is supreme
- Sub lord determines the result
- Ruling planets at the time of judgment
- Cuspal sub lord theory for house signification

## Why KP is Different
1. More precise than traditional Vedic astrology
2. Uses unequal house division
3. Focuses on sub lords for predictions
4. Eliminates confusion in timing events`
            }
        ]
    }
};

// Helper function to get course content
export const getCourseContent = (courseId) => {
    return courseContent[courseId] || null;
};

// Helper function to check if user has access to course
export const hasAccessToCourse = (userPurchasedCourses, courseId) => {
    return userPurchasedCourses.some(course => course.courseId === courseId);
};

// Get course progress (percentage of videos completed)
export const getCourseProgress = (courseId, completedVideos = []) => {
    const course = courseContent[courseId];
    if (!course || !course.videos || course.videos.length === 0) return 0;

    const completed = course.videos.filter(v => completedVideos.includes(v.id)).length;
    return Math.round((completed / course.videos.length) * 100);
};
