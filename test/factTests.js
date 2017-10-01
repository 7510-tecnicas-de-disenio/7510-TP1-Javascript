const assert = require('assert');

const Fact = require('../src/fact');

describe("Fact", function () {
    let fact = null;

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
        fact = null;
    });

    describe("Create from string", function () {
        it("should create a fact with one argument", function () {
            fact = new Fact("varon(juan)");
            assert(fact.statements[0] === "juan");
        });

        it("should create a fact with two args", function () {
            fact = new Fact("padre(juan, pepe)");
            assert(fact.statements[0] === "juan");
            assert(fact.statements[1] === "pepe");
        });

        it("should create a fact with three args", function () {
            fact = new Fact("padre(juan, pepe, mario)");
            assert(fact.statements[0] === "juan");
            assert(fact.statements[1] === "pepe");
            assert(fact.statements[2] === "mario");
        });

        it("should create a fact with name", function () {
            fact = new Fact("varon(juan)");
            assert(fact.name === "varon");
        });
    });
});