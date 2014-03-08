var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    namespace = require('node-namespace');

namespace('Cylon.CLI', function() {
  this.Littlewire = (function() {
    function Littlewire() {
      this.uploadCmd = path.join("" + __dirname, "deps/littlewireLoader_v13");
      this.process = new Cylon.Process();
    }

    Littlewire.prototype.upload = function() {
      switch (os.platform()) {
        case 'linux':
          if (this._copyUdev()) {
            setTimeout(function() {
              this.process.spawn(this.uploadCmd, []);
            }, 5000);
          } else {
            this.process.spawn(this.uploadCmd, []);
          }
          break;
        case 'darwin':
          this.process.spawn(this.uploadCmd, []);
          break;
        default:
          console.log('OS not yet supported...\n');
      }
    };

    Littlewire.prototype.setUdevRules = function() {
      this._copyUdev(true);
    };

    Littlewire.prototype._copyUdev = function(force) {
      var copied = false;
      if (force === null) {
        force = false;
      }

      udevSysPath = '/etc/udev/rules.d/49-micronucleus.rules';
      udevBkpPath = path.join("" + __dirname, "./deps/49-micronucleus.rules");

      if (!fs.existsSync(udevSysPath) || force) {
        this.process = new Cylon.Process();
        this.process.spawn('sudo', ['cp', udevBkpPath, udevSysPath]);
        copied = true;
      }

      return copied;
    };

    return Littlewire;

  })();
});
