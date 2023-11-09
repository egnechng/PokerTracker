import express from "express"
import './config.js'
import mongoose from 'mongoose'
import { GameSession } from './models/sessionModel.js'
import sessionRoutes from './routes/sessionRoutes.js'
import cors from 'cors'

const app = express()

// middleware to parse body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// CORS Policy (Cross-Origin Resource Sharing)
// middleware for handling CORS policy
// app.use(cors())

app.use(cors(
    {   
        // TODO: change url to front end link
        origin: '',
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }
))
// route middleware
app.use('/sessions', sessionRoutes)

app.get('/', (req, res) => {
    res.send('Poker Tracker!')
})

/*
app.get('/add', (req, res) => {
    // temporary to test
    res.sendFile(new URL('index.html', import.meta.url).pathname);
}) */

// console.log(process.env.MONGODB_URI)
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.')
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server listening on port ${process.env.PORT || 3000}`)
        })
    })
    .catch((e) => {
        console.error('Connection error', e.message)
    })


