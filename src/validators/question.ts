import Joi, { string } from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class QuestionValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    createSchema = Joi.object({
        category: Joi.string().required(),
        questions: Joi.array().required(),
        timeout: Joi.string()
    })

    updateSchema = Joi.object({
        category: Joi.string().required(),
        questions: Joi.array().required(),
        timeout: Joi.string()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)

        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
