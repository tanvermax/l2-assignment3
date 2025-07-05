import { bookStaticMethod, IBooks } from './../interfaces/book.interfaces';
import { model, Schema } from "mongoose";


const bookSchema = new Schema<IBooks, bookStaticMethod>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        gener: {
            type: String, required: true,
            enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY",]

        },
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        description: { type: String, required: false },
        copies: { type: Number, required: true },
        available: { type: Boolean, required: true, default: true },

    }, {
    versionKey: false,
    timestamps: true,


}

)

bookSchema.static("hashQuyantity", async function (bookId: string, quantity: number) {


    console.log(bookId,quantity);
    if (!bookId || isNaN(quantity) || quantity <= 0) {
        throw new Error("Invalid book ID or quantity");
    }


    const book = await this.findById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    if (book.copies < quantity) {
        throw new Error(`Only ${book.copies} copies available`);
    }
    book.copies = book.copies - quantity;

    if (book.copies === 0) {
        book.available = false;
    }

    await book.save();
    return book;
})


export const Book = model<IBooks, bookStaticMethod>("Books", bookSchema)