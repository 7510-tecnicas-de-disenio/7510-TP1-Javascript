var Fact = function Fact(string) {
    this.statements = string.replace(/^.*\(/, '').replace(/\)$/, '').replace(/, /g, ',').split(',');
};

module.exports = Fact;