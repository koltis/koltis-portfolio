const User = require('./../db/models/user')
const jwt = require('jsonwebtoken')
const userType = require('./userType')

const permit = async(req, res, next) => {
    try {
        const [, token] = req.header('Authorization').split(' ')
        const { data: _id } = id = await jwt.verify(token, 'iqij23ij41i9und')
        const user = await User.findById(_id)
        if (!user) { throw new Error('Bad Token') }
        if (user.role !== userType.admin.value) {
            throw new Error(`
             Gandalf: I am the servant of the Secret Fire,wielder of the Flame of Anor... 
             Gandalf: The dark fire will not avail you!Flame of Udûn!
             Gandalf: Go back to the Shadow!
             Gandalf: You shall not pass!`)
        }
        req.user = user
        req.token = req.header('Authorization')
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }

}
module.exports = permit