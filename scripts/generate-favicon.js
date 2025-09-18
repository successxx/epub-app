const fs = require('fs');
const path = require('path');
const { createCanvas, Image } = require('canvas');

// Read the SVG file
const svgPath = path.join(__dirname, '../public/logo.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

// Replace currentColor with actual color for PNG conversion
const svgWithColor = svgContent.replace(/currentColor/g, '#000000');

// Create sizes for different favicon requirements
const sizes = [16, 32, 48, 64, 128, 256];

// Function to generate PNG from SVG
async function generatePNG(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Create an image from SVG
  const img = new Image();
  img.src = `data:image/svg+xml;base64,${Buffer.from(svgWithColor).toString('base64')}`;

  // Scale and draw the image
  ctx.drawImage(img, 0, 0, size, size);

  // Save PNG
  const buffer = canvas.toBuffer('image/png');
  const outputPath = path.join(__dirname, `../public/favicon-${size}x${size}.png`);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: favicon-${size}x${size}.png`);

  // Also create a standard favicon.png (32x32)
  if (size === 32) {
    fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), buffer);
    console.log('Generated: favicon.png');
  }
}

// Generate all sizes
Promise.all(sizes.map(size => generatePNG(size)))
  .then(() => console.log('All favicons generated successfully!'))
  .catch(err => console.error('Error generating favicons:', err));