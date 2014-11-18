var cylon = require('cylon');

cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark' },
  devices: {
    red: { driver: 'led', pin: 0 },
    green: { driver: 'led', pin: 1 },
    blue: { driver: 'led', pin: 2 }
  }
})

.on('ready', function(robot){
  var brightness = 0,
  fade = 5,
  index = 0,
  keys = Object.keys(robot.devices);

  setInterval(function(){
    brightness += fade;

    console.log('brightness =>', brightness);
    console.log('index =>', index);
    robot[keys[index]].brightness(brightness);

    if ((brightness === 0) || (brightness === 255)) {
      if (index === 2) {
        index = 0;
        fade = -fade;
      }else{
        brightness = (fade > 0) ? 0 : 255;
        index++;
      }
    }
  }, 50);
})

.start();
