import mongoose, { model, Schema, Types } from "mongoose";
import {  IBorrows } from "../interfaces/borrow.interface";

const BorrowSchema = new Schema<IBorrows>({
    book: { type: mongoose.Schema.Types.ObjectId, ref:"book", required: true },
    quantity: { type: Number, require: true },
    dueDate: { type: Date, require: true },

},
    { timestamps: true });





export const Borrow = model<IBorrows>("Borrow", BorrowSchema);

// export const Book = model<IBooks>("Books", bookSchema)
