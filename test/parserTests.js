var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');


describe("Parser", function () {

    var parser = null;

    beforeEach(function () {
        parser = new Parser();
        
    });
    
    describe('Rule or fact? with valid clauses', function () {

        it('isFact(varon(juan).) should be true', function () {
            expect(parser.isFact('varon(juan).')).to.be.true;
        });
        
        it('isRule(varon(juan).) should be false', function () {
            expect(parser.isRule('varon(juan).')).to.be.false;
        });

        it('isRule(primo(jorge,maria).) should be false', function () {
            expect(parser.isRule('primo(jorge,maria).')).to.be.false;
        });
        
        it('isFact(primo(jorge,maria).) should be true', function () {
            expect(parser.isFact('primo(jorge,maria).')).to.be.true;
        });

        it('isRule(hijo(X,Y):-varon(X),padre(Y,X).) should be true', function () {
            expect(parser.isRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.be.true;
        });
        
        it('isFact(hijo(X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isFact('hijo(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });

        it('isRule(subtract(X,Y,Z):-add(Y,Z,X).) should be true', function () {
            expect(parser.isRule('subtract(X,Y,Z):-add(Y,Z,X).')).to.be.true;
        });
        
        it('isFact(subtract(X,Y,Z):-add(Y,Z,X).) should be false', function () {
            expect(parser.isFact('subtract(X,Y,Z):-add(Y,Z,X).')).to.be.false;
        });

    });
    
    describe('Fact validation', function () {

        it('varon(juan). should be true', function () {
            expect(parser.isFact('varon(juan).')).to.be.true;
        });

        it('varon(juan) should be false', function () {
            expect(parser.isFact('varon(juan)')).to.be.false;
        });
        
        it('varon(). should be false', function () {
            expect(parser.isFact('varon().')).to.be.false;
        });
        
        it('(juan). should be false', function () {
            expect(parser.isFact('(juan).')).to.be.false;
        });
        
        it('hijo_de(pepe,juan). should be true', function () {
            expect(parser.isFact('hijo_de(pepe,juan).')).to.be.true;
        });
        
        it('varon(juan,). should be false', function () {
            expect(parser.isFact('varon(juan,).')).to.be.false;
        });
        
        it('varon(,juan). should be false', function () {
            expect(parser.isFact('varon(,juan).')).to.be.false;
        });
        
        it('trillizas(maria,marta,ana). should be true', function () {
            expect(parser.isFact('trillizas(maria,marta,ana).')).to.be.true;
        });
        
        it('Trillizas(maria,marta,ana). should be false', function () {
            expect(parser.isFact('Trillizas(maria,marta,ana).')).to.be.false;
        });
        
        it('trillizas. should be false', function () {
            expect(parser.isFact('trillizas.')).to.be.false;
        });
        
        it('suma(1,2). should be true', function () {
            expect(parser.isFact('suma(1,2).')).to.be.true;
        });
        
        it('suma3(1,2). should be false', function () {
            expect(parser.isFact('suma3(1,2).')).to.be.false;
        });
        
        it('varon(X). should be false', function () {
            expect(parser.isFact('varon(X).')).to.be.false;
        });
        
        it('primo(X,pepe). should be false', function () {
            expect(parser.isFact('varon(X,pepe).')).to.be.false;
        });

    });
    
    describe('Rule validation', function () {
    
        it('isRule(hijo(X,Y):-varon(X),padre(Y,X).) should be true', function () {
            expect(parser.isRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.be.true;
        });
        
        it('isRule(hijo(X,Y):-varon(X),padre(Y,X)) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-varon(X),padre(Y,X)')).to.be.false;
        });
        
        it('isRule(hijo(,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(X,):-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(X,):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo:-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo:-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule((X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(_(X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('_(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(X,Y):varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(Hijo(X,Y):-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('Hijo(X,Y):-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo_de(X,Y):-varon(X),padre(Y,X).) should be true', function () {
            expect(parser.isRule('hijo_de(X,Y):-varon(X),padre(Y,X).')).to.be.true;
        });
        
        it('isRule(hijo():-varon(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo():-varon(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):-,padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-,padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):-varon(X),.) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-varon(X),.')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):-varon(),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-varon(),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):-varon(X),padre) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-varon(X),padre.')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):-varon(X),(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-varon(X),(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(X,Y):-VARON(X),padre(Y,X).) should be false', function () {
            expect(parser.isRule('hijo(X,Y):-VARON(X),padre(Y,X).')).to.be.false;
        });
        
        it('isRule(hijo(kevin,Y):-varon(kevin),padre(Y,kevin).) should be false', function () {
            expect(parser.isRule('hijo(kevin,Y):-varon(kevin),padre(Y,kevin).')).to.be.false;
        });
        
        it('isRule(hijo_de_kevin(X):-varon(X),padre(kevin,X).) should be true', function () {
            expect(parser.isRule('hijo_de_kevin(X):-varon(X),padre(kevin,X).')).to.be.true;
        });
  
    });
    
    describe('Query validation', function () {

        it('varon(juan) should be true', function () {
            expect(parser.validQuery('varon(juan)')).to.be.true;
        });

        it('varon(juan). should be false', function () {
            expect(parser.validQuery('varon(juan).')).to.be.false;
        });
        
        it('varon() should be false', function () {
            expect(parser.validQuery('varon()')).to.be.false;
        });
        
        it('(juan) should be false', function () {
            expect(parser.validQuery('(juan)')).to.be.false;
        });
        
        it('hijo_de(pepe,juan) should be true', function () {
            expect(parser.validQuery('hijo_de(pepe,juan)')).to.be.true;
        });
        
        it('varon(juan,) should be false', function () {
            expect(parser.validQuery('varon(juan,)')).to.be.false;
        });
        
        it('varon(,juan) should be false', function () {
            expect(parser.validQuery('varon(,juan)')).to.be.false;
        });
        
        it('trillizas(maria,marta,ana) should be true', function () {
            expect(parser.validQuery('trillizas(maria,marta,ana)')).to.be.true;
        });
        
        it('Trillizas(maria,marta,ana) should be false', function () {
            expect(parser.validQuery('Trillizas(maria,marta,ana)')).to.be.false;
        });
        
        it('trillizas should be false', function () {
            expect(parser.validQuery('trillizas')).to.be.false;
        });
        
        it('suma(1,2) should be true', function () {
            expect(parser.validQuery('suma(1,2)')).to.be.true;
        });
        
        it('suma3(1,2) should be false', function () {
            expect(parser.validQuery('suma3(1,2)')).to.be.false;
        });
        
        it('varon(X) should be false', function () {
            expect(parser.validQuery('varon(X)')).to.be.false;
        });
        
        it('primo(X,pepe) should be false', function () {
            expect(parser.validQuery('varon(X,pepe)')).to.be.false;
        });

    });
    
    describe('Obtain clause predicate', function () {

        it('obtainClausePredicate(varon(juan).) should equal varon', function () {
            expect(parser.obtainClausePredicate('varon(juan).')).to.equal('varon');
        });
        
        it('obtainClausePredicate(padre_de(juan,pepe).) should equal padre_de', function () {
            expect(parser.obtainClausePredicate('padre_de(juan, pepe).')).to.equal('padre_de');
        });
        
        it('obtainClausePredicate(hijo(X,Y):-varon(X),padre(Y,X).) should equal hijo', function () {
            expect(parser.obtainClausePredicate('hijo(X,Y):-varon(X),padre(Y,X).')).to.equal('hijo');
        });
        
        it('obtainClausePredicate(subtract(X,Y,Z):-add(Y,Z,X).) should equal subtract', function () {
            expect(parser.obtainClausePredicate('subtract(X,Y,Z):-add(Y,Z,X).')).to.equal('subtract');
        });

    });
    
    describe('Obtain clause parameters', function () {

        it('obtainFactParameters(varon(juan).) should equal [juan]', function () {
            expect(parser.obtainFactParameters('varon(juan).')).to.deep.equal(['juan']);
        });
        
        it('obtainClauseParameters(padre(juan,pepe).) should equal [juan, pepe]', function () {
            expect(parser.obtainFactParameters('padre(juan,pepe).')).to.deep.equal(['juan', 'pepe']);
        });
        
        it('obtainQueryParameters(mujer(juana)) should equal [juana]', function () {
            expect(parser.obtainQueryParameters('mujer(juana)')).to.deep.equal(['juana']);
        });
        
        it('obtainQueryParameters(trillizos(juan,bren,agus)) should equal [juan, bren, agus]', function () {
            expect(parser.obtainQueryParameters('trillizos(juan,bren,agus)')).to.deep.equal(['juan', 'bren', 'agus']);
        });
        
        it('obtainRuleVariables(hijo(X,Y):-varon(X),padre(Y,X).) should equal [X,Y]', function () {
            expect(parser.obtainRuleVariables('hijo(X,Y):-varon(X),padre(Y,X).')).to.deep.equal(['X', 'Y']);
        });
        
        it('obtainRuleVariables(subtract(X,Y,Z):-add(Y,Z,X).) should equal [X,Y,Z]', function () {
            expect(parser.obtainRuleVariables('subtract(X,Y,Z):-add(Y,Z,X).')).to.deep.equal(['X', 'Y', 'Z']);
        });

    });
    
    describe('Obtain rule objectives', function () {
    
        it('obtainRuleObjectives(hijo(X,Y):-varon(X),padre(Y,X).) should equal [varon(X), padre(Y,X)]', function () {
            expect(parser.obtainRuleObjectives('hijo(X,Y):-varon(X),padre(Y,X).')).to.deep.equal(['varon(X)', 'padre(Y,X)']);
        });
        
        it('obtainRuleVariables(subtract(X,Y,Z):-add(Y,Z,X).) should equal [add(Y,Z,X)]', function () {
            expect(parser.obtainRuleObjectives('subtract(X,Y,Z):-add(Y,Z,X).')).to.deep.equal(['add(Y,Z,X)']);
        });
        
        it('obtainRuleVariables(amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).) should equal [amigo(X,Y), amigo(X,Z), amigo(Y,X), amigo(Y,Z), amigo(Z,X), amigo(Z,Y)]', function () {
            expect(parser.obtainRuleObjectives('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).')).to.deep.equal(['amigo(X,Y)', 'amigo(X,Z)', 'amigo(Y,X)', 'amigo(Y,Z)', 'amigo(Z,X)', 'amigo(Z,Y)']);
        });

    });
    
    
    describe('Parse Fact', function () {

        it('parseFact(varon(juan).)', function () {
            expect(parser.parseFact('varon(juan).')).to.have.property('predicate');
            expect(parser.parseFact('varon(juan).')).to.have.property('parameters');
            expect(parser.parseFact('varon(juan).').predicate).to.equal('varon');
            expect(parser.parseFact('varon(juan).').parameters).to.deep.equal(['juan']);
        });
        
        it('parseFact(padre_de(juan,pepe).)', function () {
            expect(parser.parseFact('padre_de(juan,pepe).').predicate).to.equal('padre_de');
            expect(parser.parseFact('padre_de(juan,pepe).').parameters).to.deep.equal(['juan', 'pepe']);
        });
        
        it('parseFact(cuatrillizos(bren,agus,cande,marti).)', function () {
            expect(parser.parseFact('cuatrillizos(bren,agus,cande,marti).').predicate).to.equal('cuatrillizos');
            expect(parser.parseFact('cuatrillizos(bren,agus,cande,marti).').parameters).to.deep.equal(['bren', 'agus', 'cande', 'marti']);
        });

    });
    
    describe('Parse Query', function () {
 
        it('parseQuery(varon(juan))', function () {
            expect(parser.parseQuery('varon(lean)')).to.have.property('predicate');
            expect(parser.parseQuery('varon(lean)')).to.have.property('parameters');
            expect(parser.parseQuery('varon(lean)').predicate).to.equal('varon');
            expect(parser.parseQuery('varon(lean)').parameters).to.deep.equal(['lean']);
        });
        
        it('parseQuery(primo(juan,emi))', function () {
            expect(parser.parseQuery('primo(juan,emi)').predicate).to.equal('primo');
            expect(parser.parseQuery('primo(juan,emi)').parameters).to.deep.equal(['juan', 'emi']);
        });
        
        it('parseQuery(amigos(lean,emi,hect))', function () {
            expect(parser.parseQuery('amigos(lean,emi,hect)').predicate).to.equal('amigos');
            expect(parser.parseQuery('amigos(lean,emi,hect)').parameters).to.deep.equal(['lean', 'emi', 'hect']);
        });
        
        it('parseQuery(varon())', function () {
            expect(() => { parser.parseQuery('varon()') }).to.throw('Invalid query: varon()');
        });
        
        it('parseQuery(varon(juan,))', function () {
            expect(() => { parser.parseQuery('varon(juan,)') }).to.throw('Invalid query: varon(juan,)');
        });
        
        it('parseQuery(varon(, pepe))', function () {
            expect(() => { parser.parseQuery('varon(, pepe)') }).to.throw('Invalid query: varon(, pepe)');
        });
        
        it('parseQuery((nico))', function () {
            expect(() => { parser.parseQuery('(nico)') }).to.throw('Invalid query: (nico)');
        });
        
        it('parseQuery(varon(X))', function () {
            expect(() => { parser.parseQuery('varon(X)') }).to.throw('Invalid query: varon(X)');
        });
        
        it('parseQuery(varon))', function () {
            expect(() => { parser.parseQuery('varon)') }).to.throw('Invalid query: varon)');
        });
        
        it('parseQuery(varon)', function () {
            expect(() => { parser.parseQuery('varon') }).to.throw('Invalid query: varon');
        });
        
        it('parseQuery(Varon(lucas))', function () {
            expect(() => { parser.parseQuery('Varon(lucas)') }).to.throw('Invalid query: Varon(lucas)');
        });
        
        it('parseQuery(_(lucas))', function () {
            expect(() => { parser.parseQuery('_(lucas)') }).to.throw('Invalid query: _(lucas)');
        });
        
        it('parseQuery(varon(,))', function () {
            expect(() => { parser.parseQuery('varon(,)') }).to.throw('Invalid query: varon(,)');
        });
        
    });
    
    describe('Parse Rule', function () {

        it('parseRule(hijo(X,Y):-varon(X),padre(Y,X).)', function () {
            expect(parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.have.property('predicate');
            expect(parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.have.property('variables');
            expect(parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).')).to.have.property('objectives');
            expect(parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).').predicate).to.equal('hijo');
            expect(parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).').variables).to.deep.equal(['X', 'Y']);
            expect(parser.parseRule('hijo(X,Y):-varon(X),padre(Y,X).').objectives).to.deep.equal(['varon(X)', 'padre(Y,X)']);
        });
        
        it('parseRule(subtract(X,Y,Z):-add(Y,Z,X).)', function () {
            expect(parser.parseRule('subtract(X,Y,Z):-add(Y,Z,X).').predicate).to.equal('subtract');
            expect(parser.parseRule('subtract(X,Y,Z):-add(Y,Z,X).').variables).to.deep.equal(['X', 'Y', 'Z']);
            expect(parser.parseRule('subtract(X,Y,Z):-add(Y,Z,X).').objectives).to.deep.equal(['add(Y,Z,X)']);
        });
        
        it('parseRule(amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).)', function () {
            expect(parser.parseRule('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).').predicate).to.equal('amigos');
            expect(parser.parseRule('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).').variables).to.deep.equal(['X', 'Y', 'Z']);
            expect(parser.parseRule('amigos(X,Y,Z):-amigo(X,Y),amigo(X,Z),amigo(Y,X),amigo(Y,Z),amigo(Z,X),amigo(Z,Y).').objectives).to.deep.equal(['amigo(X,Y)', 'amigo(X,Z)', 'amigo(Y,X)', 'amigo(Y,Z)', 'amigo(Z,X)', 'amigo(Z,Y)']);
        });
    });
    
    describe('Parse Clause (fact or rule)', function () {
    
        it('parseClause(varon(juan).)', function () {
            expect(parser.parseClause('varon(juan).')).to.have.property('predicate');
            expect(parser.parseClause('varon(juan).')).to.have.property('parameters');
            expect(parser.parseClause('varon(juan).').predicate).to.equal('varon');
            expect(parser.parseClause('varon(juan).').parameters).to.deep.equal(['juan']);
        });
        
        it('parseClause(padre_de(juan, pepe).)', function () {
            expect(parser.parseClause('padre_de(juan, pepe).').predicate).to.equal('padre_de');
            expect(parser.parseClause('padre_de(juan, pepe).').parameters).to.deep.equal(['juan', 'pepe']);
        });
        
        it('parseClause(hijo(X, Y) :- varon(X), padre(Y, X).)', function () {
            expect(parser.parseClause('hijo(X, Y) :- varon(X), padre(Y, X).')).to.have.property('predicate');
            expect(parser.parseClause('hijo(X, Y) :- varon(X), padre(Y, X).')).to.have.property('variables');
            expect(parser.parseClause('hijo(X, Y) :- varon(X), padre(Y, X).')).to.have.property('objectives');
            expect(parser.parseClause('hijo(X, Y) :- varon(X), padre(Y, X).').predicate).to.equal('hijo');
            expect(parser.parseClause('hijo(X, Y) :- varon(X), padre(Y, X).').variables).to.deep.equal(['X', 'Y']);
            expect(parser.parseClause('hijo(X, Y) :- varon(X), padre(Y, X).').objectives).to.deep.equal(['varon(X)', 'padre(Y,X)']);
        });
        
        it('parseClause(subtract(X,Y,Z) :- add(Y, Z, X).)', function () {
            expect(parser.parseClause('subtract(X,Y,Z) :- add(Y, Z, X).').predicate).to.equal('subtract');
            expect(parser.parseClause('subtract(X,Y,Z) :- add(Y, Z, X).').variables).to.deep.equal(['X', 'Y', 'Z']);
            expect(parser.parseClause('subtract(X,Y,Z) :- add(Y, Z, X).').objectives).to.deep.equal(['add(Y,Z,X)']);
        });
        
        it('parseClause((X,Y,Z).)', function () {
            expect(() => { parser.parseClause('(X,Y,Z).') }).to.throw('Invalid entry in database: (X,Y,Z).');
        });
        
        it('parseClause(amigos(X,Y,Z).)', function () {
            expect(() => { parser.parseClause('amigos(X,Y,Z).') }).to.throw('Invalid entry in database: amigos(X,Y,Z).');
        });
        
        it('parseClause(varon(juan))', function () {
            expect(() => { parser.parseClause('varon(juan)') }).to.throw('Invalid entry in database: varon(juan)');
        });
        
        it('parseClause(varon().)', function () {
            expect(() => { parser.parseClause('varon().') }).to.throw('Invalid entry in database: varon().');
        });
        
        it('parseClause(amigos.)', function () {
            expect(() => { parser.parseClause('amigos.') }).to.throw('Invalid entry in database: amigos.');
        });
        
        it('parseClause(amigos(juan,).)', function () {
            expect(() => { parser.parseClause('amigos(juan,).') }).to.throw('Invalid entry in database: amigos(juan,).');
        });
        
        it('parseClause(hijo(X, Y) :- varon(X),.)', function () {
            expect(() => { parser.parseClause('hijo(X, Y) :- varon(X),.') }).to.throw('Invalid entry in database: hijo(X, Y) :- varon(X),.');
        });
        
        it('subtract(X,Y,Z) :- (Y, Z, X).)', function () {
            expect(() => { parser.parseClause('subtract(X,Y,Z) :- (Y, Z, X).') }).to.throw('Invalid entry in database: subtract(X,Y,Z) :- (Y, Z, X).');
        });
        
        it('subtract(X,Y,Z) :- add(Y, Z.)', function () {
            expect(() => { parser.parseClause('subtract(X,Y,Z) :- add(Y, Z.') }).to.throw('Invalid entry in database: subtract(X,Y,Z) :- add(Y, Z.');
        });
        
    });

});


