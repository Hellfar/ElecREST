'use strict';

const fs = require('fs');
const path = require('path');

var scenarios = {};

function implement_scenario( scenario_file ) {
  var content = fs.readFileSync(scenario_file, 'utf8');
  var json_scenario = JSON.parse(content);

  scenarios[path.basename(scenario_file, '.json')] = json_scenario;
}

if (!module)
  module = {};

module.exports = {
  "implement_scenario": implement_scenario,
};

// fs.readdir('./scenarios', function ( err, files ) {
//   if (err)
//     console.error(err);
//   if (files)
//     for (var i = 0, l = files.length; i < l; i++)
//       scenarios.push(files[i]);
//   console.log(scenarios);
// });
