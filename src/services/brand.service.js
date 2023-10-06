var dbConn = require("../../database/connection");
var brand = function (req) {
    this.BrandName = req.body.brandName;
}

brand.create = function(brandmodel, result){
    dbConn.query("Insert into brand set ?", brandmodel, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res.insertId);
        }
    })
}

brand.getAll = function(brandmodel, result){
    dbConn.query("select * from brand;", brandmodel, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res);
        }
    })
}

module.exports = brand;