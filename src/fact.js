var Fact = function Fact(string) {
    this.name = string.replace(/\(.*$/, '');
    this.statements = string.replace(/^.*\(/, '').replace(/\)$/, '').replace(/, /g, ',').split(',');
};

module.exports = Fact;