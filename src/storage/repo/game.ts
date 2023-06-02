import { IGame } from '../../models/Game'

export interface IGameAllResponse {
    payloads: IGame[]
    count: number
}

export interface GameRepo {
    find(query: Object): Promise<IGame[]>
    findOne(query: Object): Promise<IGame>
    create(payload: IGame): Promise<IGame>
    update(id: string, payload: IGame): Promise<IGame>
    delete(id: string): Promise<IGame>
}
