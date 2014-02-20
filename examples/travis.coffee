Cylon = require 'cylon'
Travis = require 'travis-ci'
travis = new Travis
  version: '2.0.0'

Cylon.robot
  connection: { name: 'digispark', adaptor: 'digispark'}

  devices: [
    { name: 'red', driver: 'led', pin: 0 },
    { name: 'green', driver: 'led', pin: 1 },
    { name: 'blue', driver: 'led', pin: 2 }
  ]

  resetLeds: (me) =>
    me.blue.turnOff()
    me.red.turnOff()
    me.green.turnOff()

  checkTravis: (me) =>
    user = "hybridgroup"
    name = "cylon"
#    name = "broken-arrow"
    console.log "Checking repo #{user}/#{name}"
    me.blue.turnOn()

    travis.repos {
      owner_name: user,
      name: name
    }, (err, res) =>
      if res.repo
        me.resetLeds(me)
        switch res.repo.last_build_state
          when 'passed' then me.green.turnOn()
          when 'failed' then me.red.turnOn()
          else me.blue.turnOn()
      else
        me.blue.turnOn()

  work: (me) ->
    me.resetLeds(me)
    me.checkTravis(me)

    every 10.seconds(), ->
      me.resetLeds(me)
      me.checkTravis(me)

.start()
