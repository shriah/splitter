var db = require('../db');
exports.get = function(req, res){
  var session = req.session;
  var messages = session.messages || (session.messages = []);
  var errors = messages.splice(0);
  messages=[];
  db.find({}).sort({ date: 1 }).exec( function (err, docs) {
    res.render('home',{occasions:docs,flash: errors});
    messages = [];
  });
  
};


