const Fact = require('../src/fact');
const zipmap = require('zipmap');
const _ = require('lodash');

const Rule = function Rule(string) {
    this.name = string.replace(/\(.*$/, '');
    this.variables = string.replace(/^.*\(/, '').replace(/\).*/, '').split(', ').sort();
    this.unreplacedFacts = string.replace(/^.*:- /, '').replace(/\), /g, ');').split(';').map(x => {
        return new Fact(x)
    });
};

Rule.prototype.nameMatches = function (query) {
    return this.name === query.name;
};

Rule.prototype.getReplacedFacts = function (query) {
    let mappedVars = zipmap(this.variables, query.statements);
    this.unreplacedFacts.forEach((unreplacedFact, i) => {
        unreplacedFact.statements.forEach((statement, j) => {
            for (let key in mappedVars) {
                if (mappedVars.hasOwnProperty(key)) {
                    if (statement === key) {
                        this.unreplacedFacts[i].statements[j] = mappedVars[key];
                    }
                }
            }
        });
    });
    return this.unreplacedFacts;
};

module.exports = Rule;