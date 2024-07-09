//Imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const crystalsController = require('./controllers/crystals.js'); //to refer to the controllers/crystals.js file 

//Models
const Crystal = require('./models/crystal.js')

//Constants
const app = express()

//Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(methodOverride('_method'))

//Routes
app.get('/', (req, res) => {
    return res.render('index')
})

//controllers/crystals.js
app.use('/crystals', crystalsController) //to refer to the controllers/crystals.js file 

app.get('*', (req, res) => {
    res.status(404).send('404')
})

//Server Connections
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connection established')
        app.listen(process.env.PORT, () => {
            console.log(`Server up and running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

connect ()