import { IQuestion } from '../../models/Questions'

export interface IQuestionAllResponse {
    payloads: IQuestion[]
    count: number
}

export interface QuestionRepo {
    find(query: Object): Promise<IQuestion[]>
    findOne(query: Object): Promise<IQuestion>
    create(payload: IQuestion): Promise<IQuestion>
    update(id: string, payload: IQuestion): Promise<IQuestion>
    updateMany(id: string, payload: Object): Promise<Object>
    delete(id: string): Promise<IQuestion>
}
