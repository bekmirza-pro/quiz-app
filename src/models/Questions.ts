import { string } from 'joi'
import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IQuestion extends Document {
    _id: string
    creator: string
    category: string
    question: string[]
    images: string[]
    timeout: number
}

const QuestionSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    creator: {
        type: String,
        ref: 'User'
    },
    category: {
        type: String
    },
    questions: [{
        question:{type:String},
        answers:{
            a:{type:String},
            b:{type:String},
            c:{type:String},
            d:{type:String},
        },
        correct:{type:String},
        image: [
            {
                type: String
            }
        ]
    }],
    timeout: {
        type: Number
    }
})

export default mongoose.model<IQuestion>('Question', QuestionSchema)
