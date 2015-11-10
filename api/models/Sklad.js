/**
* Sklad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Sklad = {
    attributes: {
        category:{
            type: 'string'
        },
        title: {
            type: 'string'
        },
        amount: {
            type: 'integer'
        },
        price: {
          type: 'integer'
        }
    }
}

module.exports = Sklad;
