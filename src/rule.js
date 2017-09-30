const Fact = require('../src/fact');

const Rule = function Rule(string) {
    this.name = string.replace(/\(.*$/, '');
    this.variables = string.replace(/^.*\(/, '').replace(/\).*/, '').split(', ');
    this.unreplacedFacts = string.replace(/^.*:- /, '').replace(/\), /g, ');').split(';').map((x) => {
        return new Fact(x)
    });
};

Rule.prototype.evaluate = function () {

};

module.exports = Rule;