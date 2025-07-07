"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "please porive name"] },
    author: { type: String, required: true },
    gener: {
        type: String, required: true,
        enum: { values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY",],
            message: ""
        }
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: { type: String, required: false },
    copies: { type: Number, required: true, min: [0, 'Copies must be a positive number'] },
    available: { type: Boolean, required: true, default: true },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.static("hashQuyantity", function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(bookId, quantity);
        if (!bookId || isNaN(quantity) || quantity <= 0) {
            throw new Error("Invalid book ID or quantity");
        }
        const book = yield this.findById(bookId);
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
        yield book.save();
        return book;
    });
});
exports.Book = (0, mongoose_1.model)("Books", bookSchema);
