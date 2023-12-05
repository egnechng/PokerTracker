import mongoose from 'mongoose'

// Schema for a Game Session
const SessionSchema = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User' 
        },
        gameType: { type: String, required: true, },
        blinds: { type: String, required: true, },
        buyIn: { type: Number, required: true },
        cashOut: { type: Number, required: true },
        date: { type: Date, required: true },
        duration: { type: Number,required: false },
        location: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

// register model
export const GameSession = mongoose.model('GameSession', SessionSchema)