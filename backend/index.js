import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin : 'http://localhost:3000',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('MERN Stack Dev')
});

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log('MongoDB connected!');
        app.listen(PORT, () => {
            console.log(`App is listening to PORT : ${PORT}`)
        })
    })
    .catch(() =>{
        console.log('failed to connect to mongo db')
    })
