document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const logo = new Image();
  logo.src = "../static/tempLSG-white.png"; // Make sure this is the correct path to your logo file
  logo.onload = () => {
    animateText();
  };

  let textY = canvas.height; // Start the text off-screen at the bottom
  const text = "Your Text Here";
  const fontSize = 48;
  ctx.font = `${fontSize}px Arial`; // Set font size and family

  function animateText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    const logoX = (canvas.width - logo.width) / 2;
    const logoY = (canvas.height - logo.height) / 2;
    ctx.drawImage(logo, logoX, logoY); // Redraw the logo

    if (textY < -50) {
      textY = canvas.height + 50; // Reset the text to start from the bottom again
    }

    const textWidth = ctx.measureText(text).width;
    const textX = (canvas.width - textWidth) / 2;

    // Draw the text normally
    ctx.fillStyle = "white";
    ctx.fillText(text, textX, textY); // Draw the text in white

    // Get the image data for the entire canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Loop over only the area where the text is drawn
    for (let y = textY; y < textY + fontSize; y++) {
      for (let x = textX; x < textX + textWidth; x++) {
        const index = (y * imageData.width + x) * 4;
        if (pixels[index + 3] > 0) {
          // Check if pixel is not fully transparent
          // Invert colors where alpha is not 0 (logo is present)
          pixels[index] = 255 - pixels[index]; // Invert Red
          pixels[index + 1] = 255 - pixels[index + 1]; // Invert Green
          pixels[index + 2] = 255 - pixels[index + 2]; // Invert Blue
        }
      }
    }
    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);

    textY -= 2; // Move text up
    requestAnimationFrame(animateText); // Continue the animation
  }
});
