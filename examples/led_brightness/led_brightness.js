var Cylon = require('cylon');

Cylon.robot({
  connections: {
    digispark: { adaptor: 'digispark' }
  },

  devices: {
    led: { driver: 'led', pin: 0 }
  },

  work: function(my) {
    var brightness = 0,
        fade = 5;

    every((0.05).seconds(), function() {
      brightness += fade;

      my.led.brightness(brightness);

      fade = ((brightness === 0) || (brightness === 255)) ? -fade : fade;
    });
  }
}).start();
