var dbConn = require("../../database/connection");
var user = function (req) {
    this.Name = req.body.name;
    this.Email = req.body.email;
    this.Password = req.body.password;
}

user.create = function(usermodel, result){
    dbConn.query("Insert into user set ?", usermodel, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res.insertId);
        }
    })
}

user.login = function(bodyData, result){
    dbConn.query(`select Id, Email, Name from user where Email = '${bodyData.email}' and Password = '${bodyData.password}'`, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res);
        }
    })
}

module.exports = user;