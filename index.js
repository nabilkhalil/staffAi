var express = require('express');
var mongo = require('mongodb');
var mongoose = require("mongoose");
var app = express();
var Schema = mongoose.Schema;
var db = mongoose.connection;
var userJS = require("./user.js");
var UserTraffic = require('./user');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var url = 'mongodb://admin:admin@ds119223.mlab.com:19223/cube-traffic';

// Imports
// var myModule = require('./js/voice-rec');
// var userName = myModule.userName;
// var trafficQuery = myModule.trafficQuery;
//connects to DB

//serve our static files
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect(url, function(err){
    if(err){
      console.log("error " + err);
  }else{
      console.log("mongoose connected");
  }

});

var collection;
var credentialCollection;
var credentials;
userLogin = null;
passLogin = null;

MongoClient.connect(url, function(err, db) {
    if(err){
        console.log("Error connecting")
        process.close(1);
    }else{
      // Specifying collection. You can use multiple connections.
      collection = db.collection('traffic')
      credentialCollection = db.collection('adminPass');

      console.log("Connected correctly to mongo");
      // Assigns values for Username and Password
      credentialCollection.findOne({},{username:1, password:1}, function(err, item) {
        if(err){
          console.log('error has occured');
        }
        if(item){

          
          userLogin = item.username;
          passLogin = item.password;
          credentials = {
            "username":userLogin,
            "password":passLogin
          }

          console.log(credentials);
        }
      })

    }
});
// Gets all of the user's logs
app.get('/traffic',function(req,res){
  UserTraffic.find({})
  .exec(function(err,collection){

    if(err){
      res.send('error has occured');
    }else{
      res.json(collection);
      console.log(collection)
    }

  });
})


app.get('/credentials',function(req,res){
  res.json(credentials)
})



//Sets port
var port = process.env.PORT || 8000;
app.listen(port, () => console.log("listening on  " + port));
// var User = mongoose.model("User", userSchema);


