'use strict';

const fs = require('fs');

var scenarios = [];

fs.readdir('./scenarios', function ( err, files ) {
  if (err)
    console.error(err);
  if (files)
    for (var i = 0, l = files.length; i < l; i++)
      scenarios.push(files[i]);
  console.log(scenarios);
});
