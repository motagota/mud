const { expect } = require('chai');
const path = require('path');

const {Entity} = require('../src1/Entity');

describe("Entity", () => {

  it("should instantiate default data", () => {
    const entity = new Entity();
    expect(entity.name).to.equal("UNDEFINED");
    expect(entity.id).to.equal(-1);
  });

  it("should perform full-match search on name correctly", () => {
    const entity = new Entity();
    entity.name = "Test Entity";
    expect(entity.FullMatch("test")).to.be.false;
    expect(entity.FullMatch("Test Entity")).to.be.true;
  });

  it("should perform partial-match search on name correctly", () => {
    const entity = new Entity();
    entity.name = "Test Entity";
    expect(entity.Match("non match")).to.be.false;
    expect(entity.Match("test")).to.be.true;
    expect(entity.Match("st")).to.be.false;
    expect(entity.Match("EnTiTy")).to.be.true;
    expect(entity.Match("TITY")).to.be.false;
    expect(entity.Match("Test Entity")).to.be.true;
  });

});