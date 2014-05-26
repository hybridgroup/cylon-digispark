'use strict';

var module = source('cylon-digispark');

describe("Cylon-Digispark", function() {
  it("has a register function", function() {
    expect(module.register).to.be.a('function');
  });

  it("has a #adaptor function", function() {
    expect(module.adaptor).to.be.a('function');
  });

  it("has a #driver function", function() {
    expect(module.driver).to.be.a('function');
  });
});
