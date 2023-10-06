var brand = require("../services/brand.service");
var { resposeGenerator } = require("../../middlewares/globle");

exports.addBrand = (req, res) => {
    try{
        var newBrand = new brand(req);
        brand.create(newBrand, (err, brand) => {
            if(res){
                return res.send(resposeGenerator(brand, 200, 'brand created successfully.'))
            }else{
                console.log("Creat Brand API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while creating brand',err))
            }
        })
    }catch(err){
        console.log("Creat Brand API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while creating brand',err))
    }
}

exports.getAllBrand = (req, res) => {
    try{
        var newBrand = new brand(req);
        brand.getAll(newBrand, (err, brand) => {
            if(res){
                return res.send(resposeGenerator(brand, 200, 'Successfully get all brand'))
            }else{
                console.log("Creat Brand API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while geting brand',err))
            }
        })
    }catch(err){
        console.log("Creat Brand API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while geting brand',err))
    }
}


