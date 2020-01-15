const express = require('express')
const router = express.Router()

const Comments = require('./../db/models/comments')
const auth = require('./../authorization/auth')

router.post('/comments', auth, async(req, res) => {
    try {
        const user = req.user
        const entry = req.query.entry
        const comment = req.body
        comment.entry = entry
        comment.user = user._id
        const comments = new Comments(comment)
        await comments.save()
        res.send(comments)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router