
import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IUser extends Document {
    _id: string
    name: string
    email: string
    password: string
    type: string
    register_date: Date
}

const UserSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: { 
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    type: {
        type: String,
        default: 'user'
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IUser>('User', UserSchema)
