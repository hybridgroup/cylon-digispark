# Cylon.js For Digispark

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and
physical computing using Node.js

This repository contains the Cylon adaptor for Digispark.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our
sister project Gobot (http://gobot.io).

For more information about Cylon, check out our repo at
https://github.com/hybridgroup/cylon

## Getting Started

cylon-digispark requires libusb. 

To install libusb on linux
~~~
$ sudo apt-get install libusb-dev
~~~

os x
~~~
$ brew install libusb
~~~


Then install the module with: `npm install cylon-digispark`

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
