var Cylon = require('cylon');

Cylon.robot({
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
  },

  work: function(my){
    var angle = 0,
        increment = 20;

    every((1).seconds(), function(){
      angle += increment;

      my.servo.angle angle;

      console.log("Current Angle: " + (my.servo.currentAngle()));

      if ((angle === 0) || (angle === 180)) {
        increment = -increment;
      }
    });
  }
}).start();
