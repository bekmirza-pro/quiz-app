import { PlayerStorage } from './mongo/player'
import { UserStorage } from './mongo/user'
import { GameStorage } from './mongo/game'
import { QuestionStorage } from './mongo/question'

interface IStorage {
    player:PlayerStorage
    user: UserStorage
    game: GameStorage
    question: QuestionStorage
}

export let storage: IStorage = {
    player: new PlayerStorage(),
    user: new UserStorage(),
    game: new GameStorage(),
    question: new QuestionStorage()
}
