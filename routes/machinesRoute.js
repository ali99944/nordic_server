const express = require('express')
const router = express.Router()
const Machine = require('../models/Machine')
const qrcode = require('qr-image')
const fs = require('fs')


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
        let machine = await Machine.findOne({_id:req.params.id})
        console.log(machine);
        return res.status(200).json(machine)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})


const admin = require('../utils/firebase');
const { sendAlertSMS } = require('../utils/sms_service')

router.post('/machines/:id/notify', async (req, res) => {
    try{
        const {
            boardNumber,
            notes,
            issue,
        } = req.body

        const {id} = req.params

        const message = {
            data: {
                boardNumber,
                notes,
                issue,
                type: 'machine',
                click_action: "FLUTTER_NOTIFICATION_CLICK",
                id:id,
            },
            notification: {
                title: 'notification title',
                body: 'notification body',
            },
            android: {
                notification: {
                    title: 'android notification title',
                    body: 'android notification body',
                    channel_id:'Nordic_Channel_2'
                }
            },
            topic: 'nordic', // Replace with the topic you want to use
          };
          
          admin
            .messaging()
            .send(message)
            .then(async (response) => {
              console.log('Message sent:', response);
                // await sendAlertSMS({
                //     text: "Message sent",
                //     to: `+201150421159`
                // })
            })
            .catch((error) => {
              console.error('Error sending message:', error);
            });

            await Machine.updateOne({
                _id:id,
            },{ status: 'inactive' })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})

router.post('/machines', async (req, res) => {
    try{
        const { serial,zone,shiftNumber } = req.body
        let machine = new Machine({
            serial,
            zone,
            shiftNumber,
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

module.exports = router