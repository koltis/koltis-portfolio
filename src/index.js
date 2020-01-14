const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const bp = require("body-parser");

const userRouter = require('./routers/users')
const contactsRouter = require('./routers/contacts')

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

app.get('/', (req, res) => {})

app.listen(port, console.log(`server is up at port ${port}`))