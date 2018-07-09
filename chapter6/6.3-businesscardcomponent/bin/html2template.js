const fs = require('fs');

const sourceHTML = process.argv[2];
const destinationTemplate = process.argv[3];

if (!sourceHTML) {
    console.error('No source HTML specified');
    process.exit(1);
}

if (!destinationTemplate) {
    console.error('No desintation JS specified');
    process.exit(1);
}

let html = fs.readFileSync(sourceHTML, 'utf8');

// separate out HTML and CSS
const cssStart = html.indexOf('<style>');
const cssEnd = html.indexOf('</style>') + '</style>'.length;

const css = html.substr(cssStart, cssEnd);
html = html.substr(cssEnd, html.length);
html = html.trim('\n');

let templateJS = fs.readFileSync(destinationTemplate, 'utf8');

templateJS = templateJS.replace(/html\(p\) {[\s\S]*?\; },/, `html(p) { return \` ${html}\`; },`);
templateJS = templateJS.replace(/css\(p\) {[\s\S]*?\; },/, `css(p) { return \` ${css}\`; },`);

fs.writeFileSync(destinationTemplate, templateJS);
