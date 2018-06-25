const checkUser = require('./check_user');

module.exports = function(app){
    checkUser(app);
}