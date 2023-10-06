var user = require("../services/user.service");
var { resposeGenerator, generateToken } = require("../../middlewares/globle");

exports.usersignUp = (req, res) => {
    try{
        var newUser = new user(req);
        user.create(newUser, (err, user) => {
            if(res){
                return res.send(resposeGenerator(user, 200, 'User registration successful.'))
            }else{
                console.log("Signup API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while registering user',err))
            }
        })
    }catch(err){
        console.log("Signup API ERROR :",err)
        return res.send(resposeGenerator({}, 500, 'Error while registering user',err))
    }
}

exports.userLogin = (req, res) => {
        user.login(req.body, async (err, userData) => {
            try{
                if(err){
                    console.log("Signup API ERROR :",err)
                    return res.send(resposeGenerator({}, 500, 'Error while user login',err))
                }
              else{
                if(userData.length){
                    const Token = await generateToken(userData);
                    userData[0]['Token']  = Token;
                    return res.send(resposeGenerator(userData, 200, 'User login successful'))
                }else{
                    return res.send(resposeGenerator([], 200, 'User not found'))
                }
                }
            }catch(err){
                console.log("Login API ERROR :",err)
                return res.send(resposeGenerator({}, 500, 'Error while user login',err))
            }
        })
}
