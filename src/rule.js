const Rule = function Rule(string) {
    this.name = string.replace(/\(.*$/, '');
    this.variables = string.replace(/^.*\(/, '').replace(/\).*/, '').split(', ');
    this.unreplacedFacts = null
};

module.exports = Rule;