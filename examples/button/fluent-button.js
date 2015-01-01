"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("digispark", { adaptor: "digispark", interval: 0.1 })

  .device("led", { driver: "led", pin: 0 })
  .device("button", { driver: "button", pin: 5 })

  .on("ready", function(bot) {
    bot.button.on("press", function() {
      console.log("press:");
    });

    bot.button.on("release", function() {
      console.log("release: ");
    });

    bot.button.on("push", function() {
      console.log("push: ", bot.button.isPressed());
      bot.led.toggle();
    });
  });

Cylon.start();
