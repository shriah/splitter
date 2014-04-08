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
