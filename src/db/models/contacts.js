const moongose = require('./../mongoose/mongoose')
const validator = require('validator')

const Schema = moongose.Schema

const contactsSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    company: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Thats not an email =C')
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) throw new Error('Thats not a phone number lol')
        }
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    readed: {
        type: Boolean,
        required: true
    }
})

const Contacts = moongose.model('Contacts', contactsSchema)

module.exports = Contacts