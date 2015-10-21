/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/***/

module.exports = {

	create: function (req, res){
        var elem = {
            login : req.param('login'),
            password : req.param('password'),
            email: req.param('email'),
            name: req.param('name'),
            surname: req.param('surname')
        };

        Users.create(elem).exec(function (err, user) {
            if (err) {return res.send(500);}else{ return res.ok();}
        });
    }




};

