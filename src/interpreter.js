const DBLoader = require('../src/dbLoader');
const Fact = require('../src/fact');
const Rule = require('../src/rule');
const _ = require('lodash');

const Interpreter = function () {
    this.facts = null;
    this.rules = null;

    this.parseDB = function (params, paramss, paramsss) {
        let loader = new DBLoader();
        loader.loadFromArray(params);
        this.facts = loader.facts;
        this.rules = loader.rules;
    };

    this.checkQuery = function (params) {
        if (params.slice(-1) !== ")") return false;
        let queryFact = new Fact(params);
        if (this.facts.some(x => {
                return _.isEqual(x, queryFact);
            })) {
            return true;
        } else if (this.rules.some(x => {
                x.evaluate(queryFact);
            })) {
        } else {
            return false;
        }
    };

};

module.exports = Interpreter;
