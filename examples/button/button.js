var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark', readInterval: 0.1 },

  devices: [
    { name: 'led', driver: 'led', pin: 0, readInterval: 0.5 },
    { name: 'button', driver: 'button', pin: 5 }
  ],

  work: function(my) {
    my.button.on('press', function() {
      console.log('press:');
    });

    my.button.on('release', function() {
      console.log('release: ');
    });

    my.button.on('push', function() {
      console.log('push: ', my.button.isPressed());
      my.led.toggle();
    });
  }
}).start();
