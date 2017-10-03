var Parser = function () {

    var queryRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)$/;
    var factRegex = /^([a-z]+[a-z_]*)\(([a-z0-9]+)(,[a-z0-9]+)*\)\.$/;
    var ruleRegex = /^([a-z]+[a-z_]*)\(([A-Z]+)(,[A-Z]+)*\):-([a-z]+[a-z-]*)\((\w+)(,\w+)*\)(,([a-z]+[a-z-]*)\((\w+)(,\w+)*\))*\.$/;
    
    var clausePredicateRegex = /^[a-z]+[a-z_]*/;

    var queryParametersRegex = /^.*\((.*)\)$/;
    var factParametersRegex = /^.*\((.*)\)\.$/;
    var ruleVariablesRegex = /^.*\((.*)\)\:-.*$/;

    var ruleObjectivesRegex = /^.*\(.*\)\:-(.*)\.$/;
    
    var removeAllSpaces = function(clause) {
        return clause.replace(/\ /g, "");
    }

    this.isRule = function(clause) {
        return ruleRegex.test(clause);
    }
    
    this.isFact = function(clause) {
        return factRegex.test(clause);
    }
    
    this.validQuery = function(query) {
        return queryRegex.test(query);
    }

}

module.exports = Parser;
