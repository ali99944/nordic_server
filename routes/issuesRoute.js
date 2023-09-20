const express = require('express');
const router = express.Router();
const IssueNotification = require('../models/IssueNotification')
const Issue = require('../models/Issue')
const admin = require('../utils/firebase');
const { sendAlertSMS } = require('../utils/sms_service')


router.get('/issues/complete', async (req, res) => {
    try{
        let issues = await Issue.find({
            status: 'incomplete'
        }).populate({
            path: 'machine',
            ref: 'Machine'
        })
        console.log(issues);
        return res.status(200).json(issues)
    }catch(err){
        return res.status(500).json(err.message)
    }
})

router.get('/issues/current', async (req, res) => {
    try{
        let issues = await Issue.find({
            status: 'complete'
        }).populate({
            path: 'machine',
            ref: 'Machine'
        })

        return res.status(200).json(issues)
    }catch(err){
        return res.status(500).json(err.message)
    }
})


router.post('/issues', async (req, res) => {
    try{
        const {
            boardNumber,
            notes,
            id
        } = req.body

        const message = {
            data: {
                boardNumber,
                notes,
                type: 'machine',
                id:id,
            },
            topic: 'nordic', // Replace with the topic you want to use
          };
          
          let response = await admin
            .messaging()
            .send(message)

            console.log('Message sent:', response);
            const now = new Date();
            const localDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            const localDateString = localDate.toISOString().split('T')[0];

            const issueNotification = new IssueNotification({
                title: 'Machine Issue',
                body: 'Issue in machine X12',
                description: ``,
                date: localDateString,
                fullDate: localDate.toDateString(),
            })

            await issueNotification.save()
            const issue = new Issue({
                title: 'Machine Issue in machine X12',
                description: 'Located in zone Rute1 in Location 12th street of X12 road',
                notes: notes ?? null,
                date: localDateString,
                machine: id 
            })

            await issue.save()

                // await sendAlertSMS({
                //     text: "Message sent",
                //     to: `+201150421159`
                // })
            await Machine.updateOne({
                _id:id,
            },{ status: 'inactive' })

            return res.json({ 
                message: 'Message sent successfully'
             })

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: err.message});
    }
})
module.exports = router;
