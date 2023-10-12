const express = require('express')
const router = express.Router()
const IssueCategory = require('../models/IssueCategory')
const jwt = require('jsonwebtoken')
const Manager = require('../models/Manager')

router.get('/issues/categories', async (req, res) => {
    try{
        const categories = await IssueCategory.find({})
        let jwt_access_token = req.cookies.jwt_token
        let decoded = jwt.verify(jwt_access_token,process.env.JWT_SECRET_KEY)
        let manager = await Manager.findOne({ _id: decoded.id })

        return res.status(200).render('issues/categories',{
            categories: categories,
            isAdmin: decoded.role === 'admin',
            permissions: manager.permissions
        })
    }catch(err){
        return res.status(500).render('errors/internal')
    }
})

module.exports = router