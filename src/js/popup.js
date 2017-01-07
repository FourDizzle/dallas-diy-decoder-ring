import "../css/popup.css";
import $ from 'jquery';

var canvas  = document.getElementById('canvas');
var context = canvas.getContext('2d');

$(function () {
  $(':file').change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          context.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
});
