var request = require('request');

module.exports = {
    auth: function(callback) {
      /**
      var url = "";
      var data = {
        clientid: '',
        redirect_uri: "http://localhost/",
        display: "mobile",
        response_type: "code"
      }
      request({
          url: url,
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data)
        },function(err, response, body){

        });
*/
      callback(null, { url: "https://oauth.vk.com/authorize?client_id=5465925&redirect_uri=http://localhost/Auth/access/&display=mobile&response_type=code" })
    },
    token: function(code, callback){
      var url = 'https://oauth.vk.com/access_token?client_id=5465925&client_secret=2fRdBKStiweYARM4plo2&redirect_uri=http://localhost/Auth/access/&code='+code;
      request({
          url: url,
          json: true
        },function(err, response, body){
          callback(err, body);
        });
    },
    getuser: function(token, id, callback){
      var url = "https://api.vk.com/method/users.get?user_id="+id+"&v=5.52&access_token="+token+"&fields=photo_100";
      request({
          url: url,
          json: true
        },function(err, response, body){
          callback(err, body);
        });
    }
  }
