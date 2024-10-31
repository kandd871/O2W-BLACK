let testImage;
let probabilitySlider, sizeSlider;

function preload() {
  testImage = loadImage('text.png'); // Load the main text image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scaleTextImageToFitWidth(); // Scale test image to fit screen width
  testImage.loadPixels(); // Load pixel data only once
  background(255); // Set background color only once

  // Create sliders for probability and size
  probabilitySlider = createSlider(0, 100, 11); // Range 0-100, Default 50%
  probabilitySlider.position(20, 20);
  probabilitySlider.style('width', '200px');

  sizeSlider = createSlider(1, 20, 7); // Range 1-20 pixels, Default size 5
  sizeSlider.position(20, 40);
  sizeSlider.style('width', '200px');

  // Call placeDotsOnBlackPixels() only when sliders are moved
  probabilitySlider.input(placeDotsOnBlackPixels);
  sizeSlider.input(placeDotsOnBlackPixels);

  placeDotsOnBlackPixels(); // Initial drawing based on default slider values
}

function scaleTextImageToFitWidth() {
  let aspectRatio = testImage.height / testImage.width;
  testImage.resize(windowWidth, windowWidth * aspectRatio); // Scale to fit width
}

function placeDotsOnBlackPixels() {
  clear();
  background(255); // Reset background

  let imgX = (width - testImage.width) / 2;
  let imgY = (height - testImage.height) / 2;
  let probability = probabilitySlider.value() / 100; // Convert slider value to decimal
  let ellipseSize = sizeSlider.value(); // Get ellipse size from slider

  for (let x = 0; x < testImage.width; x++) {
    for (let y = 0; y < testImage.height; y++) {
      const pixel = getQuick(testImage, x, y);
      const [r, g, b, a] = pixel;

      // Check if the pixel is black (adjust threshold if needed)
      if (r < 10 && g < 10 && b < 10 && a > 0) {
        // Use slider probability to determine dot placement
        if (random(1) < probability) {
          createFlowerInstance(x + imgX, y + imgY, ellipseSize); // Adjust coordinates and size
        }
      }
    }
  }
}

// Helper function to get pixel color quickly
function getQuick(img, x, y) {
  const i = (y * img.width + x) * 4;
  return [
    img.pixels[i],     // Red
    img.pixels[i + 1], // Green
    img.pixels[i + 2], // Blue
    img.pixels[i + 3]  // Alpha
  ];
}

// Function for creating a dot/flower instance with a given size
function createFlowerInstance(x, y, size) {
  fill(0, 0, 0); // Set dot color, e.g., black
  noStroke();
  ellipse(x, y, size, size); // Draw a circle (dot) with specified size
}

function draw() {
  // Nothing here since we're only redrawing when sliders are moved
}
