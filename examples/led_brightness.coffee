Cylon = require 'cylon'

Cylon.robot
  connection: { name: 'digispark', adaptor: 'digispark' }
  device: { name: 'led', driver: 'led' }

  work: (my) ->
    brightness = 0
    fade = 5

    every 0.05.seconds(), ->
      brightness += fade
      my.led.brightness(brightness)
      fade = -fade if (brightness is 0) or (brightness is 255)

.start()
