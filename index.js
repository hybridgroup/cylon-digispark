"use strict";

var Digispark = require("./lib/digispark");

module.exports = {
  adaptors: ["digispark"],
  dependencies: ["cylon-gpio"],

  adaptor: function(args) {
    return new Digispark(args);
  }
};
