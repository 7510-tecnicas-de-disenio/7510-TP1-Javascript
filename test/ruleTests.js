const expect = require("chai").expect;

const Rule = require('../src/rule');
const Fact = require('../src/fact');

describe("Rule", function () {
    let rule = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
    });

    afterEach(function () {
        // runs after each test in this block
        rule = null;
    });

    describe("Create from string", function () {
        it("should create a rule with one argument", function () {
            rule = new Rule("hijo(X) :- varon(X), padre(X)");
            expect(rule.name).to.eql("hijo");
            expect(rule.variables[0]).to.eql("X");
            expect(rule.variables).to.have.lengthOf(1);
        });

        it("should create a rule with two arguments", function () {
            rule = new Rule("hija(X, Y) :- mujer(X), padre(X, Y)");
            expect(rule.name).to.eql("hija");
            expect(rule.variables[0]).to.eql("X");
            expect(rule.variables[1]).to.eql("Y");
            expect(rule.variables).to.have.lengthOf(2);
        });

        it("should create a rule with two facts", function () {
            rule = new Rule("hija(X, Y) :- mujer(X), padre(X, Y)");
            expect(rule.unreplacedFacts).to.have.lengthOf(2);
            expect(rule.unreplacedFacts[0]).to.eql(new Fact("mujer(X)"));
            expect(rule.unreplacedFacts[1]).to.eql(new Fact("padre(X, Y)"));
        });
    });

    // describe("Replace variables with args", function () {
    //     it("should replace first arg with first arg", function () {
    //         rule = new Rule("hijo(X) :- varon(X), padre(X)");
    //
    //     });
    // });
});