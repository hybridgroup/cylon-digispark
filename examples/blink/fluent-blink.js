var Cylon = require('cylon');

Cylon
  .robot()
  .connection('digispark', { adaptor: 'digispark' })
  .device('led', { driver: 'led', pin: 1 })

  .on('ready', function(bot) {
    setInterval(function() {
      bot.led.toggle();
    }, 1000);
  });

Cylon.start();
