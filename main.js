new WOW().init();



let header = document.querySelector('.header');
let hamburgerMenu = document.querySelector('.hamburger-menu');


window.addEventListener('scroll', function() {
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('active', windowPosition)
})

hamburgerMenu.addEventListener('click', function() {
    header.classList.toggle('menu-open');
})

let aboutImage = document.querySelector('.about-image');

window.addEventListener('scroll', function () {
    let windowPosition = window.scrollY + window.innerHeight;

    // Change the value based on your design and when you want the animation to start
    let aboutImagePosition = aboutImage.offsetTop + aboutImage.offsetHeight / 2;

    if (windowPosition > aboutImagePosition) {
        aboutImage.classList.add('img-visible');
    }
});


/*Gallery Section in index.html*/
var angle = 0;
var currentImageIndex = 0;

function galleryspin(sign) { 
    const spinner = document.querySelector("#spinner");
    const images = spinner.querySelectorAll('img');
    const isSmallScreen = window.innerWidth <= 1023;

    if (isSmallScreen) {
        // Hide the current image
        images[currentImageIndex].style.display = 'none';

        // Determine the next image index
        if (sign === '-') { 
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; 
        } else { 
            currentImageIndex = (currentImageIndex + 1) % images.length; 
        }

        // Show the next image
        images[currentImageIndex].style.display = 'block';
    } else {
        // Handle the 3D carousel rotation only for larger screens
        if (!sign) { 
            angle = angle + 45; 
        } else { 
            angle = angle - 45; 
        }
        spinner.style.transform = `rotateY(${angle}deg)`;
    }
}

window.addEventListener('resize', function() {
    const spinner = document.querySelector("#spinner");
    const images = spinner.querySelectorAll('img');

    if (window.innerWidth <= 1023) {
        // Reset images to show only the first one when switching to small screen
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
            img.style.transform = 'rotateY(0deg)'; // Ensure no rotation for small screens
        });
        currentImageIndex = 0;
        // Remove any rotation applied to the spinner
        spinner.style.transform = 'none';
    } else {
        // Ensure all images are visible when switching to large screen
        images.forEach(img => {
            img.style.display = 'block';
            img.style.transform = ''; // Reset to the original rotation for large screens
        });
        // Reset the 3D carousel rotation if it was on a smaller screen
        spinner.style.transform = `rotateY(${angle}deg)`;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const galleryTitle = document.querySelector('.gallery-title');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                galleryTitle.classList.add('in-view');
            }
        });
    });

    observer.observe(galleryTitle);
});



/*Highlights javascript*/
// Gallery image hover
$( ".img-wrapper" ).hover(
    function() {
      $(this).find(".img-overlay").animate({opacity: 1}, 600);
    }, function() {
      $(this).find(".img-overlay").animate({opacity: 0}, 600);
    }
  );
  
  // Lightbox
  var $overlay = $('<div id="overlay"></div>');
  var $image = $("<img>");
  var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
  var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
  var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');
  
  // Add overlay
  $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
  $("#gallery").append($overlay);
  
  // Hide overlay on default
  $overlay.hide();
  
  // When an image is clicked
  $(".img-overlay").click(function(event) {
    // Prevents default behavior
    event.preventDefault();
    // Adds href attribute to variable
    var imageLocation = $(this).prev().attr("href");
    // Add the image src to $image
    $image.attr("src", imageLocation);
    // Fade in the overlay
    $overlay.fadeIn("slow");
  });
  
  // When the overlay is clicked
  $overlay.click(function() {
    // Fade out the overlay
    $(this).fadeOut("slow");
  });
  
  // When next button is clicked
  $nextButton.click(function(event) {
    // Hide the current image
    $("#overlay img").hide();
    // Overlay image location
    var $currentImgSrc = $("#overlay img").attr("src");
    // Image with matching location of the overlay image
    var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
    // Finds the next image
    var $nextImg = $($currentImg.closest(".image").next().find("img"));
    // All of the images in the gallery
    var $images = $("#image-gallery img");
    // If there is a next image
    if ($nextImg.length > 0) { 
      // Fade in the next image
      $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
    } else {
      // Otherwise fade in the first image
      $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
    }
    // Prevents overlay from being hidden
    event.stopPropagation();
  });
  
  // When previous button is clicked
  $prevButton.click(function(event) {
    // Hide the current image
    $("#overlay img").hide();
    // Overlay image location
    var $currentImgSrc = $("#overlay img").attr("src");
    // Image with matching location of the overlay image
    var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
    // Finds the next image
    var $nextImg = $($currentImg.closest(".image").prev().find("img"));
    // Fade in the next image
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
    // Prevents overlay from being hidden
    event.stopPropagation();
  });
  
  // When the exit button is clicked
  $exitButton.click(function() {
    // Fade out the overlay
    $("#overlay").fadeOut("slow");
  });