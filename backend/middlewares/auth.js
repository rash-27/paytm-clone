const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');
    const newToken = token.split(' ')[1];
    try{
        const decoded = jwt.verify(newToken, config.get('JwtSecret'));
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }
}
module.exports.authMiddleware = authMiddleware;