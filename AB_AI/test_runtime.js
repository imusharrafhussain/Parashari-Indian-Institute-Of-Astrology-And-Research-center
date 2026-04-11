// Mock DOM
global.document = {
    addEventListener: function(event, callback) {
        this.onload = callback;
    },
    getElementById: function(id) {
        return {
            innerHTML: '',
            style: {},
            classList: { add: function(){} }
        };
    },
    querySelector: function(s) {
        return { textContent: '', href: '', src: '', alt: '' };
    },
    querySelectorAll: function(s) {
        return [];
    }
};

global.window = {
    location: { search: '?course=numerology&level=diploma' }
};

global.URLSearchParams = class {
    constructor(s) { this.s = s; }
    get(p) {
        if (p === 'course') return 'numerology';
        if (p === 'level') return 'diploma';
        return null;
    }
};

try {
    require('./assets/js/level-data.js');
    console.log("Syntax is OK");
    document.onload(); // trigger DOMContentLoaded
    console.log("Runtime execution OK!");
} catch (e) {
    console.error("RUNTIME ERROR:");
    console.error(e);
}
