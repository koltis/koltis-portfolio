const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const bp = require("body-parser");

const userRouter = require('./routers/users')
const contactsRouter = require('./routers/contacts')
const entriesRouter = require('./routers/entries')
const commentsRouter = require('./routers/comments')

const Entry = require('./db/models/entries')
    //select port
const port = 3000 || process.env.PORT

//initialize express
const app = express()

//app use
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(mongoSanitize())

app.use(userRouter)
app.use(contactsRouter)
app.use(entriesRouter)
app.use(commentsRouter)

// too load all the entries
app.get('/', async(req, res) => {
    try {
        const entries = await Entry.find()
        let entriesNames = []
        entries.forEach(value => entriesNames = [...entriesNames, value.author])

        res.send({ entriesNames, entries })
    } catch (e) { res.status(400).send(e) }
})

app.listen(port, console.log(`server is up at port ${port}`))