const express = require('express')
const router = express.Router()
const Manager = require('../models/Manager')
const jwt = require('jsonwebtoken')

router.get('/managers', async (req, res) => {
    try {
        let managers = await Manager.find({})

        return res.status(200).render('managers/index', { 
            managers
         })
    }catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
})

router.get('/managers/create', async (req, res) => {
    return res.render('managers/create')
})

router.get('/managers/:id/update', async (req, res) => {
    try{
        let { id } = req.params
        let manager = await Manager.findById(id)
        console.log(manager);
        console.log(manager.permissions);
        return res.render('managers/update', {
            manager,
            managerPermissions: JSON.stringify(manager.permissions)
        })
    }catch(e){
        console.log(e.message);
        ret = res.status(500).json({message: e.message});
    }
})

router.get('/managers/dashboard', async (req, res) => {
    try{
        let jwt_token = req.cookies.jwt_token
        let decoded = jwt.verify(jwt_token,process.env.JWT_SECRET_KEY)

        let manager = await Manager.findOne({ _id: decoded.id })
        let permissions = manager.permissions

        return res.render('managers/dashboard',{
            permissions
        })
    }catch(e){

    }
})

module.exports = router