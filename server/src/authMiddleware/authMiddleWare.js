const jwt = require('jsonwebtoken');

class AuthMiddleware{
    constructor(){
        this.auth = this.auth.bind(this);
    }

    async auth(req, res, next){
        try{

            const accessToken = req.cookies.accessToken;
            console.log('accessToken:', accessToken);
            if(!accessToken){
                return res.status(401).json({ message: 'UnAuthorized to do these operation' });
            };
            const verify=jwt.verify(accessToken,process.env.JWT_SECRET);
            if(!verify){
                return res.status(401).json({ message: 'UnAuthorized to do these operation' });
            }
            const decode=jwt.decode(accessToken,process.env.JWT_SECRET);
            console.log('decode:', decode);
            req.user=decode;
            next();
        }catch(err){
            console.log('err:', err);
            return res.status(401).json({ message: 'UnAuthorized to do these operation' });  }
    }
}

module.exports = new AuthMiddleware();