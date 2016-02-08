/**
* Sklad.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Sklad = {
    attributes: {
        post: {
          model: 'Post'
        },
        ingri: {
          model: 'Ingridients'
        },
        date: {
          type: 'date'
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
