const jwt = require("jsonwebtoken");
const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization'];
    const bearer = authToken.split(' ');
    const token = bearer[1];

    if (token == undefined) {
        return res.status(403).json({err:"You are not allowed to access this"});
    }

    try {
        let decoded = jwt.verify(token, secret);
        if (!decoded) {
            throw new authToken("Fail in authentication process")
        }

        req.user = {id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role.data[0]}
        next();
    } catch (err) {
        res.status(403).json({err: err.message});
    }
}