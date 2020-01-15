const mongoose = require('./../mongoose/mongoose')

const Schema = mongoose.Schema

const EntrySchema = new Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    subtitle: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    imagenpost: {
        type: String,
        trim: true,
        required: true
    }


}, { timestamps: true })

const Entry = mongoose.model('Entry', EntrySchema)

module.exports = Entry