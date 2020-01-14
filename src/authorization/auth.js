const jwt = require('jsonwebtoken')
const User = require('./../db/models/user')
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        const { data: _id } = id = await jwt.verify(token, 'iqij23ij41i9und')
        const user = await User.findById(_id)
        if (!user) { throw new Error('Bad Token') }
        req.user = user
        req.token = req.header('Authorization')
        next()
    } catch (e) {
        throw new Error(e)
    }
}
module.exports = auth