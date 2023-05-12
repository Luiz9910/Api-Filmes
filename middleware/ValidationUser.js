module.exports = function(req, res, next) {
    if (req.user.id == req.params.id) {
        next();
    } else {
        res.status(403);
        res.json({error: "You do not have permission to acess this"});
    }
}