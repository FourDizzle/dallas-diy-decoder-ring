// pixel-manipulator.js
import _ from 'lodash';

import config from '../config';

// returns an array of [r,g,b,a] values for each pixel in image
function getPixelArrayFromCanvas(canvas) {
  let ctx = canvas.getContext('2d');
  _.chunk(ctx.getImageData(0, 0, canvas.width, canvas.height), 2);
}

// returns number value of 1 or 0
function getBitFromPixel(pixel) {
  // comparing numeric value of least significant hexidecimal
  // digit of the red component of the pixel
  if (parseInt(pixel[0].toString(16).slice(1), 16) >= 8) {
    return 0;
  } else {
    return 1;
  }
}

// returns decimal value of arbitrarily long array of pixels
function getDecimalValueFromPixels(pixels) {
  return parseInt(
    pixels.map(pixel => getBitFromPixel(pixel).toString()).join(''),
    2);
}

function getAsciiFromPixels(pixels) {
  return _.chunk(pixels, 8)
    .map(byte => String.fromCharCode(getDecimalFromPixels(byte)))
    .join('');
}

function encodeBitInPixel(bit, pixel) {
  if (bit === 1) {
    return [
      parseInt(pixel[0].toString(16).slice(0, 1) + '0'),
      parseInt(pixel[1].toString(16).slice(0, 1) + '0'),
      parseInt(pixel[2].toString(16).slice(0, 1) + '0'),
      255 // alpha value to full opaque
    ];
  } else {
    return [
      parseInt(pixel[0].toString(16).slice(0, 1) + 'f'),
      parseInt(pixel[1].toString(16).slice(0, 1) + 'f'),
      parseInt(pixel[2].toString(16).slice(0, 1) + 'f'),
      255
    ];
  }
}

// returns array of eight numbers 1s and 0s
function numberToBitArray(number) {
  return ("000000000" + number.toString(2))
    .substr(-8).split('').map(x => parseInt(x));
}

// take array of bytes (as numbers) and encodes array of pixels with it
function encodeDataInPixels(data, pixels) {
  return data.map(byte => numberToBitArray(byte))
    .reduce((acc, cur) => acc.concat(cur), [])
    .reduce((acc, cur, index) =>
      acc.concat(encodeBitInPixel(cur, pixels[index])), [])
    .concat(pixels.slice(data.length * 8));
}

// returns data encoded in pixels. does not decrypt that data.
function decodeDataFromPixels(pixels) {
  if (getAsciiFromPixels(pixels.slice(0, config.prefix.length)) ===
        config.prefix) {
    return getAsciiFromPixels(
      pixels.slice(
        config.prefix.length + messageLengthBytes,
        config.prefix.length + messageLengthBytes +
          getDecimalValueFromPixels(
            pixels.slice(
              config.prefix.length,
              config.prefix.length + messageLengthBytes))));
  }
}

export {
  getPixelArrayFromCanvas,
  getBitFromPixel,
  getDecimalValueFromPixels,
  getAsciiFromPixels,
  encodeBitInPixel,
  numberToBitArray,
  encodeDataInPixels,
  decodeDataFromPixels
}
