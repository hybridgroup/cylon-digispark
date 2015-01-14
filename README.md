# Cylon.js For Digispark

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Cylon adaptor for the [Digispark](http://www.kickstarter.com/projects/digistump/digispark-the-tiny-arduino-enabled-usb-dev-board) ATTiny-based USB development board with the [Little Wire](http://littlewire.cc/) protocol firmware installed.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

For more information about Cylon, check out our repo at https://github.com/hybridgroup/cylon

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-digispark.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-digispark) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-digispark/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-digispark) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-digispark/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-digispark)

## How to Install

Installing the cylon-digispark requires the `libusb` package already be installed.

### OSX

To install libusb on OSX using Homebrew:

    $ brew install libusb

### Ubuntu

To install libusb on linux:

    $ sudo apt-get install libusb-dev

Now you can install the module with:

    $ npm install cylon-digispark`

If you're experiencing the `AttributeError: 'module' object has no attribute 'script_main'` build issue, then please refer to this [comment](https://github.com/TooTallNate/node-gyp/issues/363#issuecomment-33212812)

## How to Use

This small program lets you toggle an LED on and off.

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    digispark: { adaptor: 'digispark' }
  },

  devices: {
    led: { driver: 'led', pin: 2 }
  },

  work: function(my) {
    every((1).seconds(), function() { my.led.toggle() });
  }
}).start();
```

## How to Connect

### Upload the Littlewire Firmware to the Digispark

Connecting to the [Digispark](http://www.kickstarter.com/projects/digistump/digispark-the-tiny-arduino-enabled-usb-dev-board)
ATTiny-based USB development board is very easy using Cylon, first we need to install the [littlewire](http://littlewire.cc/)
protocol to communicate with the digispark, Cylon includes CLI commands to make the process of uploading littlewire to the
digispark as simple as possible, after littlewire has been uploaded you can connect and communicate using Cylon.

### OSX

IMPORTANT: 2012 MBP The USB ports on the 2012 MBPs (Retina and non) cause issues due to their USB3 controllers, currently the best work around is to use a cheap USB hub (non USB3) - we are working on future solutions. The hub on a Cinema display will work as well.

DO NOT plug in the Digispark to your computer's USB port until prompted.

Install the cylon-digispark module:

    $ npm install cylon-digispark


After installing the cylon-digispark npm module run the following command to upload littlewire to the digispark, plug it to a USB port when prompted:

    $ gort digispark upload

Once plugged in, use the `cylon scan usb` command to verify your connection info:

    $ gort scan usb

Now use the `ID` info returned to find the `product` and `vendor` ID's required to establish a connection with the Digispark in your Cylon code.

That is it, you are set to start running Cylon digispark examples.

### Ubuntu

DO NOT plug in the Digispark to your computer's USB port until prompted.

Install the cylon-digispark npm module:

    $ npm install cylon-digispark

After installing the cylon-digispark module run the following command to upload littlewire to the digispark, plug it to a USB port when prompted. You might be asked to enter your sudo password, since uploading littlewire to the digispark requires some new udev rules, you can check and review them in /etc/udev/rules.d/49-micronucleus.rules after running the `gort digispark set-udev-rules` command:

    $ gort digispark upload

Once plugged in, use the `cylon scan usb` command to verify your connection info:

    $ gort scan usb

Now use the `ID` info returned to find the `product` and `vendor` ID's required to establish a connection with the Digispark in your cylon code.

That is it, you are set to start running Cylon digispark examples.

Thanks to [@bluebie](https://github.com/Bluebie) for the help with udev rules used when uploading littlewire to the digispark! (https://github.com/Bluebie/micronucleus-t85/wiki/Ubuntu-Linux)

### Windows

We are currently working on docs and instructions for Windows. Please check back soon!

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.11.0 - Compatibility with Cylon 0.22.0

Version 0.10.0 - Compatibility with Cylon 0.21.0

Version 0.9.0 - Compatibility with Cylon 0.20.0

Version 0.8.0 - Compatibility with Cylon 0.19.0

Version 0.7.0 - Compatibility with Cylon 0.18.0

Version 0.6.0 - Compatibility with Cylon 0.16.0

Version 0.5.1 - Add peerDependencies to package.json

Version 0.5.0 - Compatibility with Cylon 0.15.0

Version 0.4.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.3.0 - Update to cylon 0.12.0

Version 0.2.0 - Update to cylon 0.11.0, migrated to pure JS

Version 0.1.0 - Initial release

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
