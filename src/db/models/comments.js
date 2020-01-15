const mongoose = require('./../mongoose/mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    coment: {
        type: String,
        required: true,
        trim: true
    },
    entry: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

}, { timestamps: true })

const Coments = mongoose.model('Coments', commentsSchema)

module.exports = Coments