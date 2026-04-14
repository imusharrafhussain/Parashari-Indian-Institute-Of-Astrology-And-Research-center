const fs = require('fs');
const files = [
    'courses/palmistry-diploma.html',
    'courses/palmistry-bachelors.html',
    'courses/palmistry-masters.html',
    'courses/palmistry-grand-master.html'
];

const updates = [
    {
        alt: 'alt="Read Your Own Palm"',
        newImg: 'read your own palm-Photoroom.png'
    },
    {
        alt: 'alt="Love &amp; Relationships"',
        newImg: '1babc379-cbeb-4c1a-a5ec-75d0e28db96c-Photoroom.png'
    },
    {
        alt: 'alt="Career Path"',
        newImg: '1d4f74b1-9b9f-4575-b98d-cb69ddad0f92-Photoroom.png'
    },
    {
        alt: 'alt="Health &amp; Wellbeing"',
        newImg: '385f23a0-08f3-4945-9856-c0d492a809d3-Photoroom.png'
    },
    {
        alt: 'alt="Money &amp; Fortune"',
        newImg: '1d4f74b1-9b9f-4575-b98d-cb69ddad0f92 1-Photoroom.png'
    },
    {
        alt: 'alt="Palmistry Rituals"',
        newImg: '385f23a0-08f3-4945-9856-c0d492a809d3 2-Photoroom.png'
    }
];

files.forEach(f => {
    if (!fs.existsSync(f)) return;
    let html = fs.readFileSync(f, 'utf8');
    
    updates.forEach(u => {
        // Find the index of the alt tag
        let altIdx = html.indexOf(u.alt);
        if (altIdx === -1) return;
        
        // Find the src parameter right before it
        let srcEnd = html.lastIndexOf('"', altIdx - 2);
        let srcStart = html.lastIndexOf('"', srcEnd - 1) + 1;
        
        let currentSrc = html.substring(srcStart, srcEnd);
        // Replace just the filename in the src
        let newSrc = currentSrc.substring(0, currentSrc.lastIndexOf('/') + 1) + u.newImg;
        
        html = html.substring(0, srcStart) + newSrc + html.substring(srcEnd);
    });
    
    fs.writeFileSync(f, html, 'utf8');
    console.log('Updated ' + f);
});
