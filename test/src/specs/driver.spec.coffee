'use strict'

driver = source("driver")

describe "Cylon.Drivers.Digispark", ->
  module = new Cylon.Drivers.Digispark
    device: { connection: 'connect' }

  it "needs tests"
