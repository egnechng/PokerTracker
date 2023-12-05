import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    // console.log('here register')
    try {
        const { username, email, password } = req.body
        console.log('body', req.body)
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Required field(s) missing' })
        }
        // check user exists
        const existingEmail = await User.findOne({ email })
        const existingUser = await User.findOne({ username })

        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already registered' })
        }
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        })

        res.status(201).json({ 
            message: 'User registered successfully',
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.log('Registration error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username }) 
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        res.status(200).json({ 
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.log('Login error:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default router