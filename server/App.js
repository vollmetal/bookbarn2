const express = require('express')
global.models = require('./models')
const sequelize = require('sequelize')
const cors = require('cors')
global.bcrypt = require('bcryptjs')

const app = express()

app.use(cors());
app.use(express.json())

const userRoutes = require('./routes/users')
app.use('/user', userRoutes)

const bookRoutes = require('./routes/books')
app.use('/books', bookRoutes)


app.listen(4200, () => {
    console.log('server start!')
})