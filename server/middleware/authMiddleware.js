import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token' })
    }

    try { 
        // get token from header
        token = req.headers.authorization.split(' ')[1]

        // verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        // get user from token
        req.user = await User.findById(decodedToken.id).select('-password')
        next()
    } catch (error) {
        console.log('Authentication error:', error)
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export default authMiddleware