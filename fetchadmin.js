const jwt = require("jsonwebtoken")
const JWT_SECRET = "vikashtanwer";

const fetchadmin = (req, res, next)=>{
    // get the admin from the jwt token and add id to req object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET )
        req.admin = data.admin
        next()
    } catch (error) {
        res.status(401).send("please authenticate using a valid token");
    }

}

module.exports = fetchadmin;