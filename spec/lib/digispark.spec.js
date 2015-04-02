/* jshint expr:true */
"use strict";

var Digispark = source("digispark");

var digispark = source("../build/Release/digispark.node");

describe("Digispark", function() {
  var spark = new Digispark({
    connection: { emit: spy() }
  });

  describe("constructor", function() {
    it("sets @digispark to null", function() {
      expect(spark.digispark).to.be.eql(null);
    });
  });

  describe("#commands", function() {
    var commands = spark.commands;

    it("returns an array of string commands", function() {
      expect(commands).to.be.an("array");

      commands.forEach(function(command) {
        expect(command).to.be.a("string");
      });
    });
  });

  describe("#connect", function() {
    var mockSpark = {},
        callback;

    beforeEach(function() {
      callback = spy();
      stub(digispark, "Digispark").returns(mockSpark);
      stub(spark, "proxyMethods");
      spark.connect(callback);
    });

    afterEach(function() {
      digispark.Digispark.restore();
      spark.proxyMethods.restore();
    });

    it("sets @digispark to a new digispark instance", function() {
      expect(spark.digispark).to.be.eql(mockSpark);
      expect(digispark.Digispark).to.be.calledWithNew;
    });

    it("proxies methods from the digispark to the adaptor", function() {
      var methods = spark.commands;

      expect(spark.proxyMethods).to.be.calledWith(
        methods,
        spark.digispark,
        spark
      );
    });
  });

  describe("#digitalWrite", function() {
    var digispark;

    beforeEach(function() {
      digispark = { pinMode: spy(), digitalWrite: spy() };
      spark.digispark = digispark;
      spark.digitalWrite("A", 1);
    });

    it("sets the pin mode to 0", function() {
      expect(digispark.pinMode).to.be.calledWith("A", 0);
    });

    it("writes the value to the pin", function() {
      expect(digispark.digitalWrite).to.be.calledWith("A", 1);
    });
  });

  describe("#digitalRead", function() {
    var digispark, callback, clock;

    afterEach(function() {
      clock.restore();
      spark.respond.restore();
    });

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      digispark = { pinMode: spy(), digitalRead: stub() };
      digispark.digitalRead.yields(null, 1);
      spy(spark, "respond");
      callback = spy();

      spark.digispark = digispark;
      spark.digitalRead("A", callback);
      clock.tick(50);
    });

    it("sets the pin mode to 1", function() {
      expect(digispark.pinMode).to.be.calledWith("A", 1);
    });

    it("reads the value from the pin", function() {
      expect(digispark.digitalRead).to.be.calledWith("A");
    });

    it("calls #respond method", function() {
      expect(spark.respond)
        .to.be
        .calledWith("digitalRead", callback, null, 1, "A");
    });

    it("triggers the callback", function() {
      expect(callback).to.be.calledWith(null, 1);
    });
  });

  describe("#servoWrite", function() {
    var digispark, callback;

    beforeEach(function() {
      digispark = { servoWrite: spy() };
      callback = spy();
      spark.digispark = digispark;
      spark.servoWrite("A", 1);
    });

    it("writes the value to the pin", function() {
      expect(digispark.servoWrite).to.be.calledWith(180);
    });
  });

  describe("#pwmWrite", function() {
    var mockSpark;

    beforeEach(function() {
      mockSpark = { pwmWrite: spy() };
      stub(digispark, "Digispark").returns(mockSpark);

      spark.connect(spy());
      spark.pwmWrite("A", 1);
    });

    it("writes the value to the pin", function() {
      expect(mockSpark.pwmWrite).to.be.calledWith("A", 255);
    });
  });
});
