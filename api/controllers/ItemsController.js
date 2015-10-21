/**
 * ItemsController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
            title : req.param('title'),
            components : req.param('components'),
            size : req.param('size'),
            price : req.param('price')
        };

        Items.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};

