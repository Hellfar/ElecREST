'use strict';

function send() {
  // Attempt to creat the XHR2 object
  var xhttp;
  try {
    xhttp = new XMLHttpRequest();
  } catch (e) {
    try {
      xhttp = new XDomainRequest();
    } catch (e) {
      try {
        xhttp = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {
        try {
          xhttp = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {
          throw ('Your browser is not compatible with XHR2');
        }
      }
    }
  }
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      document.querySelector('#status').innerHTML = "Status: "+ xhttp.status;
      document.querySelector('#responseBody').innerHTML = xhttp.responseText;
    }
  };
  var n_data = document.querySelectorAll("#data .pair"),
      l_n_data = n_data.length,
      data = {},
      method = document.querySelector("#method").value,
      url = document.querySelector("#url").value,
      headers = document.querySelectorAll("#request #header .param"),
      l_headers = headers.length,
      body = document.querySelector("#body").value;

  if (!url)
    return ;
  if (url.substr(0, 7) != "http://" && url.substr(0, 8) != "https://")
    url = "http://"+ url;
  console.log(method, url);

  for (var i = 0; i < l_n_data; i++) {
    var n_k = n_data[i].querySelector(".key"),
        n_v = n_data[i].querySelector(".value");

    data[n_k.value] = n_v.value;
    console.log(n_k.value, n_v.value);
  }

  xhttp.open(method, url, true);
  for (var i = 0; i < l_headers; i++) {
    var param = headers[i],
        k = env_dereference(param.querySelector("select").value, data),
        v = env_dereference(param.querySelector("input").value, data),
        t_pos = -1;

    xhttp.setRequestHeader(k, v);
  }
  xhttp.send(body);
}
