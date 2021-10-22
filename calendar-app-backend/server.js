import express from "express"
import mongoose from 'mongoose'
import { createReadStream } from "node:fs"
import Events from './models/event.js'

const connection_url = process.env.DB_URL
const app = express()
const port = process.env.PORT || 8001

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.get('/events', (req, res) => {
    
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



app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
