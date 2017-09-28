var assert = require('assert');

var DBLoader = require('../src/dbLoader');

describe("DBLoader", function () {

    var dBLoader = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        dBLoader = new DBLoader();
        dBLoader.load("./resources/db_test.txt");
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe("Load DB from file", function () {
        it("first element should be a fact", function () {
            assert(dBLoader.facts[0] === "varon(juan)");
        });

        it("last element should be a rule", function () {
            assert(dBLoader.rules.pop() === "hija(X, Y) :- mujer(X), padre(Y, X)");
        });
    });

});