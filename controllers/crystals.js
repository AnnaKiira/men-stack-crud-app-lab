const express = require("express");
const router = express.Router();

// * models
const Crystal = require('../models/crystal.js')


//Routes / Controllers

//crystals/new
router.get('/new', (req, res) => {
    return res.render('crystals/new')
})

//crystals/create
router.post('/', async (req, res) => {
    try {
        const createCrystal = await Crystal.create(req.body)
        return res.redirect('/crystals')
    } catch (error) {
        console.log(error.message)
        return res.render('crystals/new', { errorMessage: error.message })
    }
})  

//crystals/index
router.get('/', async (req, res) => {
    const allCrystals = await Crystal.find()
    return res.render('crystals/index', { crystals: allCrystals })
})

//crystals/show
router.get('/:crystalId', async (req, res) => {
    try {
        const crystalId = req.params.crystalId 
        const foundCrystal = await Crystal.findById(crystalId)
        if (!foundCrystal) throw new Error('Crystal not found.')
        return res.render('crystals/show', { crystal: foundCrystal })
    } catch (error) {
        return res.render('error', { errorMessage: error.message})
    }
})

//crystals/delete
router.delete('/:crystalId', async (req, res) => {
    try {
        const crystalId = req.params.crystalId
        const deletedCrystal = await Crystal.findByIdAndDelete(crystalId)
        if (!deletedCrystal) throw new Error('Crystal not found.')
        return res.redirect('/crystals')
    } catch (error) {
        console.log(error.message)
    }
})

//crystals/edit
router.get('/:crystalId/edit', async (req, res) => {
    const crystalId = req.params.crystalId
    const foundCrystal = await Crystal.findById(crystalId);
    return res.render('crystals/edit', {crystal: foundCrystal })
})

//crystals/update
router.put('/:crystalId', async (req, res) => {
    const crystalId = req.params.crystalId
    await Crystal.findByIdAndUpdate(crystalId, req.body)
    return res.redirect(`/crystals/${crystalId}`)
})

module.exports = router;