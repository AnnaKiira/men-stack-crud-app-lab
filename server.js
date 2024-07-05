//Imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

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

//crystals/show
app.get('/crystals/:crystalId', async (req, res) => {
    const crystalId = (req.params.crystalId)
    const foundCrystal = await Crystal.findById(crystalId)
    return res.render('crystals/show', { crystal: foundCrystal })
})

//crystals/delete
app.delete('/crystals/:crystalId', async (req, res) => {
    const crystalId = req.params.crystalId
    await Crystal.findByIdAndDelete(crystalId)
    res.redirect('/crystals')
})

//crystals/edit
app.get('/crystals/:crystalId/edit', async (req, res) => {
    const crystalId = req.params.crystalId
    const foundCrystal = await Crystal.findById(crystalId);
    return res.render("crystals/edit", {crystal: foundCrystal })
})

//crystals/update
app.put('/crystals/:crystalId', async (req, res) => {
    const crystalId = req.params.crystalId
    await Crystal.findByIdAndUpdate(crystalId, req.body)
    res.redirect(`/crystals/${crystalId}`)
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