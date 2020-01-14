const mongoose = require('./../mongoose/mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            const valid = validator.isEmail(value)
            if (!valid) {
                throw new Error('The emil is not valid  Lol')
            }
        },
        index: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Vete a la mierda con esa seguridad te hashea la contraseña tu abuela')
            }
        },
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    admin: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.statics.generateJwt = async(user) => {
    try {
        const token = await jwt.sign({ data: user.id }, 'iqij23ij41i9und', { expiresIn: '7d' }, { algorithm: 'RS256' })
        const BearerToken = `Bearer ${token}`
        user.tokens = [...user.tokens, { token: BearerToken }]
        return BearerToken
    } catch (e) {
        throw new Error('lol this generateJwt failed? :c')
    }
}

UserSchema.statics.PasswordWorks = async(user) => {
    try {
        const { name, password, email } = user
        const userDb = await User.findOne({ email })
        if (!userDb) {
            throw new Error('dude the email doesnt exist ;v')
        }
        const correctPassword = await bcryptjs.compare(password, userDb.password)
        if (!correctPassword) {
            throw new Error('estas pendejo inventandote contraseñas o estas hackiando duro ?')
        }
        return userDb
    } catch (e) {
        throw new Error(e)
    }
}

UserSchema.pre('save', async function() {
    const user = this
    if (!user.isModified('password')) {
        return
    }
    try {
        const salt = await bcryptjs.genSalt(10)
        const password = await bcryptjs.hash(user.password, salt)
        user.password = password
    } catch (e) {
        throw new Error(e)
    }
})

UserSchema.methods.toJSON = function() {
    const user = this
    const objectUser = user.toObject()
    delete objectUser.tokens
    delete objectUser.password
    return objectUser
}
const User = mongoose.model('User', UserSchema)

module.exports = User