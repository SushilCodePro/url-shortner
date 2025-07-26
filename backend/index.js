import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';


import router from './src/routes/short_url.route.js';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());  

// Routes
app.get('/', (req, res) => {
    console.log('Response sent');
    res.send('Hi Vedant');
});

app.use("/api/create/", router);


connectDB();
// Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});