var fetch = require('node-fetch');

module.exports = function (app) {
    app.post('/users', (req, res) => {
        var data = {};
        console.log("Passed Data", req.body);
        fetch(`http://apilayer.net/api/validate?access_key=836fff0bc06a8d53fbaed1aefb074ab5&%20number=${req.body.phoneNo}&country_code=IN&format=1`).then(function (response) {
            return response.json();
        })
            .then(function (myJson) {

                console.log("User Mobile Data", myJson)
                console.log("User Location", myJson.location);
                console.log("Candidate Location", req.body.location);

                if (!req.body.location && !req.body.phoneNo) {
                    data = {
                        success: false,
                        error: {
                            type: 'no_phone_number_and_no_candidate_location_provided',
                            info: 'Please specify a phone number [Example: 14158586273] and candidate location'
                        }
                    }
                }
                else if (!req.body.location) {
                    data = {
                        success: false,
                        error: {
                            type: 'no_candidate_location_provided',
                            info: 'Please specify candidate location'
                        }
                    }
                }
                else if (!req.body.phoneNo) {
                    data = {
                        success: false,
                        error: {
                            type: 'no_phone_number_provided',
                            info: 'Please specify a phone number [Example: 14158586273]'
                        }
                    }
                }
                else if (req.body.phoneNo && req.body.location && (req.body.location.trim().toLowerCase() == myJson.location.toLowerCase() || myJson.location.toLowerCase().includes(req.body.location.toLowerCase()))) {
                    data = {
                        valid: true,
                        userLocation: myJson.location.toUpperCase(),
                        candidateLocation: req.body.location.trim().toUpperCase()
                    }
                }
                else {
                    data = {
                        valid: false,
                        userLocation: myJson.location.toUpperCase(),
                        candidateLocation: req.body.location.trim().toUpperCase()
                    }
                }
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}
