import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IGame extends Document {
    _id: string
    host_id:string
    pin:number
    quiz:string
    game_status: boolean
    players_answered:number
    question_number: number
    question_status: boolean
}

const GameSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    host_id:{
        type:String
    },
    pin:{
        type: Number
    },
    quiz: {
        type: String
    },
    game_status: {
        type: Boolean
    },
    players_answered:{
        type: Number
    },
    question_number:{
        type: Number
    },
    question_status:{
        type:Boolean
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<IGame>('Game', GameSchema)
