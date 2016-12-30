// fb-interface.js

import $ from 'jquery';

function getEventHeaderImage() {
  var img = $('div.coverImage>a>img.coverPhotoImg').get();
  return img[0];
}

function decodeImage(img, callback) {
  chrome.runtime.sendMessage({ message: 'decode_image', src: img.src },
  	function(response) {
      if (typeof callback === 'function') {
      	callback(response.payload);
      }
  	});
}

export default function() {
  var img = getEventHeaderImage();
  decodeImage(img, function(message) {
  	console.log("Message hidden in header: " + message);
  	alert(message);
  });
}