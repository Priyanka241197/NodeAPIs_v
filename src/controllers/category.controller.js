var Category = require("../services/Category.service");
var categoryAttachments = require("../services/categoryattachment.service");
var { resposeGenerator } = require("../../middlewares/globle");
const fs = require("fs");

exports.addCategory = (req, res) => {
    try{
        var newCategory = new Category(req);
        Category.create(newCategory, (err, Category) => {
            if(Category){
                let payload = {
                    CategoryId :Category
                }
                if(req.files.length){
                  req.files.forEach(async file => {
                    payload['path'] = file.path
                    var attchmentModel = new categoryAttachments(payload);
                    await categoryAttachments.updloadAttchments(attchmentModel, (err, attachmentId) => {
                        try{
                            if(err){
                                return res.send(resposeGenerator({}, 500, 'Something went wrong while uploading image',err))
                            }
                        }catch(err){
                            return res.send(resposeGenerator({}, 500, 'Something went wrong while uploading image',err))
                        }
                    })
                  });  
                }
                return res.send(resposeGenerator(Category, 200, 'Category created successfully.'))
            }else{
                console.log("Creat Category API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while creating Category',err))
            }
        })
    }catch(err){
        console.log("Creat Category API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while creating Category',err))
    }
}

exports.getAllCategory = (req, res) => {
    try{
        Category.getAll((err, Category) => {
            if(Category){
                return res.send(resposeGenerator(Category, 200, 'Successfully get all Category'))
            }else{
                console.log("Creat Category API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while geting Category',err))
            }
        })
    }catch(err){
        console.log("Creat Category API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while geting Category',err))
    }
}


exports.updateCategory = (req, res) => {
    try{
        var categoryId = req.body.categoryId
        var newCategory = new Category(req);
        Category.update(newCategory,req.body.categoryId, async(err, Category) => {
            if(Category){
                if(req.files.length){
                    let payload = {
                        CategoryId : categoryId
                    }
                const existingattachments = await categoryAttachments.get(req.body.categoryId)
                existingattachments.forEach(file =>{
                    fs.unlink(file.Path,(err) => {
                        if(err){
                            console.log("Error while deleting file ",err);
                        }
                    });
                })
                const deleteExisting = await categoryAttachments.delete(req.body.categoryId)
                  req.files.forEach(async file => {
                    payload['path'] = file.path
                    var attchmentModel = new categoryAttachments(payload);
                    await categoryAttachments.updloadAttchments(attchmentModel, (err, attachmentId) => {
                        try{
                            if(err){
                                return res.send(resposeGenerator({}, 500, 'Something went wrong while uploading image',err))
                            }
                        }catch(err){
                            return res.send(resposeGenerator({}, 500, 'Something went wrong while uploading image',err))
                        }
                    })
                  });  
                }
                return res.send(resposeGenerator({}, 200, 'Category updated successfully.'))
            }else{
                console.log("Creat Category API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while updating Category',err))
            }
        })
    }catch(err){
        console.log("Creat Category API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while creating Category',err))
    }
}

exports.deleteCategory = (req, res) => {
    try{
        Category.delete(req.query.Id, (err, Category) => {
            if(res){
                return res.send(resposeGenerator({}, 200, 'Category deleted successfully'))
            }else{
                console.log("Creat Category API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while deleting Category',err))
            }
        })
    }catch(err){
        console.log("Creat Category API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while deleting Category',err))
    }
}




