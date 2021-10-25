import express from "express"
import mongoose from 'mongoose'
import Events from './models/event.js'
import config from 'dotenv'
import Cors from 'cors'
import e from "express"
config.config()

const connection_url = process.env.MONGO_URL || ''
const app = express()
const port = process.env.PORT || 8001

app.use(express.json())
app.use(Cors())


mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("==== DATABASE CONNECTED ====");
}).catch((err) => {
    throw err
})
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

function createEventId() {
    return String(eventGuid++)
}

app.get('/events', (req, res) => {
    Events.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/events', (req, res) => {
    const event = req.body;
    Events.create(event, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.delete('/events/:id', (req, res) => {
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

app.patch('/events/:id', (req, res) => {
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

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
