'use strict';

var chai = require("chai"),
    sinonChai = require("sinon-chai"),
    expect = chai.expect,
    EventEmitter = require('events').EventEmitter,
    Evented = require('../../lib/Evented');

chai.use(sinonChai);

describe('Evented Annotation', function(){


    describe('@evented: true adds an EventEmitter instance and apply the Eventable trait to the given class', function(){
        var sut = new Evented(),
            MyClass = function(){};

        sut.setParameter(true);
        sut.process(MyClass);

        it('should add emitter as property in Class', function(){
            expect(MyClass).to.respondTo('getEmitter');
            expect(MyClass.prototype.emitter).to.be.instanceOf(EventEmitter);
        });

        it('should add eventable trait methods', function(){

            expect(MyClass).to.respondTo('on');
            expect(MyClass).to.respondTo('emit');
            expect(MyClass).to.respondTo('addListener');
            expect(MyClass).to.respondTo('removeListener');

        });
    });

    describe('@evented: false does not add an EventEmitter instance and does not apply the Eventable trait to the given class', function(){
        var sut = new Evented(),
            MyClass = function(){};

        sut.setParameter(false);
        sut.process(MyClass);

        it('should not add emitter as property in Class', function(){
            expect(MyClass).to.not.respondTo('getEmitter');
            expect(MyClass.prototype.emitter).to.be.equal(undefined);
        });

        it('should not add eventable trait methods', function(){

            expect(MyClass).to.not.respondTo('on');
            expect(MyClass).to.not.respondTo('emit');
            expect(MyClass).to.not.respondTo('addListener');
            expect(MyClass).to.not.respondTo('removeListener');

        });
    });    

    describe('@evented: emitter adds the instance and apply the Eventable trait to the given class', function(){
        var sut = new Evented(),
            emitter = new EventEmitter(),
            MyClass = function(){};

        sut.setParameter(emitter);
        sut.process(MyClass);

        it('should add emitter as property in Class', function(){
            expect(MyClass).to.respondTo('getEmitter');
            expect(MyClass.prototype.emitter).to.be.instanceOf(EventEmitter);
            expect(MyClass.prototype.emitter).to.be.equal(emitter);
        });

        it('should add eventable trait methods', function(){

            expect(MyClass).to.respondTo('on');
            expect(MyClass).to.respondTo('emit');
            expect(MyClass).to.respondTo('addListener');
            expect(MyClass).to.respondTo('removeListener');

        });
    });
});