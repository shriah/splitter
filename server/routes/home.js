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

exports.post = function(req, res){
  var occasion = {};
  occasion.name = req.param('name', null);  // second parameter is default
  occasion.date = req.param('date', null);
  occasion.cost = req.param('cost', null);
  if(!!!occasion.cost){
    occasion.cost = 0.0;
  }
  console.log(occasion);
  if(!!occasion.name&&!!occasion.date){
    db.insert(occasion, function (err, newOccasion) {   // Callback is optional
      console.log(newOccasion);  
      res.redirect('/');
    }); 
  }else{
    var session = req.session;
    var messages = (session.messages = []);
    if(!!!occasion.date)
      messages.push('Date cannot be empty');
    if(!!!occasion.name)
      messages.push('Name cannot be empty');
    console.log("Recieved invalid occasion ");
    console.log(messages);
    console.log(!!occasion.date);
    res.redirect('/');
  }
};
