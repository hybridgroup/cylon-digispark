var cylon = require('cylon');

// Initialize the robot
cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark'},
  device: { name: 'led', driver: 'led', pin: 1 }
})

.on('ready', function(robot){
  setInterval(function(){
    robot.led.toggle();
  }, 1000);
})

.start();
