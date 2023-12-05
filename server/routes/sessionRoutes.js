import express from 'express'
import { GameSession } from '../models/sessionModel.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// protect
router.use(authMiddleware)

// Route to Add a new session
router.post('/', async (req, res) => {
    try {
        // authenticated user
        const authenticatedUser = req.user

        if (!authenticatedUser) {
            return res.status(401).send({ message: 'User not authenticated' })
        }

        if (!req.body.gameType || !req.body.blinds || !req.body.duration || !req.body.location || 
            !req.body.buyIn || !req.body.cashOut || !req.body.date 
        ) { 
            return res.status(400).send({ message: "Required field(s) missing."})
        }
        // save new gameSession
        const newGameSession = {
            user: authenticatedUser._id,
            gameType: req.body.gameType,
            blinds: req.body.blinds,
            duration: req.body.duration,
            location: req.body.location,
            buyIn: req.body.buyIn,
            cashOut: req.body.cashOut,
            date: req.body.date
        }

        const gameSession = await GameSession.create(newGameSession)
        console.log(gameSession)
        return res.status(201).send({ gameSession })
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }
})


// Route for Getting all sessions from db
router.get('/', async (req, res) => {
    try {
        // authenticated user
        const authenticatedUser = req.user

        if (!authenticatedUser) {
            return res.status(401).send({ message: 'User not authenticated' })
        }
        const sessions = await GameSession.find({user: authenticatedUser._id})
        // return 200 and send books to client
        return res.status(200).json({
            count: sessions.length,
            data: sessions
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).send({ message: error.message })
    }
})

// Route for getting sepcific session by id
router.get('/:id', async (req, res) => {
    try {
        const authenticatedUser = req.user

        if (!authenticatedUser) {
            return res.status(401).send({ message: 'User not authenticated' })
        }

        const { id } = req.params;
        const session = await GameSession.findById(id)

        // make sure user owns this session
        if (session.user.toString() !== authenticatedUser._id.toString()) {
            return res.status(401).send({ message: 'User does not own this session.' })
        }
        // return 200 and send books to client
        return res.status(200).json(session)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send({ message: error.message })
    }
})

// Route for updating a session
router.put('/:id', async (req, res) => {
    try {
        const authenticatedUser = req.user

        if (!authenticatedUser) {
            return res.status(401).send({ message: 'User not authenticated' })
        }

        if (!req.body.gameType || !req.body.blinds || !req.body.duration || !req.body.location || 
            !req.body.buyIn || !req.body.cashOut || !req.body.date 
        ) {
            return res.status(400).send({ message: "Required field(s) missing."})         
        }

        const { id } = req.params
        const session = await GameSession.findById(id)
        
        // make sure user owns this session
        if (session.user.toString() !== authenticatedUser._id.toString()) {
            return res.status(401).send({ message: 'User does not own this session.' })
        }

        // update seession
        const result = await GameSession.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).send({ message: `Session with id ${id} not found.`})
        } 
        return res.status(200).send({ message: 'Session updated successfully.'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Route for deleting a session
router.delete('/:id', async (req, res) => {
    try {
        const authenticatedUser = req.user

        if (!authenticatedUser) {
            return res.status(401).send({ message: 'User not authenticated' })
        }

        const { id } = req.params
        const session = await GameSession.findById(id)
        
        // make sure user owns this session
        if (session.user.toString() !== authenticatedUser._id.toString()) {
            return res.status(401).send({ message: 'User does not own this session' })
        }
        
        const result = await GameSession.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).send({ message: `Session with id ${id} not found.`})
        } 
        return res.status(200).send({ message: 'Session deleted successfully.'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router