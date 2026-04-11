import glob, re

subtitles = {
    "cc-bhoomi-vastu.html": '<p class="course-subtitle">Master the secrets of Bhoomi Vastu to harmonize your living and working spaces. This detailed crash course teaches you simple, practical ways to analyze land energy and align your architecture for maximum prosperity, health, and peace.<br><br><b>हिंदी में:</b> भूमि वास्तु के रहस्यों को गहराई से समझें और अपने घर व कार्यस्थल में सकारात्मक ऊर्जा लाएं। इस क्रैश कोर्स में आप सीखेंगे कि कैसे आसान और व्यावहारिक तरीकों से भूमि की ऊर्जा को परखा जाए ताकि आपके जीवन में सुख, शांति और समृद्धि आ सके।</p>',
    
    "cc-business-numerology.html": '<p class="course-subtitle">Unlock the power of numbers to guarantee your commercial success. In this simple yet detailed course, learn how to perfectly align your business name, brand identity, and important launch dates with lucky numeric vibrations to attract wealth and growth.<br><br><b>हिंदी में:</b> अंक ज्योतिष (न्यूमेरोलॉजी) की मदद से अपने व्यापार में अपार सफलता प्राप्त करें। इस आसान और विस्तृत कोर्स में सीखें कि कैसे अपने बिजनेस का नाम, ब्रांड और महत्वपूर्ण तिथियों को शुभ अंकों के साथ जोड़कर आप धन और तरक्की को आकर्षित कर सकते हैं।</p>',
    
    "cc-face-reading.html": '<p class="course-subtitle">Discover how to read anyone like an open book just by looking at their face. This step-by-step course simplifies face reading (Physiognomy), helping you understand people’s true character, hidden traits, and behavioral patterns effortlessly.<br><br><b>हिंदी में:</b> चेहरा पढ़कर किसी भी इंसान के असली स्वभाव को समझना सीखें। यह कोर्स आपको आसान तरीके से \'फेस रीडिंग\' सिखाता है, जिससे आप लोगों के चेहरे की बनावट देखकर उनके छिपे हुए राज, व्यवहार और व्यक्तित्व का सटीक अंदाज़ा लगा सकते हैं।</p>',
    
    "cc-financial-astrology.html": '<p class="course-subtitle">Crack the astrological code to financial freedom. This beginner-friendly course guides you in detail to identify wealth-creating yogas, favorable investment cycles, and hidden financial potential directly from a birth chart.<br><br><b>हिंदी में:</b> ज्योतिष के माध्यम से अपनी आर्थिक स्थिति और धन कमाने के मौकों को पहचानें। इस कोर्स में बिल्कुल आसान भाषा में सिखाया गया है कि जन्म कुंडली देखकर कैसे पता करें कि पैसा कब आएगा, निवेश का सही समय क्या है और धन लाभ के कौन से योग हैं।</p>',
    
    "cc-lal-kitab.html": '<p class="course-subtitle">Master the miraculous and immediate remedies of Lal Kitab in an easy-to-understand format. This detailed course breaks down its foundational principles, offering powerful, practical solutions to overcome life\'s biggest challenges without expensive rituals.<br><br><b>हिंदी में:</b> लाल किताब के चमत्कारी और तुरंत असर करने वाले उपायों को बेहद आसान तरीके से सीखें। यह कोर्स आपको लाल किताब के मूल सिद्धांतों की बारीक जानकारी देता है, जिससे आप बिना किसी महंगे अनुष्ठान के अपनी और दूसरों की समस्याओं का अचूक समाधान कर सकते हैं।</p>',
    
    "cc-medical-astrology.html": '<p class="course-subtitle">Learn to foresee and manage health issues through the stars. This comprehensive course simplifies Medical Astrology, teaching you how to analyze planetary alignments to predict potential diseases and find astrological remedies for well-being.<br><br><b>हिंदी में:</b> ग्रहों और नक्षत्रों की मदद से स्वास्थ्य समस्याओं की पहले से पहचान करना सीखें। इस कोर्स में मेडिकल एस्ट्रोलॉजी को इतने आसान तरीके से समझाया गया है कि आप जन्म कुंडली देखकर संभावित बीमारियों का पता लगा सकेंगे और उनके ज्योतिषीय उपाय कर सकेंगे।</p>',
    
    "cc-mobile-numerology.html": '<p class="course-subtitle">Change your number, change your life! Dive deep into Mobile Numerology with this easy course that explains how your 10-digit mobile number secretly impacts your fame, luck, daily success, and personal relationships.<br><br><b>हिंदी में:</b> अपना मोबाइल नंबर बदलें और अपनी किस्मत संवारें! इस आसान लेकिन बहुत ही महत्वपूर्ण कोर्स में विस्तार से समझें कि आपका 10 अंकों का मोबाइल नंबर कैसे आपके भाग्य, करियर की सफलता और निजी जीवन पर सीधा और गहरा असर डालता है।</p>',
    
    "cc-modern-career-astrology.html": '<p class="course-subtitle">Navigate today’s competitive job market with the wisdom of astrology. This detailed course offers simple methods to pinpoint the ideal modern profession, plan strategic career moves, and discover the exact timing for immense success.<br><br><b>हिंदी में:</b> आज के आधुनिक करियर में ज्योतिष के ज्ञान से आगे बढ़ें। इस कोर्स में बेहद आसान तरीकों से सिखाया गया है कि अपनी कुंडली के अनुसार सबसे अच्छी नौकरी या व्यापार कैसे चुनें और सफलता का सही समय कैसे पता करें।</p>',
    
    "cc-modern-western-palmistry.html": '<p class="course-subtitle">Read hands and reveal hidden truths effortlessly. This in-depth course teaches the core techniques of Modern Western Palmistry in a very simplified way, allowing you to accurately analyze anyone\'s true personality, strengths, and life path.<br><br><b>हिंदी में:</b> हाथों की लकीरें पढ़ना सीखें और लोगों के जीवन के राज खोलें। इस कोर्स में \'वेस्टर्न पामिस्ट्री\' (हस्तरेखा विज्ञान) को बहुत ही सरल और विस्तार से समझाया गया है, ताकि आप किसी भी व्यक्ति के स्वभाव, करियर और भविष्य का सटीक विश्लेषण कर सकें।</p>',
    
    "cc-nadi-astrology.html": '<p class="course-subtitle">Master the ancient and razor-sharp predictive system of Nadi Astrology. This detailed course simplifies complex leaf reading concepts, enabling you to make highly accurate predictions about a person\'s life events without requiring complicated mathematical calculations.<br><br><b>हिंदी में:</b> नाड़ी ज्योतिष की प्राचीन और अत्यंत सटीक भविष्यवाणी प्रणाली के रहस्य को जानें। इस कोर्स में जटिल बातों को आसान तरीके से समझाया गया है, जिससे आप बिना किसी मुश्किल गणित के किसी भी व्यक्ति के जीवन की सटीक और पक्की भविष्यवाणी कर सकते हैं।</p>',
    
    "crash-course-template.html": '<p class="course-subtitle">A highly intensive, result-oriented crash course designed to give you practical, actionable wisdom that you can apply immediately to transform your life and career.<br><br><b>हिंदी में:</b> यह एक सघन और परिणाम-उन्मुख क्रैश कोर्स है, जिसे इस तरह से डिज़ाइन किया गया है कि आपको व्यावहारिक ज्ञान मिल सके। इस ज्ञान का उपयोग आप तुरंत अपने जीवन और करियर को सकारात्मक रूप से बदलने के लिए कर सकते हैं।</p>'
}

files_to_update = glob.glob('cc-*.html') + ['crash-course-template.html']

for f in files_to_update:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if f in subtitles:
        content = re.sub(r'<p class="course-subtitle">.*?</p>', subtitles[f], content, flags=re.DOTALL)
    
    # Replace prices
    content = content.replace("Total Value: ₹8,500", "Total Value: ₹3,499")
    content = content.replace("₹2,500", "₹2,499")
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Updated {f}")
