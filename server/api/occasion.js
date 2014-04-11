var db = require('../db');
exports.getAll =  function(req, res){
  db.find({}, function (err, occasions) {   // Callback is optional
      res.send(occasions);
      if(err){
        var session = req.session;
        var messages = (session.messages = []);
        messages.push('Cannot find occasions. Try again later');
        console.log("cannot find occasions");
        console.log(err);
        res.redirect('/');
      }
  }); 

};
exports.getById =  function(req, res){
  var id = req.params.id;  // second parameter is default
  db.find({_id:id}, function (err, occasion) {   // Callback is optional
      res.send(occasion);
      if(err){
        var session = req.session;
        var messages = (session.messages = []);
        messages.push('Cannot find occasion for given id.');
        console.log("cannot find occasion for id:"+id);
        console.log(err);
        res.redirect('/');
      }
  }); 

};
exports.add = function(req, res){
  if(req.body){
    var occasion = req.body;
  }else{
    occasion.name = req.param('name', null);  // second parameter is default
    occasion.date = req.param('date', null);
    occasion.cost = req.param('cost', null);
  }
  if(!!!occasion.cost){
    occasion.cost = 0.0;
  }
  if(!!occasion.name&&!!occasion.date){
    db.insert(occasion, function (err, newOccasion) {   // Callback is optional 
      res.format({
        text: function(){
          res.redirect('/');
        },

        html: function(){
          res.redirect('/');
        },

        json: function(){
          res.send(newOccasion);
        }
      });
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
    res.format({
      text: function(){
        res.redirect('/');
      },

      html: function(){
        res.redirect('/');
      },

      json: function(){
        res.send(400,messages);
      }
    });
    
  }
};

exports.update = function(req, res){
  if(req.body){
    var occasion = req.body;
  }else{
    occasion.name = req.param('name', null);  // second parameter is default
    occasion.date = req.param('date', null);
    occasion.cost = req.param('cost', null);
  }
  if(!!!occasion.cost){
    occasion.cost = 0.0;
  }
  if(!!occasion.name&&!!occasion.date){
    db.update({_id:occasion._id},occasion,{}, function (err, newOccasion) {   // Callback is optional 
      res.format({
        text: function(){
          res.redirect('/');
        },

        html: function(){
          res.redirect('/');
        },

        json: function(){
          res.send(newOccasion);
        }
      });
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
    res.format({
      text: function(){
        res.redirect('/');
      },

      html: function(){
        res.redirect('/');
      },

      json: function(){
        res.send(400,messages);
      }
    });
    
  }
};
exports.delete = function(req, res){
  var id = req.params.id;  // second parameter is default
  console.log("id ="+id);
  db.remove({_id:id}, {},function (err, numRemoved) {   // Callback is optional
    console.log(numRemoved+" , error:"+err);
        if(err){
          var session = req.session;
          var messages = (session.messages = []);
          messages.push('Cannot delete the given id');
          console.log(messages);
          
        }
        return res.send('');
    }); 
};
