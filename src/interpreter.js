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
        let fact = new Fact(params);
        if (this.facts.some(x => {
                return _.isEqual(x, fact);
            })) {
            return true;
        } else {
            let rule = new Rule(params);
        }
    };

};

module.exports = Interpreter;
