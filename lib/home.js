var Wreck = require('wreck');
var async = require('async');

exports.register = function(server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/{param*}',
      config: {
        description: 'serve the build directory',
        handler: {
          directory: {
            path: 'build',
            listing: true
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/get-data',
      handler: function(request, reply) {
        getData(function(data){
          return reply(data);
        });
      }
    }
  ]);
  return next();
};

function getData(callback){
  var data = {};
  async.waterfall([
    function(callback){
      var enpoint = "/charity/183092";
      var options = { headers: {"Content-Type": "application/json"} };
      Wreck.get('https://api.justgiving.com/9c390f75/v1/charity/183092', options, (err, res, payload) => {
        var charity = JSON.parse(payload.toString());
        data.charity = charity;
        callback(null, data);
      });
    },
    function(data, callback){
      var options = { headers: {"Content-Type": "application/json"} };
      Wreck.get('https://api.justgiving.com/9c390f75/v1/charity/183092/donations', options, (err, res, payload) => {
        var donations = JSON.parse(payload.toString());
        data.donations = donations.donations;
        callback(null, data);
      });
    }
  ], function(err, result){
    if (err) {
      callback(err); // TODO: ERROR HANDLE HERE!
    } else {
      callback(result);
    }
  })
}

exports.register.attributes = {
  name: 'Home'
};
