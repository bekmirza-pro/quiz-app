import { PlayerRepo, IPlayerAllResponse } from '../repo/player'
import Player, { IPlayer } from '../../models/Player'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class PlayerStorage implements PlayerRepo {
    private scope = 'storage.player'

    async find(query: Object): Promise<IPlayer[]> {
        try {
            let player = await Player.find({ ...query })

            return player
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IPlayer> {
        try {
            let player = await Player.findOne({ ...query })

            if (!player) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'player_404')
            }

            return player
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IPlayer): Promise<IPlayer> {
        try {
            let player = await Player.create(payload)

            return player
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IPlayer): Promise<IPlayer> {
        try {
            let player = await Player.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!player) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'player_404')
            }

            return player
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let player = await Player.findByIdAndDelete(id)

            if (!player) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'player_404')
            }

            return player
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
