const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine')

router.get('/issues/complete', async (req, res) => {
    try{
        let issues = await Machine.find({
            status: 'active'
        }).populate({
            path: 'zone',
            ref: 'Zone'
        })
        
        return res.status(200).json(issues)
    }catch(err){
        return res.status(500).json(err.message)
    }
})

router.get('/issues/current', async (req, res) => {
    try{
        let issues = await Machine.find({
            status: 'inactive'
        }).populate({
            path: 'zone',
            ref: 'Zone'
        })

        return res.status(200).json(issues)
    }catch(err){
        return res.status(500).json(err.message)
    }
})

module.exports = router;