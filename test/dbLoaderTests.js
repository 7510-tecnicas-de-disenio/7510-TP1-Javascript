const assert = require('assert');
const expect = require("chai").expect;

const DBLoader = require('../src/dbLoader');

describe("DBLoader", function () {

    let dBLoader = null;

    const db =
        "varon(juan).\n" +
        "varon(pepe).\n" +
        "varon(hector).\n" +
        "varon(roberto).\n" +
        "varon(alejandro).\n" +
        "mujer(maria).\n" +
        "mujer(cecilia).\n" +
        "padre(juan, pepe).\n" +
        "padre(juan, pepa).\n" +
        "padre(hector, maria).\n" +
        "padre(roberto, alejandro).\n" +
        "padre(roberto, cecilia).\n" +
        "hijo(X, Y) :- varon(X), padre(Y, X).\n" +
        "hija(X, Y) :- mujer(X), padre(Y, X).";

    const dbArr = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        dBLoader = new DBLoader();
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe("Load from file", function () {
        it("first element should be a fact", function () {
            dBLoader.loadFromFile("./resources/db_test.txt");
            expect(dBLoader.facts[0].name).to.eql("varon");
            expect(dBLoader.facts[0].statements).to.eql(["juan"]);
        });

        it("last element should be a rule", function () {
            dBLoader.loadFromFile("./resources/db_test.txt");
            expect(dBLoader.rules[1].name).to.eql("hija");
            expect(dBLoader.rules[1].variables).to.have.lengthOf(2);
        });
    });

    describe("Load from string", function () {
        it("first element should be a fact", function () {
            dBLoader.loadFromString(db);
            expect(dBLoader.facts[0].name).to.eql("varon");
            expect(dBLoader.facts[0].statements).to.eql(["juan"]);
        });

        it("last element should be a rule", function () {
            dBLoader.loadFromString(db);
            expect(dBLoader.rules[1].name).to.eql("hija");
            expect(dBLoader.rules[1].variables).to.have.lengthOf(2);
        });
    });

    describe("Load from array", function () {
        it("first element should be a fact", function () {
            dBLoader.loadFromArray(dbArr);
            expect(dBLoader.facts[0].name).to.eql("varon");
            expect(dBLoader.facts[0].statements).to.eql(["juan"]);
        });

        it("last element should be a rule", function () {
            dBLoader.loadFromArray(dbArr);
            expect(dBLoader.rules[1].name).to.eql("hija");
            expect(dBLoader.rules[1].variables).to.have.lengthOf(2);
        });
    });

});