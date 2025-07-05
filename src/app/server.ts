

import { Server } from 'http';
import { app } from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;

async function main() {

    try {

        await mongoose.connect('mongodb+srv://todoapp:todoapp@cluster0.toqnk.mongodb.net/books-app?retryWrites=true&w=majority&appName=Cluster0')
        server = app.listen(PORT, () => {
            console.log(`App islistening on por : ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();