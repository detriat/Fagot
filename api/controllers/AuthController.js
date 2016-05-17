module.exports = {
  index: function(req, res) {
    Vk.auth(function (err, item) {
      res.send(200, item)
    });
  },
  access: function(req, res){
    if (typeof(req.param('code')== "string")) {
      var code = req.param('code');
      Vk.token(code, function(err, item){
        sails.log(item);
        Vk.getuser(item['access_token'], item['user_id'], function(err, item){
            res.send(200, item);
        })
      });
    }
  }
}
