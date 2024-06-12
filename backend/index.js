import express, { request, response } from "express";
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

// get all books
app.get('/books', async (request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({count: books.length, data : books})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

// get one book
app.get('/books/:id', async (request, response)=>{
    try {
        const {id} = request.params;
        const book = await Book.findById(id);
        if(!book) return response.status(404).send({message: "Book not found!"})
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

// update a book
app.put('/books/:id', async (request, response) =>{
    try {
        if(!request.body.title|| !request.body.author || !request.body.publishYear){
            return response.status(400).send({message : 'Send all required fields : title, author, publishyear'}); 
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result) return response.status(404).send({message: 'Book not found!'});
        return response.status(200).send({message: 'Book updated succesfully!'});
        } catch (error) {
       console.log(error.message);
       response.status(500).send({message : error.message});
    }
})

// delete a book
app.delete('/books/:id', async (request, response) =>{
    try {
        // if(!request.body.title|| !request.body.author || !request.body.publishYear){
        //     return response.status(400).send({message : 'Send all required fields : title, author, publishyear'}); 
        // }
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) return response.status(404).send({message: 'Book not found!'});
        return response.status(200).send({message: 'Book deleted succesfully!'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
})

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
