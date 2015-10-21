/**
 * SkladController
 *
 * @description :: Server-side logic for managing sklads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res){
        var elem = {
            title : req.param('title'),
            amount : req.param('amount')
        };

        Sklad.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }
};

