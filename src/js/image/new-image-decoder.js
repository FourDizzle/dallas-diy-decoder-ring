// new-image-decoder.js

import * as pixel from './pixel-manipulator';

function makeImageCanvas(img) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return canvas;
}

function decodeImage(img) {
  return pixel.decodeDataFromPixels(
    pixel.getPixelArrayFromCanvas(makeImageCanvas(img)));
}
