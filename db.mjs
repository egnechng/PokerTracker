// import './config.mjs'
import mongoose from 'mongoose'
import argon2 from 'argon2'

// Schema for a Game Session
const SessionSchema = new mongoose.Schema({
    user: UserSchema,
    gameType: String,
    blinds: String,
    date: Date,
    profit: Number, 
    location: String
})

// Schema for a User
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String, // password hash
    sessionLogs: [SessionSchema]

})

// register model
mongoose.model('Session', SessionSchema)
mongoose.model('User', UserSchema)

// console.log(process.env.DSN)
mongoose.connect(process.env.DSN)