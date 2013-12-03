'use strict';

var cocktail  = require('cocktail'),
    Emitter   = require('events').EventEmitter,
    Eventable = require('cocktail-trait-eventable');

/**
 * @annotation evented
 */
cocktail.mix({
    '@annotation': 'evented',
    '@exports'   : module,
    '@as'        : 'class',

    '@properties': {
        parameter: undefined
    },

    priority: cocktail.SEQUENCE.PRE_EXPORTS,

    process: function(subject){
        var emitter = this.getParameter();

        if(emitter) {

            cocktail.mix(subject, {
                '@traits': [Eventable],
                
                _emitter: undefined,

                getEmitter: function(){
                    if(!this._emitter){
                        this._emitter = new Emitter();
                    }
                    return this._emitter;
                }
            });

        }

    }

});