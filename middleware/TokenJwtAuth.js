const jwt = require("jsonwebtoken");
const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

module.exports = function(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try {
            var decoded = jwt.verify(token, secret);
            if (decoded) {
                req.user = {id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role.data[0]}
                next();
            } else {
                res.status(403);
                res.send("Fail in authentication process");
                return;
            }
        } catch (err) {
            res.status(403);
            res.send("Fail in authentication process");
            return;
        }
    } else {
        res.status(403);
        res.send("You are not allowed to access this");
        return;
    }
}