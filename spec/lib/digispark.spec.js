/* jshint expr:true */
"use strict";

var Digispark = lib("digispark");

var digispark = lib("../build/Release/digispark.node");

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
    var mockSpark = {
          digisparkSearch: stub()
        },
        callback;

    beforeEach(function() {
      callback = spy();
      stub(digispark, "Digispark").returns(mockSpark);
      stub(spark, "proxyMethods");
      mockSpark.digisparkSearch.returns(1);
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
    var mock;

    beforeEach(function() {
      mock = { pinMode: spy(), digitalWrite: spy() };
      spark.digispark = mock;
      spark.digitalWrite("A", 1);
    });

    it("sets the pin mode to 0", function() {
      expect(mock.pinMode).to.be.calledWith("A", 0);
    });

    it("writes the value to the pin", function() {
      expect(mock.digitalWrite).to.be.calledWith("A", 1);
    });
  });

  describe("#digitalRead", function() {
    var mock, callback, clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });

    beforeEach(function() {
      mock = { pinMode: spy(), digitalRead: spy() };
      callback = spy();
      spark.digispark = mock;
      spark.digitalRead("A", callback);
    });

    it("sets the pin mode to 1", function() {
      expect(mock.pinMode).to.be.calledWith("A", 1);
    });

    it("reads the value from the pin", function() {
      clock.tick(2050);
      expect(mock.digitalRead).to.be.calledWith("A", callback);
    });
  });

  describe("#servoWrite", function() {
    var mock;

    beforeEach(function() {
      mock = { servoWrite: spy() };
      spark.digispark = mock;
      spark.servoWrite("A", 1);
    });

    it("writes the value to the pin", function() {
      expect(mock.servoWrite).to.be.calledWith(180);
    });
  });

  describe("#pwmWrite", function() {
    var mockSpark;

    beforeEach(function() {
      mockSpark = {
        pwmWrite: spy(),
        digisparkSearch: stub()
      };

      stub(digispark, "Digispark").returns(mockSpark);
      mockSpark.digisparkSearch.returns(1);

      spark.connect(spy());
      spark.pwmWrite("A", 1);
    });

    it("writes the value to the pin", function() {
      expect(mockSpark.pwmWrite).to.be.calledWith("A", 255);
    });
  });
});
