const express = require('express')
const Contacts = require('./../db/models/contacts')


const permit = require('./../authorization/admin')

const router = express.Router()

router.post('/contacts', async(req, res) => {
    try {
        const contacts = new Contacts(req.body)
        contacts["readed"] = false
        await contacts.save()
        res.send(contacts)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/contacts', permit, async(req, res) => {
    try {
        const query = req.query
        if (query.readed) {
            if (req.query.readed == "false") {
                const contacts = await Contacts.find({ readed: false })
                res.send(contacts)
                return
            }
            const contacts = await Contacts.find({ readed: true })
            res.send(contacts)
            return
        }

        const contacts = await Contacts.find()
        res.send(contacts)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router