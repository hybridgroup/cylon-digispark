require "cylon"
os = require('os')
fs = require('fs')
path = require('path')

littlewire =
  upload: () ->
    cylonProcess = new Cylon.Process
    switch(os.platform())
      when 'linux'
        uploadCmd = path.join "#{ __dirname }", "../../src/cli/deps/littlewireLoader_v13"
        # if the udevRules are just set by this command then we wait 5 seconds for the OS
        # to pick them up and then continue to upload littlewire to the digispark
        if @_copyUdev()
          setTimeout( ->
            cylonProcess.spawn(uploadCmd, [])
          , 5000)
        else
            cylonProcess.spawn(uploadCmd, [])
      when 'darwin'
        cylonProcess.spawn(uploadCmd, [])
      else
        console.log('OS not yet supported...\n')

    true

  setUdevRules: () ->
    @_copyUdev(true)

    true

  _copyUdev: (force = false) ->
     udevSysPath = '/etc/udev/rules.d/49-micronucleus.rules'
     udevBkpPath = path.join "#{ __dirname }", "../../src/cli/deps/49-micronucleus.rules"
     if !fs.existsSync(udevSysPath) or force
       cylonProcess = new Cylon.Process
       cylonProcess.spawn('sudo', ['cp', udevBkpPath, udevSysPath])
       true
     else
       false

module.exports = littlewire
