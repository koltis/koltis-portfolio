const express = require('express')
const router = express.Router()
const User = require('./../db/models/user')

const auth = require('./../authorization/auth')
const permit = require('./../authorization/admin')


router.delete('/user/logout', auth, async(req, res) => {
    try {
        const user = req.user
        const token = req.token
        user.tokens = Object.values(user.tokens).filter(value => value.token !== token)
        console.log(user.tokens)
        await user.save()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/user/admin', permit, async(req, res) => {
    try {
        const user = req.user
        const token = req.token

        res.send({ user, token })
    } catch (e) {
        res.status(401).send(e)
    }
})

router.post('/user', async(req, res) => {
    try {
        const user = await new User(req.body)
        if (!user) {
            res.status(400).send('Are u fucking kidding me broh :V')
        }

        await User.generateJwt(user)

        if (user["admin"]) {
            throw new Error('que te crees muy gracioso no? pues vete a tomar por culo')
        }

        user["admin"] = false

        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(`oh shit here we go awaint ${e}`)
    }
})

router.post('/user/login', async(req, res) => {
    try {
        const user = await User.PasswordWorks(req.body)
        const token = await User.generateJwt(user)
        await user.save()
        res.send({ user, token })
    } catch (e) { res.send(e.message) }
})

module.exports = router