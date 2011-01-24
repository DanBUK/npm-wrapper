var npm = require('npm');

var npmwrapper = function () {
  this.config = {};
  this.command = "";
  this.package = "";
  this.output = "";
};

npmwrapper.prototype.setup = function (root_path, binroot_path, manroot_path, command, package) {
  process.env.PATH = binroot_path + ":" + process.env.PATH;
  this.command = command;
  this.package = package;
  this.config = {
    color: false,
    root: root_path,
    binroot: binroot_path,
    manroot: manroot_path,
    argv: {
      remain: [ package ],
      cooked: [
        command,
        package,
        '--root',
        root_path,
        '--binroot',
        binroot_path,
        '--manpath',
        manroot_path
      ],
      original: [ ]
    }
  };
  this.config.argv.original = this.config.argv.cooked;
};

npmwrapper.prototype.run = function (cb) {
  var self = this;
  npm.on('output', function (obj) {
    self.output += obj.message + "\n";
    npm.output = false;
  });
  npm.load(self.config, function (err) {
    if (err) console.log(err);
    npm.commands[self.command](self.config.argv.remain, function (err, data) {
      cb(self.output);
    });
  });
};

exports.npmwrapper = npmwrapper;
