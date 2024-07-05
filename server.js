//Imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//Models
const Crystal = require('./models/crystal.js')

//Constants
const app = express()

//Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//Routes
app.get('/', (req, res) => {
    return res.render('index')
})

//Tried creating a link to the descriptions of the crystals. Tried solving with Yousef and Rahna but we were unsure of how to solve it. 
/* app.get('/crystals/:crystalId', async (req, res) => {
    const crystalDescription = await Crystal.findById(req.params.crystalId)
    return res.render('crystals/show', { crystals: crystalDescription })
}) */

//crystals/new
app.get('/crystals/new', (req, res) => {
    return res.render('crystals/new')
})

//crystals/create
app.post('/crystals', async (req, res) => {
    const createCrystal = await Crystal.create(req.body)
    res.redirect('/crystals/new')
})

//crystals/index
app.get('/crystals', async (req, res) => {
    const allCrystals = await Crystal.find()
    res.render('crystals/index', { crystals: allCrystals })
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