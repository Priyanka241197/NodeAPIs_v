var dbConn = require("../../database/connection");
var category = function (req) {
    this.Name = req.body.name;
    this.Status = req.body.status;
    this.BrandId = req.body.brandId;
    this.CreatedDate = req.body.CreatedDate ? req.body.CreatedDate : new Date();
    this.UpdatedDate = new Date();
}

category.create = function(categorymodel, result){
    dbConn.query("Insert into category set ?", categorymodel, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res.insertId);
        }
    })
}

category.getAll = function(result){
    dbConn.query("select c.*, b.BrandName from category c left join brand b on b.Id = c.BrandId where c.IsDeleted = 0;", function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res);
        }
    })
}

category.update = function(data, CategoryId, result){
    params = [
        data.Name,
        data.Status,
        data.BrandId,
        CategoryId
    ]
    dbConn.query("update category set Name=?,Status=?,BrandId=? where Id=?;",params, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res);
        }
    })
}

category.delete = function(categoryId, result){
    dbConn.query(`update category set IsDeleted = 1 where Id = ${categoryId};`, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res);
        }
    })
}

module.exports = category;