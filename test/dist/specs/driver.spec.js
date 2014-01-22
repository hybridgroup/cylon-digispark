(function() {
  'use strict';
  var driver;

  driver = source("driver");

  describe("Cylon.Drivers.Digispark", function() {
    var module;
    module = new Cylon.Drivers.Digispark({
      device: {
        connection: 'connect'
      }
    });
    return it("needs tests");
  });

}).call(this);
