var cylon = require('cylon');

cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark' },
  device: { name: 'led', driver: 'led', pin: 0 }
})

.on('ready', function(robot){
  var brightness = 0,
      fade = 5;

  setInterval(function(){
    brightness += fade;

    robot.led.brightness(brightness);

    fade = ((brightness === 0) || (brightness === 255)) ? -fade : fade;
  }, 50);
})

.start();
