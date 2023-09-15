const express = require('express')
const router = express.Router()
const Machine = require('../models/Machine')
const qrcode = require('qr-image')


router.get('/machines', async (req, res) => {
    try{
        let machines = await Machine.find()
        return res.status(200).json(machines)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

router.get('/machines/:id', async (req, res) => {
    try{
        let machine = await Machine.find({_id:req.params.id})
        return res.status(200).json(machine)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

router.post('/machines', async (req, res) => {
    try{
        const { serial,zone } = req.body.number
        let machine = new Machine({
            serial,
            zone
        })
        await machine.save()

        console.log(`klage.ryl.no/machines/${machine._id}`);
        const qrCodeImage = qrcode.image(`klage.ryl.no/machines/${machine._id}`, { type: 'png' });
        await Machine.updateOne({ _id: machine._id },{
            qrcode: qrCodeImage
        })



        return res.status(200).json(machine)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

router.put('/machines/:id', async (req, res) => {
    try{
        let machine = await Machine.updateOne({_id:req.params.id}, req.body)
        return res.status(200).json(machine)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

router.delete('/machines/:id', async (req, res) => {
    try{
        let isDeleted = await Machine.deleteOne({_id:req.params.id})
        return res.status(200).json(isDeleted)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

module.exports = router