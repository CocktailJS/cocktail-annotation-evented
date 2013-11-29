[![Build Status](https://travis-ci.org/CocktailJS/cocktail-annotation-evented.png?branch=master)](https://travis-ci.org/CocktailJS/cocktail-annotation-evented)


# cocktail-annotation-evented
## A [CocktailJS](http://cocktailjs.github.io) Annotation Extension

This extension defines a custom annotation to apply [Eventable Trait](https://npmjs.org/package/cocktail-trait-eventable) and creates the required glue code into the host class.

### Install

````bash
npm install cocktail --save
npm install cocktail-annotation-evented --save
````

### Requirements

CocktailJS v0.5.0 or greater is required to use this annotation.


### Usage

Using `@evented` annotation is quite easy. First we need to register the custom annotation with current cocktail instance.

MyClass.js

````javascript
var cocktail = require('cocktail'),
    Evented  = require('cocktail-annotation-evented');

//register Evented annotation with current cocktail instance
cocktail.use(Evented);

cocktail.mix({
    '@exports': module
    '@as'     : 'class',

    // we can say that our class is evented by passing `true` as a param
    '@evented': true,

    doSomething: function(){
        this.emit('doingSomething', this);
    } 
});
````

index.js
````javascript

var MyClass = require('./MyClass'),
    obj;

obj = new MyClass();

obj.on('doingSomething', function(){console.log('obj is doing something!');});

obj.doSomething();

````

### API

- `@evented: parameter`
    - **parameter**: {boolean|Object} if the parameter is `true`, the evented annotation will create and add a new instance of node's `events.EventEmitter`. You can as well specify your own EventEmitter instance as a parameter.


