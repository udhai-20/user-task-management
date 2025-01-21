

class AuthMiddleware{
    constructor(){
        this.auth = this.auth.bind(this);
    }

    async auth(req, res, next){
        console.log('Auth Middleware');
        next();
    }
}

module.exports = new AuthMiddleware();