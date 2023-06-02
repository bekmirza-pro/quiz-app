import { QuestionRepo, IQuestionAllResponse } from '../repo/question'
import Question, { IQuestion } from '../../models/Questions'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class QuestionStorage implements QuestionRepo {
    private scope = 'storage.question'

    async find(query: Object): Promise<IQuestion[]> {
        try {
            let questions = await Question.find({ ...query })
            // .populate(['creator', 'category'])
            return questions
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IQuestion> {
        try {
            let question = await Question.findOne({ ...query })
            // .populate(['creator', 'category'])
            if (!question) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'question_404')
            }

            return question
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IQuestion): Promise<IQuestion> {
        try {
            let question = await Question.create(payload)

            return question
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IQuestion): Promise<IQuestion> {
        try {
            let question = await Question.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!question) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'question_404')
            }

            return question
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async updateMany(id: string, payload: Object): Promise<Object> {
        try {
            let questions = await Question.updateMany({ creator: id }, payload)
            if (!questions) {
                logger.warn(`${this.scope}.update failed to updateMany`)
                throw new AppError(404, 'question_404')
            }
            return questions
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let question = await Question.findByIdAndDelete(id)

            if (!question) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'sample_404')
            }

            return question
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
