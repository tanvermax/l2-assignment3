import { Types } from "mongoose"


export interface IBorrows {
    book: Types.ObjectId
    quantity: number
    dueDate: Date
}


