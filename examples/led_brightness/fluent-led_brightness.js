var Cylon = require('cylon');

Cylon
  .robot()
  .connection('digispark', { adaptor: 'digispark' })
  .device('led', { driver: 'led', pin: 0 })

  .on('ready', function(bot) {
    var brightness = 0,
        fade = 5;

    setInterval(function() {
      brightness += fade;

      bot.led.brightness(brightness);

      fade = ((brightness === 0) || (brightness === 255)) ? -fade : fade;
    }, 50);
  });

Cylon.start();
