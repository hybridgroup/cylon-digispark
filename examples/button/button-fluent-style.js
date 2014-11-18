var cylon = require('cylon');

cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark', interval: 0.1 },

  devices: {
    led: { driver: 'led', pin: 0 },
    button: { driver: 'button', pin: 5 }
  }
})

.on('ready', function(robot) {
  robot.button.on('press', function() {
    console.log('press:');
  });

  robot.button.on('release', function() {
    console.log('release: ');
  });

  robot.button.on('push', function() {
    console.log('push: ', robot.button.isPressed());
    robot.led.toggle();
  });
})

.start();
