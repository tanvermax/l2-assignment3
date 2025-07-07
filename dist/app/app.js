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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("./models/book_model");
const borrow_model_1 = require("./models/borrow_model");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// 1 no  Create Book
exports.app.post("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new book_model_1.Book({
        title: "The Theory of dark knight",
        author: "Stephen house of  dark knight",
        gener: "HISTORY",
        isbn: "805512431230163",
        description: "An overview of cosmology and black house of  dark knight.",
        copies: 80,
        available: true,
    });
    yield data.save();
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data
    });
}));
// 2 no Get All Books
exports.app.get("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookgener = req.query.gener;
    const bookCreate = req.query.createdAt === "asc" ? 1 : -1;
    let bookLimit = Number(req.query.limit) || 10;
    // console.log(req.query);
    const filter = {};
    if (bookgener) {
        filter.gener = bookgener;
    }
    const data = yield book_model_1.Book.find(filter)
        .sort({ createdAt: bookCreate })
        .limit(bookLimit);
    res.status(201).json({
        success: true,
        message: "Book recive successfully",
        data
    });
}));
// 3 Get Book by ID
exports.app.get('/api/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookid = req.params.bookId;
    const data = yield book_model_1.Book.findById(bookid);
    res.status(201).json({
        success: true,
        message: "Book data by id match successfully",
        data
    });
}));
// 4. Update Book
// PUT /api/books/:bookId
exports.app.put('/api/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const Updatedbody = req.body;
    console.log(req.body);
    const data = yield book_model_1.Book.findByIdAndUpdate(bookId, Updatedbody, { new: true, runValidators: true });
    res.status(201).json({
        success: true,
        message: "Book data Updated successfully",
        data
    });
}));
// 5. Delete Book
exports.app.delete('/api/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    console.log(req.body);
    const data = yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book data deleted successfully",
        data
    });
}));
exports.app.post('/api/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity } = req.body;
        console.log(req.body);
        const finalBook = yield book_model_1.Book.hashQuyantity(bookId, Number(quantity));
        const data = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            // book: finalBook,
            data: data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}));
exports.app.get('/api/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const boooks = req.query;
    try {
        const data = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            { $unwind: "$bookInfo" },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    }
                }
            }
        ]);
        res.status(201).json({
            success: true,
            message: "Book recive successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching borrowed book summary",
        });
    }
}));
exports.app.get('/', (req, res) => {
    res.send('welcome to Book store');
});
