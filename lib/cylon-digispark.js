/*
 * cylon-digispark
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Digispark = require('./digispark');

module.exports = {
  adaptors: ['digispark'],
  dependencies: ['cylon-gpio'],

  adaptor: function(args) {
    return new Digispark(args);
  }
};
