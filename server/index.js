import express from "express"
import './config.js'
import mongoose from 'mongoose'
import sessionRoutes from './routes/sessionRoutes.js'
import cors from 'cors'

const app = express()

// middleware to parse body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// middleware for handling CORS policy
//app.use(cors())

app.use(cors(
    {   
        // TODO: change url to front end link
        origin: ['https://poker-tracker-xi.vercel.app'],
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }
))


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome To Poker Tracker');
})

// route middleware
app.use('/sessions', sessionRoutes)

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


