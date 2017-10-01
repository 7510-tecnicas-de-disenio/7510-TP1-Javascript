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
        let query = new Fact(params);
        if (this.anyFactMatches(query)) {
            return true;
        } else {
            let matchingNameRule = this.rules.filter(rule => rule.nameMatches(query))[0];
            if (!matchingNameRule) {return false;}
            let replacedFacts = matchingNameRule.getReplacedFacts(query);
            return replacedFacts.every(this.anyFactMatches, this);
        }
    };

    this.anyFactMatches = function (query) {
        return this.facts.some(x => {
            return _.isEqual(x, query);
        })
    };

};

module.exports = Interpreter;
