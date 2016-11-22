'use strict';

var url = document.querySelector('#url');
url.onkeypress = function(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  if (charCode == 13) {
    send();
  }
};
