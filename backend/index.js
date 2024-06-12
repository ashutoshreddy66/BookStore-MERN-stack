import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('MERN Stack Dev')
});

//Route for saving a new book

app.post('/books', async (request, response)=>{
    try{
        if(!request.body.title|| !request.body.author || !request.body.publishYear){
            return response.status(400).send({message : 'Send all required fields : title, author, publishyear'});
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book)
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

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
