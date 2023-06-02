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

export class PlayerController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const players = await storage.player.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                players
            },
            message: message('player_getAll_200', lang)
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const player = await storage.player.findOne(req.query)

        res.status(200).json({
            success: true,
            data: {
                player
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const player = await storage.player.create(req.body)

        if (req.file) {
            const image = `images/${req.file.fieldname}-${uuidv4()}`

            await sharp(req.file.buffer)
                .png()
                .toFile(path.join(__dirname, '../../../uploads', `${image}.png`))
        }

        res.status(201).json({
            success: true,
            data: {
                player
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const player = await storage.player.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                player
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.player.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
