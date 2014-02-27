var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark'},
  device: { name: 'led', driver: 'led', pin: 1 },

  work: function(my){
    every((1).second(), function(){
      my.led.toggle();
    });
  }
}).start();
