const Fact = function Fact(string) {
    this.name = string.replace(/\(.*$/, '');
    this.statements = string.replace(/^.*\(/, '').replace(/\)$/, '').split(', ');
};

module.exports = Fact;