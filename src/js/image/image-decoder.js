// image-decoder.js

// returns an array of [r,g,b,a] values for each pixel in image
function getPixelArrayFromImage(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var imgData = [];
  var pixelArray = [];

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  imgData = ctx.getImageData(0, 0, img.width, img.height);

  for (var i = 0; i < imgData.data.length; i += 4) {
    pixelArray.push([imgData.data[i], imgData.data[i+1], imgData.data[i+2], imgData.data[i+3]]);
  }
  return pixelArray;
}

function getDecimalValueFromEightPixels(pixels) {
  var binary = '';
  for (var i = 0; i < 8; i++) {
    //the binary bit is hidden in the red value of each pixel ([r,g,b,a])
    if (pixels[i][0] > 127) {
      binary += '0';
    } else {
      binary += '1';
    }
  }
  return parseInt(binary, 2);
}

function getAsciiFromPixels(pixels) {
  var ascii = '';
  for (var i = 0; i < pixels.length; i += 8) {
    ascii += String.fromCharCode(getDecimalValueFromEightPixels(pixels.slice(i, i + 8)));
  }
  return ascii;
}

function getMessageLength(pixels) {
  var length = 0;
  if (getAsciiFromPixels(pixels.slice(0,24)) === 'DIY') {
    length = getDecimalValueFromEightPixels(pixels.slice(24, 32));
  }
  return length;
}

function getMessage(pixels, messageLength) {
  var messagePixels = pixels.slice(32, 32 + messageLength * 8);
  return getAsciiFromPixels(messagePixels);
}

function decodeImage(img) {
  var pixels = getPixelArrayFromImage(img);
  return getMessage(pixels, getMessageLength(pixels));
}

export { decodeImage };