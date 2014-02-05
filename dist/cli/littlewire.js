(function() {
  var fs, littlewire, os, path;

  require("cylon");

  os = require('os');

  fs = require('fs');

  path = require('path');

  littlewire = {
    upload: function() {
      var cylonProcess, uploadCmd;
      cylonProcess = new Cylon.Process;
      switch (os.platform()) {
        case 'linux':
          uploadCmd = path.join("" + __dirname, "../../src/cli/deps/littlewireLoader_v13");
          if (this._copyUdev()) {
            setTimeout(function() {
              return cylonProcess.spawn(uploadCmd, []);
            }, 5000);
          } else {
            cylonProcess.spawn(uploadCmd, []);
          }
          break;
        case 'darwin':
          cylonProcess.spawn(uploadCmd, []);
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
      var cylonProcess, udevBkpPath, udevSysPath;
      if (force == null) {
        force = false;
      }
      udevSysPath = '/etc/udev/rules.d/49-micronucleus.rules';
      udevBkpPath = path.join("" + __dirname, "../../src/cli/deps/49-micronucleus.rules");
      if (!fs.existsSync(udevSysPath) || force) {
        cylonProcess = new Cylon.Process;
        cylonProcess.spawn('sudo', ['cp', udevBkpPath, udevSysPath]);
        return true;
      } else {
        return false;
      }
    }
  };

  module.exports = littlewire;

}).call(this);
