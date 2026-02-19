// Course data matching AB_AI fee-structure.html
export const coursesData = [
    {
        id: 'vedic-astrology',
        name: 'Vedic Astrology',
        duration: '6 Months',
        type: 'Certificate',
        fee: 5999,
        discount: 5,
        description: 'Master the foundations of Vedic astrology including planetary positions, houses, dashas, and predictive techniques.',
        slug: 'astrology'
    },
    {
        id: 'nadi-jyotish',
        name: 'Nadi Jyotish',
        duration: '6 Months',
        type: 'Diploma',
        fee: 18000,
        discount: 5,
        description: 'Learn the ancient art of Nadi astrology with advanced predictive techniques and palm leaf manuscripts study.',
        slug: 'nadi-jyotish'
    },
    {
        id: 'lal-kitab',
        name: 'Lal Kitab Remedies',
        duration: '3 Months',
        type: 'Certificate',
        fee: 12000,
        discount: 5,
        description: 'Discover powerful remedies from Lal Kitab to solve life problems through simple yet effective solutions.',
        slug: 'lal-kitab'
    },
    {
        id: 'remedy-course',
        name: 'Remedy Course (Upaay Gyaan)',
        duration: '4 Months',
        type: 'Certificate',
        fee: 14000,
        discount: 5,
        description: 'Comprehensive remedy knowledge covering mantras, gemstones, rituals, and practical solutions for various problems.',
        slug: 'remedy-course'
    },
    {
        id: 'kp-astrology',
        name: 'KP Astrology',
        duration: '5 Months',
        type: 'Diploma',
        fee: 15000,
        discount: 5,
        description: 'Learn Krishnamurti Paddhati system for accurate predictions and precise timing of events.',
        slug: 'kp-astrology'
    },
    {
        id: 'bnn-astrology',
        name: 'BNN (Advanced Techniques)',
        duration: '4 Months',
        type: 'Advanced',
        fee: 16000,
        discount: 5,
        description: 'Master Bhrigu Nandi Nadi advanced techniques for accurate predictions and deep astrological insights.',
        slug: 'bnn-astrology'
    },
    {
        id: 'crystal-healing',
        name: 'Crystal Healing',
        duration: '2 Months',
        type: 'Certificate',
        fee: 9000,
        discount: 5,
        description: 'Learn to use crystals and gemstones for healing, energy balancing, and spiritual growth.',
        slug: 'crystal-healing'
    },
    {
        id: 'medical-astrology',
        name: 'Medical Astrology',
        duration: '4 Months',
        type: 'Certificate',
        fee: 13000,
        discount: 5,
        description: 'Study the connection between planets and health to predict and prevent diseases through astrological methods.',
        slug: 'medical-astrology'
    },
    {
        id: 'complete-astrology',
        name: 'Complete Astrology Course',
        duration: '12 Months',
        type: 'Diploma',
        fee: 35000,
        discount: 5,
        description: 'Comprehensive astrology program covering all systems - Vedic, KP, Nadi, remedies and advanced techniques.',
        slug: 'complete-astrology'
    },
    {
        id: 'rudraksha',
        name: 'Rudraksha Remedies',
        duration: '2 Months',
        type: 'Certificate',
        fee: 8000,
        discount: 5,
        description: 'Learn about different types of Rudraksha beads, their benefits, and how to use them for remedies.',
        slug: 'rudraksha'
    },
    {
        id: 'vastu',
        name: 'Vastu Shastra',
        duration: '2 Months',
        type: 'Certificate',
        fee: 2999,
        discount: 5,
        description: 'Master the science of Vastu for home, office, and commercial spaces to ensure prosperity and harmony.',
        slug: 'vastu'
    },
    {
        id: 'palmistry',
        name: 'Palmistry',
        duration: '3 Months',
        type: 'Certificate',
        fee: 3999,
        discount: 5,
        description: 'Learn the art of palm reading to understand personality, predict future events, and guide life decisions.',
        slug: 'palmistry'
    },
    {
        id: 'face-reading',
        name: 'Face Reading',
        duration: '2 Months',
        type: 'Certificate',
        fee: 9000,
        discount: 5,
        description: 'Master the ancient Chinese art of face reading to analyze personality traits and predict life events.',
        slug: 'face-reading'
    },
    {
        id: 'tarot',
        name: 'Tarot Reading',
        duration: '3 Months',
        type: 'Certificate',
        fee: 10000,
        discount: 5,
        description: 'Learn tarot card reading from basics to advanced spreads for accurate guidance and intuitive insights.',
        slug: 'tarot'
    },
    {
        id: 'numerology',
        name: 'Numerology',
        duration: '3 Months',
        type: 'Diploma',
        fee: 11000,
        discount: 5,
        description: 'Study the science of numbers to understand personality, compatibility, and life path through numerological analysis.',
        slug: 'numerology'
    }
];

export const getDiscountedPrice = (fee, discount) => {
    return Math.round(fee - (fee * discount / 100));
};
