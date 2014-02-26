Cylon = require 'cylon'

# Initialize the robot
Cylon.robot
  connection: { name: 'digispark', adaptor: 'digispark'}
  device: { name: 'led', driver: 'led', pin: 2 }

  work: (my) ->

    every 1.second(), -> my.led.toggle()

.start()
