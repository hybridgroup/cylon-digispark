(function() {
  var ChildProcess, fs, littlewire, os, path;

  ChildProcess = require('./child_process');

  os = require('os');

  fs = require('fs');

  path = require('path');

  littlewire = {
    upload: function() {
      var uploadCmd;
      switch (os.platform()) {
        case 'linux':
          uploadCmd = path.join("" + __dirname, "../../src/cli/deps/littlewireLoader_v13");
          if (this._copyUdev()) {
            setTimeout(function() {
              return ChildProcess.spawn(uploadCmd, []);
            }, 5000);
          } else {
            ChildProcess.spawn(uploadCmd, []);
          }
          break;
        case 'darwin':
          ChildProcess.spawn(uploadCmd, []);
          break;
        default:
          console.log('OS not yet supported...\n');
      }
      return true;
    },
    setUdevRules: function() {
      this._copyUdev(true);
      return true;
    },
    _copyUdev: function(force) {
      var udevBkpPath, udevSysPath;
      if (force == null) {
        force = false;
      }
      udevSysPath = '/etc/udev/rules.d/49-micronucleus.rules';
      udevBkpPath = path.join("" + __dirname, "../../src/cli/deps/49-micronucleus.rules");
      if (!fs.existsSync(udevSysPath) || force) {
        ChildProcess.spawn('sudo', ['cp', udevBkpPath, udevSysPath]);
        return true;
      } else {
        return false;
      }
    }
  };

  module.exports = littlewire;

}).call(this);
