const express = require('express')
const router = express.Router()
const Machine = require('../models/Machine')
const IssueNotification = require('../models/IssueNotification')
const Issue = require('../models/Issue')
const qrcode = require('qr-image')
const fs = require('fs')
const admin = require('../utils/firebase');



router.get('/machines', async (req, res) => {
    try{
        let machines = await Machine.find({}).populate({
            path: 'zone',
            ref: 'Zone'
        })
        return res.status(200).json(machines)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

router.get('/machines/:id', async (req, res) => {
    try{
        let machine = await Machine.findOne({_id:req.params.id}).populate({
            path: 'zone',
            ref: 'Zone'
        })
        console.log(machine);
        return res.status(200).json(machine)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})


router.post('/machines', async (req, res) => {
    try{
        const { serial,zone,zoneLocation } = req.body
        let machine = new Machine({
            serial,
            zone,
            zoneLocation,
        })
        await machine.save()

        console.log(`klage.ryl.no/machines/${machine._id}`);
        const qrCodeImage = qrcode.image(`klage.ryl.no/machines/${machine._id}`, { type: 'png' });
        // Generate a unique filename
        const filename = `qrcode_${Date.now()}.png`;
        const filePath = `public/qrcodes/${filename}`;

        const qrStream = qrCodeImage.pipe(fs.createWriteStream(filePath));

        qrStream.on('finish', () => {
            console.log(`QR Code saved as ${filename}`);
        });

        await Machine.updateOne({ _id: machine._id },{
            qrcode: process.env.BASE_URL  + `qrcodes/${filename}`
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

router.post('/machines/:id/activate', async (req, res) => {
    try{
        let machine = await Machine.findOne({_id:req.params.id}).populate({
            path: 'zone',
            ref: 'Zone'
        })

        let machineActivation = await Machine.updateOne({
            _id:req.params.id
        },{
            status: 'active'
        })

        if(machineActivation){
            console.log('machine is activated again');
        }

        await Issue.updateMany({machine: req.params.id}, {
            status: 'complete'
        })

        const now = new Date();
        const localDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        const localDateString = localDate.toISOString().split('T')[0];

        const issueNotification = new IssueNotification({
            title: `Machine ${machine.serial} status updated`,
            body: `Machine Located in zone ${machine.zone.name} in Location ${machine.zoneLocation} was fixed`,
            date: localDateString,
            fullDate: localDate.toDateString(),
            type: 'activation'
        })

        await issueNotification.save()

        const message = {
            data: {
                title: `Machine ${machine.serial} status updated`,
                body: `Machine located in zone ${machine.zone.name} in Location ${machine.zoneLocation} was fixed`,
                type: 'issue_closed',
                id:req.params.id,
            },
            topic: 'nordic', // Replace with the topic you want to use
          };
          
          let response = await admin
            .messaging()
            .send(message)

        return res.status(200).json(true)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

module.exports = router