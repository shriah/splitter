var express = require('express');
var app = express();
app.set('view engine', 'kiwi')
app.use(express.logger('dev'))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.cookieParser('S3CRE7'));
app.use(express.session());
var Datastore = require('nedb')
  , db = new Datastore({ filename: __dirname+'/db/pooler.db', autoload: true });
  
app.get('/', function(req, res){
  var session = req.session;
  var messages = session.messages || (session.messages = []);
  var errors = messages.splice(0);
  messages=[];
  app.set('views', __dirname+'/app/home');
  db.find({}).sort({ date: 1 }).exec( function (err, docs) {
    res.render('index',{occasions:docs,flash: errors});
    messages = [];
  });
  
});

app.post('/occasion', function(req, res){
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
});
app.get('/occasion', function(req, res){
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

});
app.delete('/occasion/:id', function(req, res){
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
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
