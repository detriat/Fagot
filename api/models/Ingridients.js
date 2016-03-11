/**
* Ingridients.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models

 /**  */

var Ingridients = {
    attributes: {
        title: {
            type: 'string'
        },
        category: {
            model: 'categories'
        },
        size: {
            type: 'integer'
        },
        rating: {
           type: 'integer'
        }
    }
}

module.exports = Ingridients;
