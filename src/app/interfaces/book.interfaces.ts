import { Model } from "mongoose"

export interface IBooks {
    title: string;
    author: string;
    gener: string;

    isbn: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
    description: string;
    copies: number;
    available: boolean;
    // copiesofbook(quantity: number): Promise<IBooks>;

}

// export interface BookBorrowMethod extends Model<IBooks> {
//     copiesofbook(quantity: number): number
// }


export  interface bookStaticMethod extends Model<IBooks> {
    hashQuyantity(bookId: string, quantity: number): Promise<IBooks>
}