/**
 * IngridientsController
 *
 * @description :: Server-side logic for managing Ingridients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    create: function (req, res){
        var elem = {
            title : req.param('title'),
            category : req.param('category'),
            size : req.param('size')
        };

        Ingridients.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });


    },

    update: function (req, res){
        var id =  req.param('id');

        var elem = {
            title: req.param('title'),
            category: req.param('category'),
            size: req.param('size')
        };

        Ingridients.update(id, elem).exec(function (err) {
            if (err) {return res.send(500);}else{ return res.redirect('/');}
        });
    }

};

