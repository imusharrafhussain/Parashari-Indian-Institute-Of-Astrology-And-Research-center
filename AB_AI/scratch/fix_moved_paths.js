const fs = require('fs');
const path = require('path');

const directories = ['blogs', 'categories', 'crash-courses', 'archive'];

directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) return;

    fs.readdirSync(dirPath).forEach(file => {
        if (!file.endsWith('.html')) return;

        const filePath = path.join(dirPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Update CSS paths
        content = content.replace(/href="assets\/css\//g, 'href="../assets/css/');
        
        // Update JS paths
        content = content.replace(/src="assets\/js\//g, 'src="../assets/js/');
        
        // Update Images paths (common patterns)
        content = content.replace(/src="assets\/images-optimized\//g, 'src="../assets/images-optimized/');
        content = content.replace(/src="assets\/images\//g, 'src="../assets/images/');
        
        // Update Component paths
        content = content.replace(/data-component-path="components\//g, 'data-component-path="../components/');

        fs.writeFileSync(filePath, content);
        console.log(`Updated assets paths in: ${dir}/${file}`);
    });
});
