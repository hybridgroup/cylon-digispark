var cylon = require('cylon');

cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark' },
  // when declaring the servo driver you can add an optional `angleLimits` param
  // (defaults to min: 30 max 150). This param sets limits for the angle,
  // so sot he servo can't be damaged if it cannot move in the full 0-180
  // range, most servos are not capable of this.
  device: {
    name: 'servo',
    driver: 'servo',
    pin: 0,
    limits: {
      bottom: 20, top: 160
    }
  }
})

.on('ready', function(robot){
  var angle = 0,
      increment = 20;

  setInterval(function(){
    angle += increment;

    robot.servo.angle(angle);

    console.log("Current Angle: " + (robot.servo.currentAngle()));

    if ((angle === 0) || (angle === 180)) {
      increment = -increment;
    }
  });
})

.start();
