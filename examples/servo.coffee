Cylon = require 'cylon'

Cylon.robot
  connection:
    name: 'digispark', adaptor: 'digispark'

  # when declaring the servo driver you can add an optional range param
  # (defaults to min: 30 max 150). This param sets limits for the angle,
  # so sot he servo can't be damaged if it cannot move in the full 0-180
  # range, most servos are not capable of this.
  device:
    name: 'servo', driver: 'servo', pin: 0, range: { min: 30, max: 150}

  work: (my) ->
    angle = 30
    increment = 40

    every 1.seconds(), ->
      angle += increment
      my.servo.angle angle

      console.log "Current Angle: #{my.servo.currentAngle()}"

      increment = -increment if (angle is 30) or (angle is 150)

.start()
