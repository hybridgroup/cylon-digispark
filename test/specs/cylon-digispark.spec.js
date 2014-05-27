'use strict';

var module = source('cylon-digispark'),
    Digispark = source('digispark');

var GPIO = require('cylon-gpio');

describe("cylon-digispark", function() {
  describe("#register", function() {
    var robot;

    beforeEach(function() {
      robot = { registerAdaptor: spy() };
      stub(GPIO, 'register');
      module.register(robot);
    });

    afterEach(function() {
      GPIO.register.restore();
    });

    it("registers the 'digispark' adaptor with the robot", function() {
      expect(robot.registerAdaptor).to.be.calledWith(
        'cylon-digispark',
        'digispark'
      );
    });

    it("registers GPIO with the robot", function() {
      expect(GPIO.register).to.be.calledWith(robot);
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Digispark adaptor", function() {
      expect(module.adaptor({})).to.be.an.instanceOf(Digispark);
    });
  });
});
