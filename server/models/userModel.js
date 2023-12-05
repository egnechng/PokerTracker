import mongoose from 'mongoose'

// Schema for a User
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

// register model
export const User = mongoose.model('User', UserSchema)