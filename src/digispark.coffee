###
 * cylon-digispark adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

"use strict"

namespace = require 'node-namespace'

require './cylon-digispark'
digispark = require '../build/Release/digispark.node'

namespace 'Cylon.Adaptors', ->
  class @Digispark extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      @digispark = ""
      @myself = this
    commands: ->
      [
        'digitalWrite', 'digitalRead', 'servoWrite', 'pwmWrite'
      ]

    connect: (callback) ->
      @digispark = new digispark.Digispark()
      (callback)(null)
      @connection.emit 'connect'
      @proxyMethods @commands, @digispark, @myself

    digitalWrite: (pin, value) ->
      @digispark.pinMode pin, 0
      @digispark.digitalWrite pin, value

    digitalRead: (pin, callback) ->
      @digispark.pinMode pin, 1
      @digispark.digitalRead pin, callback

    servoWrite: (pin, value) ->
      @digispark.servoWrite value

    pwmWrite: (pin, value) ->
      @digispark.pwmWrite value
