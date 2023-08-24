const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    try {
        const authToken = req.headers['authorization'];

        const bearer = authToken.split(' ');
        const token = bearer[1];

        if (token == undefined) {
            return res.status(403).json({err:"You are not allowed to access this"});
        }

        let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decoded) {
            throw new authToken("Fail in authentication process")
        }

        req.user = {id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role.data[0]}
        next();
    } catch (err) {
        res.status(403).json({err: "Fail in authentication process"});
    }
}
