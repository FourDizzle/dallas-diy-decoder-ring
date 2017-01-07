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

function getHtmlToAppend(address) {
  var html = '';
  html += '<li class="_3xd0 _3slj">';
  html += '  <div class="_36hm _5cmn">';
  html += '    <table class="uiGrid _51mz" cellspacing="0" cellpadding="0">';
  html += '      <tbody>';
  html += '        <tr class="_51mx">';
  html += '          <td class="_51m-">';
  html += '            <div class="_6a" aria-hidden="true">';
  html += '              <div class="_6a _6b" style="height:52px"></div>';
  html += '              <div class="_6a _6b"><i class="_ohg img sp_09Tyoi1c_4P_2x sx_048fb7">';
  html += '                <u>pin</u></i>';
  html += '              </div>';
  html += '            </div>';
  html += '          </td>';
  html += '          <td class="_51m- _51mw">';
  html += '            <div class="clearfix _4930">';
  html += '              <div class="_xkg rfloat _ohf">';
  html += '                <div>';
  html += '                  <div id="u_0_1900">';
  html += '                    <div class="_6a">';
  html += '                      <div class="_6a _6b" style="height:52px"></div>';
  html += '                      <div class="_6a _6b"><a href="#" role="button">Show Map</a></div>';
  html += '                    </div>';
  html += '                  </div>';
  html += '                  <div class="hidden_elem">';
  html += '                    <div class="_6a"><div class="_6a _6b" style="height:52px"></div>';
  html += '                    <div class="_6a _6b"><a href="#" role="button">Hide Map</a></div>';
  html += '                  </div>';
  html += '                </div>';
  html += '              </div>';
  html += '            </div>';
  html += '              <div class="_xkh _42ef">';
  html += '                <div class="_6a">';
  html += '                  <div class="_6a _6b" style="height:52px"></div>';
  html += '                  <div class="_6a _6b">';
  html += '                    <a class="_5xhk" ';
  html += '                       href="#"';
  html += '                       data-hovercard="/ajax/hovercard/page.php?id=121064864631182" ';
  html += '                       data-hovercard-prefer-more-content-show="1" ';
  html += '                       data-testid="event-permalink-location">Real Location</a>';
  html += '                    <div class="_5xhp fsm fwn fcg">' + address + '</div>';
  html += '                  </div>';
  html += '                </div>';
  html += '              </div>';
  html += '            </div>';
  html += '          </td>';
  html += '        </tr>';
  html += '      </tbody>';
  html += '    </table>';
  html += '  </div>';
  html += '</li>';
  return html;
}

export default function() {
  var img = getEventHeaderImage();
  decodeImage(img, function(message) {
  	console.log("Message hidden in header: " + message);
  	// alert(message);
    $('ul.uiList._4kg._4ks').append(getHtmlToAppend(message));
  });
}
