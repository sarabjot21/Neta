var fetch = require('node-fetch');

module.exports = function(app){
    app.post('/users',(req,res)=>{
        var data = {};
        console.log("Passed Data",req.body);
        fetch(`http://apilayer.net/api/validate?access_key=836fff0bc06a8d53fbaed1aefb074ab5&%20number=${req.body.phoneNo}&country_code=IN&format=1`).then(function(response) {
            return response.json();
          })
          .then(function(myJson) {
              console.log("User Mobile Data",myJson)
              console.log("User Location",myJson.location);
              console.log("Candidate Location",req.body.location);
              if(req.body.location.toLowerCase()==myJson.location.toLowerCase()||myJson.location.toLowerCase().includes(req.body.location.toLowerCase()))
              {
                  data = {
                      valid: true,
                      msg: 'User is Voting in registered Constituency'
                    }
              }
              else{
                  data = {
                      valid: false,
                      msg: 'User is Not Voting in registered Constituency'
                    }
              }
              res.json(data);
          });
          });
}