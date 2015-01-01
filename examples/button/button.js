"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    digispark: { adaptor: "digispark", interval: 0.1 }
  },

  devices: {
    led: { driver: "led", pin: 0 },
    button: { driver: "button", pin: 5 }
  },

  work: function(my) {
    my.button.on("press", function() {
      console.log("press:");
    });

    my.button.on("release", function() {
      console.log("release: ");
    });

    my.button.on("push", function() {
      console.log("push: ", my.button.isPressed());
      my.led.toggle();
    });
  }
}).start();
