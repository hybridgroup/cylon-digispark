# Cylon.js For Digispark

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Cylon adaptor for the [Digispark](http://www.kickstarter.com/projects/digistump/digispark-the-tiny-arduino-enabled-usb-dev-board) ATTiny-based USB development board with the [Little Wire](http://littlewire.cc/) protocol firmware installed.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

For more information about Cylon, check out our repo at https://github.com/hybridgroup/cylon

## Getting Started

Installing the cylon-digispark requires the `libusb` package already be installed.

### OSX

To install libusb on OSX using Homebrew:

```
$ brew install libusb
```

### Ubuntu

To install libusb on linux:

```
$ sudo apt-get install libusb-dev
```

Now you can install the module with: `npm install cylon-digispark`

If you're experiencing the `AttributeError: 'module' object has no attribute 'script_main'` build issue, then please refer to this [comment](https://github.com/TooTallNate/node-gyp/issues/363#issuecomment-33212812)

## Examples

### JavaScript

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'digispark', adaptor: 'digispark' },
  device: { name: 'led', driver: 'led', pin: 2 },

  work: function(my) {
    every((1).seconds(), function() { my.led.toggle() });
  }
}).start();
```

### CoffeeScript

```coffeescript
Cylon = require 'cylon'

Cylon.robot
  connection: { name: 'digispark', adaptor: 'digispark'}
  device: { name: 'led', driver: 'led', pin: 2 }

  work: (my) ->
    every 1.second(), -> my.led.toggle()

.start()
```
## Connecting to Digispark

If your Digispark (http://www.kickstarter.com/projects/digistump/digispark-the-tiny-arduino-enabled-usb-dev-board) ATTiny-based USB development board already has the Little Wire (http://littlewire.cc/) protocol firmware installed, you can connect right away with Cylon.js. 

Otherwise, for instructions on how to install Little Wire on a Digispark check out http://digistump.com/board/index.php/topic,160.0.html

### OSX

IMPORTANT: 2012 MBP The USB ports on the 2012 MBPs (Retina and non) cause issues due to their USB3 controllers, currently the best work around is to use a cheap USB hub (non USB3) - we are working on future solutions. The hub on a Cinema display will work as well.

The main steps are:
- Plug in the Digispark to the USB port
- Connect to the device via Cylon.js

First plug the Digispark into your computer via the USB port. Then... (directions go here)

### Ubuntu

The main steps are:
- Add a udev rule to allow access to the Digispark device
- Plug in the Digispark to the USB port
- Connect to the device via Cylon.js

First, you must add a udev rule, so that Cylon.js can communicate with the USB device. Ubuntu and other modern Linux distibutions use udev to manage device files when USB devices are added and removed. By default, udev will create a device with read-only permission which will not allow to you download code. You must place the udev rules below into a file named /etc/udev/rules.d/49-micronucleus.rules.

```
# UDEV Rules for Micronucleus boards including the Digispark.
# This file must be placed at:
#
# /etc/udev/rules.d/49-micronucleus.rules    (preferred location)
#   or
# /lib/udev/rules.d/49-micronucleus.rules    (req'd on some broken systems)
#
# After this file is copied, physically unplug and reconnect the board.
#
SUBSYSTEMS=="usb", ATTRS{idVendor}=="1781", ATTRS{idProduct}=="0c9f", MODE:="0666"
KERNEL=="ttyACM*", ATTRS{idVendor}=="1781", ATTRS{idProduct}=="0c9f", MODE:="0666", ENV{ID_MM_DEVICE_IGNORE}="1"

SUBSYSTEMS=="usb", ATTRS{idVendor}=="16d0", ATTRS{idProduct}=="0753", MODE:="0666"
KERNEL=="ttyACM*", ATTRS{idVendor}=="16d0", ATTRS{idProduct}=="0753", MODE:="0666", ENV{ID_MM_DEVICE_IGNORE}="1"
#
# If you share your linux system with other users, or just don't like the
# idea of write permission for everybody, you can replace MODE:="0666" with
# OWNER:="yourusername" to create the device owned by you, or with
# GROUP:="somegroupname" and mange access using standard unix groups.
```

Thanks to [@bluebie](https://github.com/Bluebie) for these instructions! (https://github.com/Bluebie/micronucleus-t85/wiki/Ubuntu-Linux)

Now plug the Digispark into your computer via the USB port.

Once plugged in, use the `cylon connect scan` command with the  `-t usb` option to verify your connection info:

```
$ cylon connecct scan -t usb
```

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

None yet...

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
