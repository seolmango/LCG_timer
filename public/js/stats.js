const images = document.querySelectorAll(".slide");
let currentIndex = 0;

function showNextImage() {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}

setInterval(showNextImage, 15000);

// Initialize the first image
images[currentIndex].classList.add("active");
