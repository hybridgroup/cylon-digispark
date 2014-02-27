var cliCommands, littlewire;

littlewire = require('./littlewire');

cliCommands = {
  littlewire: {
    upload: littlewire.upload,
    setUdevRules: littlewire.setUdevRules,
    _copyUdev: littlewire._copyUdev
  }
};

module.exports = cliCommands;
