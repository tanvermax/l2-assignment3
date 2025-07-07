import express, { Application, Request, Response } from 'express';
import { Book } from './models/book_model';
import { Borrow } from './models/borrow_model';




export const app: Application = express();

app.use(express.json());

// 1 no  Create Book
app.post("/api/books", async (req: Request, res: Response) => {
    const data = new Book({
        title: "The Theory of dark knight",
        author: "Stephen house of  dark knight",
        gener: "HISTORY",
        isbn: "805512431230163",
        description: "An overview of cosmology and black house of  dark knight.",
        copies: 80,
        available: true,
    })
    await data.save();
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data
    })
})
// 2 no Get All Books
app.get("/api/books", async (req: Request, res: Response) => {


    const bookgener = req.query.gener;
    const bookCreate = req.query.createdAt === "asc" ? 1 : -1;
    let bookLimit = Number(req.query.limit) || 10;
    // console.log(req.query);

    const filter: any = {};
    if (bookgener) {
        filter.gener = bookgener;
    }
    const data = await Book.find(filter)
        .sort({ createdAt: bookCreate })
        .limit(bookLimit)

    res.status(201).json({
        success: true,
        message: "Book recive successfully",
        data
    })
})
// 3 Get Book by ID
app.get('/api/books/:bookId', async (req: Request, res: Response) => {

    const bookid = req.params.bookId;

    const data = await Book.findById(bookid);

    res.status(201).json({
        success: true,
        message: "Book data by id match successfully",
        data
    })
})
// 4. Update Book
// PUT /api/books/:bookId
app.put('/api/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const Updatedbody = req.body;

    console.log(req.body);

    const data = await Book.findByIdAndUpdate(bookId, Updatedbody, { new: true, runValidators: true });
    res.status(201).json({
        success: true,
        message: "Book data Updated successfully",
        data
    })
})
// 5. Delete Book
app.delete('/api/books/:bookId', async (req: Request, res: Response) => {

    const bookId = req.params.bookId;

    console.log(req.body);

    const data = await Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book data deleted successfully",
        data
    })
})


app.post('/api/borrow', async (req: Request, res: Response) => {
    try {

        const { book: bookId, quantity } = req.body;
        console.log(req.body);

        const finalBook = await Book.hashQuyantity(bookId, Number(quantity));

        const data = await Borrow.create(req.body);

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            // book: finalBook,
            data: data
        });

    } catch (error) {
        console.error(error);
         res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});


app.get('/api/borrow', async (req: Request, res: Response) => {
    // const boooks = req.query;


    try {
        const data = await Borrow.aggregate([

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

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching borrowed book summary",

        });
    }


})


app.get('/', (req: Request, res: Response) => {
    res.send('welcome to Book store');
})