import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { message } from '../locales/get_message'
import Question from '../models/Questions'

export class QuestionController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang } = res.locals
        const { id } = req.params
        if (id) {
            req.query = {
                category: id
            }
        }

        const questions = await storage.question.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                questions
            },
            message: message('question_getAll_200', lang)
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const question = await storage.question.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                question
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let photo

        if (req.file) {
            photo = `images/${req.file.fieldname}-${uuidv4()}`

            await sharp(req.file.buffer)
                .png()
                .toFile(path.join(__dirname, '../../uploads', `${photo}.png`))
        }
        const question = await storage.question.create({
            ...req.body,
            creator: res.locals.id,
            images: `${photo}.png`
        })

        res.status(201).json({
            success: true,
            data: {
                question
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let photo
        let question

        if (req.file) {
            const questions = await Question.findById(req.params.id)

            if (`${questions?.images}` !== 'undefined') {
                await unlink(path.join(__dirname, '../../uploads', `${questions?.images}`))
            }

            photo = `images/${req.file.fieldname}-${uuidv4()}`

            await sharp(req.file.buffer)
                .png()
                .toFile(path.join(__dirname, '../../uploads', `${photo}.png`))

            question = await storage.question.update(req.params.id, {
                ...req.body,
                images: `${photo}.png`
            })
        } else {
            question = await storage.question.update(req.params.id, req.body)
        }

        res.status(200).json({
            success: true,
            data: {
                question
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const question = await Question.findById(req.params.id)

        if (`${question?.images}` !== 'undefined') {
            await unlink(path.join(__dirname, '../../uploads', `${question?.images}`))
        }

        await storage.question.delete(req.params.id)
        res.status(204).json({
            success: true,
            data: null
        })
    })
}
