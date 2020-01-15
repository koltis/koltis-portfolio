const express = require('express')
const Entry = require('./../db/models/entries')

const router = express.Router()
const permit = require('./../authorization/admin')

router.post('/create/entry', permit, async(req, res) => {
    try {
        const entry = new Entry(req.body)
        await entry.save()
        res.send(entry)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router