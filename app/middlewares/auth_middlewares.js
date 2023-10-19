import jwt from 'jsonwebtoken';
import 'dotenv/config';

let verifyToken = (req, res, next) => {
    let token = req.get('auth');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            res.status(400).json({
                message: 'Ups! - Token no Verificado'
            })
        }
        req.user = decoded.user;
        next()
    })
}

export default verifyToken;