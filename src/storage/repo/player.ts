import { IPlayer } from '../../models/Player'

export interface IPlayerAllResponse {
    payloads: IPlayer[]
    count: number
}

export interface PlayerRepo {
    find(query: Object): Promise<IPlayer[]>
    findOne(query: Object): Promise<IPlayer>
    create(payload: IPlayer): Promise<IPlayer>
    update(id: string, payload: IPlayer): Promise<IPlayer>
    delete(id: string): Promise<IPlayer>
}
