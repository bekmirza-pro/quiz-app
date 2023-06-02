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

export class GameController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const games = await storage.game.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                games
            },
            message: message('game_getAll_200', lang)
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const game = await storage.game.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                game
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const game = await storage.game.create({ ...req.body, creator: res.locals.id })

        res.status(201).json({
            success: true,
            data: {
                game
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const game = await storage.game.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                game
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const game = await storage.game.findOne(req.body.game)

            await storage.game.delete(req.params.id)
      
            res.status(400).json({
                success: false,
                data: null
            })
        
    })
}
