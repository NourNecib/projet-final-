const jwt = require("jsonwebtoken")
const User = require("../Models/userSchema")

const isAuth = async (req, res, next) => {
    const token = req.headers["authorisation"]
    if(!token) {
        res.send({msg: "no token"})
    } else {
        const decoded = jwt.verify(token, process.env.privateKey)
        const user = await User.findOne({_id: decoded.id})
        if(!user) {
            res.send({msg: "User not connected"})
        } else {
            req.user = user
            next()
        }
    }
}

module.exports = isAuth