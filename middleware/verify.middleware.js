const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT= async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        token = authHeader?.split(" ")[1];


        if (!token) return res.status(401).send({ message: "Access denied", success: false });

        jwt.verify(token, 'jwt_secret', (err, decoded) => {
            if (err) {
                res.status(401).send({ message: "Invalid token", success: false });
            } else {
                req.user = decoded;
                next();
            }
        })
    } catch (error) {
        res.status(500).send({ message: "Error in authentication", success: false });
        console.log(error);
    }
}

module.exports={
    verifyJWT
}