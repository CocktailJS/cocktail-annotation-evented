'use strict';

var cocktail  = require('cocktail'),
    Emitter   = require('events').EventEmitter,
    Eventable = require('cocktail-trait-eventable');

cocktail.mix({
    '@annotation': 'evented',
    '@exports'   : module,
    '@as': 'class',

    '@properties': {
        parameter: undefined
    },

    priority: cocktail.SEQUENCE.PRE_EXPORTS,

    process: function(subject){
        var emitter = this.getParameter();

        if(emitter && emitter === true) {
            emitter = new Emitter();
        }

        cocktail.mix(subject, {
            '@traits': [Eventable],

            '@properties' : {
                emitter: emitter
            }
        });
    }

});