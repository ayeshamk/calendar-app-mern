import express from "express"
import mongoose from 'mongoose'
import config from 'dotenv'
import Cors from 'cors'

import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js'
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


app.use(eventRoutes);
app.use(userRoutes);


app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
