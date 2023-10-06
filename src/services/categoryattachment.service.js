var dbConn = require("../../database/connection");
var categoryAttachments = function (data) {
    this.Path = data.path;
    this.CategoryId = data.CategoryId;
}

categoryAttachments.updloadAttchments = async function(attachmentmodel, result){
    await dbConn.query(`insert into categoryattachments set ?`, attachmentmodel, function(err, res){
        if(err){
            result(err,null);
        } else {
            result(null, res);
        }
    })
}

categoryAttachments.get = async function(categoryId){
    return new Promise((resolve, reject) =>{
        dbConn.query(`select * from categoryattachments where CategoryId = ${categoryId}`, function (err, res){
            if(err){
                console.log("err--->",err);
                reject(err);
            }else{
               resolve(res); 
            }
        })
    })
}

categoryAttachments.delete = async function(categoryId){
    return new Promise((resolve, reject) =>{
        dbConn.query(`delete from categoryattachments where CategoryId = ${categoryId}`, function (err, res){
            if(err){
                console.log("err--->",err);
                reject(err);
            }else{
               resolve(res); 
            }
        })
    })
}

module.exports = categoryAttachments;
