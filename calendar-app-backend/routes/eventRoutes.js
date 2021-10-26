import express from "express"
const router = express.Router();
import Events from '../models/event.js'


router.get('/events', (req, res) => {
    Events.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

router.post('/events', (req, res) => {
    const event = req.body;
    Events.create(event, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

router.delete('/events/:id', (req, res) => {
    const id = req.params.id
    Events.findByIdAndDelete(id)
    .then((data) => {
        if (data) {
            res.status(204).send()
        } else {
            res.status(404).send()
        }
    }).catch((err) => {
        res.status(500).send(err)
    })
})

router.patch('/events/:id', (req, res) => {
    const id = req.params.id
    const updateData = req.body
    Events.findByIdAndUpdate(id, updateData)
    .then((data) => {
        if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send()
        }
    }).catch((err) => {
        res.status(500).send(err)
    })
})

export default router;
