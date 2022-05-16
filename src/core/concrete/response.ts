import { IResponse } from '../types/response'

export class Response<T> implements IResponse<T> {
    data: T
    constructor(response: T) {
        this.data = response
    }
}
