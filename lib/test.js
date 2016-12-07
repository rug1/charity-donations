var test = require('tape');
var start = require('./start.js');
var server = require('./index.js');

test("Test build directory is being served", function(t){
  var options = {
    method: 'GET',
    url: '/'
  }
  server.inject(options, function(res){
    t.equal(res.statusCode, 200, 'passed!');
    t.end();
  })
});

test("Test object returned from /get-data has correct keys", function(t){
  var options = {
    method: 'GET',
    url: '/get-data'
  }
  server.inject(options, function(res){
    var keys = Object.keys(JSON.parse(res.payload));
    t.equal(res.statusCode, 200, 'passed!');
    t.deepEqual(keys, ['charity', 'donations'], 'passed!');
    server.stop(t.end);
  })
});
