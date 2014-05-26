var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark' },
  devices: [
    { name: 'red', driver: 'led', pin: 0 },
    { name: 'green', driver: 'led', pin: 1 },
    { name: 'blue', driver: 'led', pin: 2 }
  ],

  work: function(my){
    brightness = 0;
    fade = 5;

    every((0.05).seconds(), function(){
      brightness += fade;

      my.red.brightness(brightness);
      my.green.brightness(brightness);
      my.blue.brightness(brightness);

      fade = ((brightness == 0) || (brightness == 255)) ? -fade : fade;
    });
  }
}).start();
