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
CliCommands = require "./cli/commands"

GPIO = require "cylon-gpio"

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Digispark(args...)

  driver: (args...) ->
    GPIO.driver(args...)

  register: (robot) ->
    robot.registerAdaptor 'cylon-digispark', 'digispark'

    GPIO.register robot

  registerCommands: ->
    littlewire:
      description: "Upload littlewire protocol to digispark"
      command: (args) ->
        subcmd = args[0]

        switch(subcmd)
          when 'upload'
            CliCommands.littlewire.upload()
          when 'set-udev-rules'
            CliCommands.littlewire.setUdevRules()
          else
            console.log("cylon littlewire argument not recognized, try:\n")
            console.log("1.- cylon littlewire upload (make sure NOT to connect the digispark until prompted).")
            console.log("2.- cylon littlewire set-udev-rules\n")

        true
