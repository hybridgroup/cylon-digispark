'use strict';

var module = source('cylon-digispark'),
    Digispark = source('digispark');

describe("cylon-digispark", function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql(['digispark']);
    });
  });

  describe("#dependencies", function() {
    it('is an array of supplied dependencies', function() {
      expect(module.dependencies).to.be.eql(['cylon-gpio']);
    });
  });

  describe("#adaptor", function() {
    it("returns a new instance of the Digispark adaptor", function() {
      expect(module.adaptor({ extraParams: {} })).to.be.an.instanceOf(Digispark);
    });
  });
});
