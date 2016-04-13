/**
 * OrdersController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var async = require('async');

module.exports = {
  list: function(req, res) {
    Orders.count({}).exec(function(err, found) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      var len = found;
      var myQuery = Orders.find({});
      if (typeof(req.param('order') != "undefined")) {
        if (req.param('order').substring(0, 1) == "-") {
          var sort_string = req.param('order').substring(1, req.param('order').length);
          myQuery.sort(sort_string + ' DESC');
        } else {
          myQuery.sort(req.param('order') + ' ASC');
        }
      }
      if (typeof(req.param('page') != "undefined") && typeof(req.param('limit') != "undefined")) myQuery.paginate({
        page: req.param('page'),
        limit: req.param('limit')
      });
      myQuery.exec(function(err, results) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        var send = {
          data: results,
          count: len
        }
        return res.send(send);
      });
    });
  },
  buy: function(req, res) {
		var st = req.param('buys');
		if (typeof(st) == "string") {
			var arr = [];
			st = JSON.parse(st);
			arr.push(st);
			st = arr;
		}else{
			var arr = [];
			st.forEach(function(s){
				arr.push(JSON.parse(s));
			});
			st = arr;
		}
		var tasks = [];
		st.forEach(function(buy){
			Items.findOne({id:buy.id}).exec(function(err, item){
				if (!err) {
					item.ingri.forEach(function(ing){
						var task = function(callback){
							var obj = {
								ingri:  ing.id,
								amount: ing.kolvo * buy.kolvo * (-1)
							}
							Sklads.create(obj).exec(function(err, item){
								callback(err, item);
							});
						}
						tasks.push(task);
					});

					async.parallel(tasks, function(err, result){
						return res.send(result);
					});
				}
			});
		});


  }
}
