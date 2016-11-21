'use strict';

const fs = require('fs');

fs.readdir('./scenarios', function ( err, files ) {
  if (err)
    console.error(err);
  if (files)
    for (var i = 0, l = files.length; i < l; i++)
      document.querySelector('#sideNav').innerHTML += files[i] +'<br />';
});
