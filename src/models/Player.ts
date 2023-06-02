import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IPlayer extends Document {
    _id: string
    game: string
    host_id:string
    pin:number
    player_id:string
    nickname:string
    answer:string
    score:number
    streak:number
    rank:number
    last_correct:boolean
    total_correct:boolean
}

const PlayerSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    game: {
        type: String,
        ref: 'Game'
    },
    host_id: {
        type: String
    },
    pin:{
        type:Number
    },
    player_id:{
        type:String
    },
    nickname:{
        type:String
    },
    answer:{
        type:String
    },
    score:{
        type:Number
    },
    rank:{
        type:Number
    },
    last_correct:{
        type:Boolean
    },
    total_correct:{
        type:Boolean
    }
})

export default mongoose.model<IPlayer>('Player', PlayerSchema)
