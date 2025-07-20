import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());  // cors() is a function, so call it!

// Routes
app.get('/', (req, res) => {
    console.log('Response sent');
    res.send('Hi Vedant');
});

connectDB();
// Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});