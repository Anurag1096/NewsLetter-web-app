// jshint esversion:6
const express = require('express');


const bodyParser = require("body-parser");
const request = require('request');

const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");


});

app.post("/", function(req,res){

  console.log("Got data");
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const data ={

    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  const jasonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/7899a38915";
  const options = {
    method: "POST",
    // Now we have to add authentication
    auth: "anurag:35deda13b02b547f48d9bcf1b64b039b-us7"
  };
  const request = https.request(url, options , function(response){
    // The folling code responds by sending html page
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }

   response.on("data", function(data){
     console.log(JSON.parse(data));
   });
   });
   request.write(jasonData);
   request.end();

});
// This redirects page to the home
app.post('/failure', function(req, res){
  res.redirect("/");

});

app.listen(process.env.PORT || 3000, function(){

  console.log("server is running on port 3000");
});
// API Key
//
//
