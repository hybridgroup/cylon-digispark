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
        'digitalWrite'
      ]

    connect: (callback) ->
      @digispark = new digispark.Digispark()
      (callback)(null)
      @connection.emit 'connect'
      @proxyMethods @commands, @digispark, @myself

    digitalWrite: (pin, value) ->
      @digispark.pinMode pin, 0
      @digispark.digitalWrite pin, value
