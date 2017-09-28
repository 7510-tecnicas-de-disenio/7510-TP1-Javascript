var fs = require('fs');

var DBLoader = function DBLoader() {
    this.facts = [];
    this.rules = [];
    var self = this;
    this.load = function (filePath) {
        var rawDB = fs.readFileSync(filePath, "utf-8");
        rawDB = rawDB.split("\n")
        rawDB.forEach(function (element) {
            if (element !== "") {
                if (element.includes(":-")) {
                    self.rules.push(element.replace(/.$/, ''));
                } else {
                    self.facts.push(element.replace(/.$/, ''));
                }
            }
        });
    }
};

module.exports = DBLoader;