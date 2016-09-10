var $overlay = $("<div id=\"overlay\"></div>");
var $image = $("<img>");
var $caption = $("<p></p>");
var $nextButton = $("<button>Next</button>");
var $prevButton = $("<button>Prev</button>");
var $closeButton = $("<button>Close</button>");

// Append empty image container to overlay
$overlay.append($image);
// Append empty caption container to overlay
$overlay.append($caption);
// Append prev and next button
$overlay.append($prevButton);
$overlay.append($nextButton);
// Append close button
$overlay.append($closeButton);
// Add overlay
$("body").append($overlay);


// Array of image Objects for the images inside the imageGallery
var imgJSON = [];

// Array of each href attribute of the links inside imageGallery
var imageSrcArray = $("#imageGallery a").map(function() {
  return $(this).attr("href");
}).get();

// Array of each title attribute of the images inside imageGallery
var imageCaptionArray = $("#imageGallery a img").map(function() {
  return $(this).attr("alt");
}).get();


// Lets populate imageJSON
for (var i = 0; i < imageSrcArray.length; i++) {
  imgJSON.push({
    src: imageSrcArray[i],
    title: imageCaptionArray[i],
    location: i
  });
}

// function that returns the current image Object based on the src we're looking
function findCurrentImage(arrayOfObjects, src) {
  for (var i = 0; i < arrayOfObjects.length; i++) {
    var result = arrayOfObjects[i].src.indexOf(src);
    if (result > -1) {
      return arrayOfObjects[i];
    }
  }
}

// function that animates the image on the transition
function animateImage() {
  $image.hide();
  $image.fadeIn("fast");
}

// click event on the image's link
$("#imageGallery a").click(function(event) {
  // we prevent the browser's default event when clicking the link
  event.preventDefault();
  // we get the href attribute from the link and the alt attribute from the image we clicked
  var imageSrc = $(this).attr("href");
  var imageCaption = $(this).children("img").attr("alt");
  $image.attr("src", imageSrc);
  $caption.text(imageCaption);

  // Showing the overlay
  $overlay.fadeIn();

});

// click event for the close button
$closeButton.click(function() {
  $overlay.fadeOut();
});

// click event for the next button
$nextButton.click(function() {
  // we get the current src attribute from the image
  var imageCurrentSrc = $(this).siblings("img").attr("src");
  // based on the current src attribute we look for the image at the array of objects in order to get to get all of its attributes and work more organized
  var currentImage = findCurrentImage(imgJSON, imageCurrentSrc);
  // if we are at the end, we'll move to the first image updating src attribute of the image and setting new text for the parragraph inside the overlay
  if (currentImage.location === imgJSON.length - 1) {
    $image.attr("src", imgJSON[0].src);
    $caption.text(imgJSON[0].title);
  } else {
    // otherwise we move to the next image updating src attribute of the image and setting new text for the parragraph inside the overlay
    $image.attr("src", imgJSON[currentImage.location + 1].src);
    $caption.text(imgJSON[currentImage.location + 1].title);
  }
  // we animate the image transition
  animateImage();
});

// click event for the prev button
$prevButton.click(function() {
  // we get the current src attribute from the image
  var imageCurrentSrc = $(this).siblings("img").attr("src");
  // based on the current src attribute we look for the image at the array of objects in order to get to get all of its attributes and work more organized
  var currentImage = findCurrentImage(imgJSON, imageCurrentSrc);
  // if we are at the first image, we'll move to the last updating src attribute of the image and setting new text for the parragraph inside the overlay
  if (currentImage.location === 0) {
    $image.attr("src", imgJSON[imgJSON.length - 1].src);
    $caption.text(imgJSON[[imgJSON.length - 1]].title);
  } else {
    // otherwise well move to the previous image updating src attribute of the image and setting new text for the parragraph inside the overlay
    $image.attr("src", imgJSON[currentImage.location - 1].src);
    $caption.text(imgJSON[currentImage.location - 1].title);
  }
  // we animate the image transition
  animateImage();
});
