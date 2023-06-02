import { GameRepo, IGameAllResponse } from '../repo/game'
import Game, { IGame } from '../../models/Game'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class GameStorage implements GameRepo {
    private scope = 'storage.game'

    async find(query: Object): Promise<IGame[]> {
        try {
            let game = await Game.find({ ...query })

            return game
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IGame> {
        try {
            let game = await Game.findOne({ ...query })

            if (!game) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'game_404')
            }

            return game
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IGame): Promise<IGame> {
        try {
            let game = await Game.create(payload)

            return game
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IGame | object): Promise<IGame> {
        try {
            let game = await Game.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!game) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'game_404')
            }

            return game
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let game = await Game.findByIdAndDelete(id)

            if (!game) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'sample_404')
            }

            return game
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
