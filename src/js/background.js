// background.js

import * as decoder from './background/image-decoder';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'decode_image') {
    var img = new Image();
    var payload = '';
    img.addEventListener('load', function() {
      payload = decoder.decodeImage(img);
      sendResponse({ payload: payload });
    });
    img.src = request.src;
    return true;
  }
});
