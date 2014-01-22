###
 * cylon-digispark
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

namespace = require 'node-namespace'

require 'cylon'
require './digispark'

GPIO = require "cylon-gpio"

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Digispark(args...)

  driver: (args...) ->
    GPIO.driver(args...)

  register: (robot) ->
    robot.registerAdaptor 'cylon-digispark', 'digispark'

    GPIO.register robot
