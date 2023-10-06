const jwt = require("jsonwebtoken");


module.exports = {
    resposeGenerator : function(data, status, message, err ){
        var response = {
            data : data,
            status_code : status,
            status_messsage : message
        }

        if(err){
            response['error'] = err 
        }
        return response;
    },

generateToken: function(user){
    user.date = Date.now
    let userDetails = {
        UserId: user.Id,
        Email: user.Email
    }
    return jwt.sign({user: userDetails}, 'vasundharaToken', {expiresIn: '24h'})
},

verifyToken : (req,res,next) =>{
    jwt.verify(req.headers.token,'vasundharaToken', function(err){
        if(err){
            let response = {
                data : {},
                status_code : 401,
                error_message : "You are not allow to do login"
            }
            return res.send(response)
        }

        next()
    })
}
}