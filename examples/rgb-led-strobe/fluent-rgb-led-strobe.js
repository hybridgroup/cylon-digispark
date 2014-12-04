var Cylon = require('cylon');

Cylon
  .robot()
  .connection('digispark', { name: 'digispark', adaptor: 'digispark' })
  .device('red', { driver: 'led', pin: 0 })
  .device('green', { driver: 'led', pin: 1 })
  .device('blue', { driver: 'led', pin: 2 })

  .on('ready', function(bot) {
    var brightness = 0,
    fade = 5,
    index = 0,
    keys = Object.keys(bot.devices);

    setInterval(function() {
      brightness += fade;

      console.log('brightness =>', brightness);
      console.log('index =>', index);
      bot[keys[index]].brightness(brightness);

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
  });

Cylon.start();
