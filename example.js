var npmwrapper = require('npm-wrapper').npmwrapper;

var base_path = '/tmp/npm_test_1';
var root_path = base_path + '/.root_path';
var binroot_path = base_path + '/.bin_path';
var manroot_path = base_path + '/.man_path';
var action = 'install';
var package = 'express';

var n = new npmwrapper();
n.setup(root_path, binroot_path, manroot_path, action, package);
n.run(function (out) {
  console.log(out);
});
