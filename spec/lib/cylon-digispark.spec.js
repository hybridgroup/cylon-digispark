"use strict";

var mod = source("cylon-digispark"),
    Digispark = source("digispark");

describe("cylon-digispark", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(mod.adaptors).to.be.eql(["digispark"]);
    });
  });

  describe("#dependencies", function() {
    it("is an array of supplied dependencies", function() {
      expect(mod.dependencies).to.be.eql(["cylon-gpio"]);
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Digispark adaptor", function() {
      expect(mod.adaptor({})).to.be.an.instanceOf(Digispark);
    });
  });
});
