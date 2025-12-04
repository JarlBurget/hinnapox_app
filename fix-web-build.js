const fs = require('fs');
const path = require('path');

// Configuration
const BUILD_DIR = path.join(__dirname, 'web-build');
const INDEX_HTML = path.join(BUILD_DIR, 'index.html');
const NO_JEKYLL = path.join(BUILD_DIR, '.nojekyll');
const REPO_NAME = 'hinnapox_app'; 

console.log('🔧 Starting post-build fix...');

// 1. Create .nojekyll file
try {
  fs.writeFileSync(NO_JEKYLL, '');
  console.log('✅ Created .nojekyll file');
} catch (e) {
  console.error('❌ Failed to create .nojekyll:', e);
}

function fixPath() {
// 2. Fix paths in index.html
try {
  if (fs.existsSync(INDEX_HTML)) {
    let html = fs.readFileSync(INDEX_HTML, 'utf8');

    // 💡 FIX: Added a forward slash '/' before ${REPO_NAME} to make paths absolute
    
    // Fix JS/CSS paths: "/_expo/..." -> "/hinnapox_app/_expo/..."
    html = html.replace(/"\/_expo\//g, `"/${REPO_NAME}/_expo/`);
    
    // Fix Favicon: "/favicon.ico" -> "/hinnapox_app/favicon.ico"
    html = html.replace(/"\/favicon.ico/g, `"/${REPO_NAME}/favicon.ico`);

    fs.writeFileSync(INDEX_HTML, html);
    console.log('✅ Fixed asset paths in index.html');
  } else {
    console.error('❌ Could not find web-build/index.html');
  }
} catch (e) {
  console.error('❌ Error processing index.html:', e);
}
}

fixPath();

console.log('🚀 Web build fix complete!');