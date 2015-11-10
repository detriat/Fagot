/**
 * SkladController
 *
 * @description :: Server-side logic for managing sklads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
            category : req.param('category'),
            title : req.param('title'),
            amount : req.param('amount'),
            price : req.param('price')
        };

        Sklad.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};
