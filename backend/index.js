import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import urlSchema from './src/model/shorturl.model.js';
import { nanoid } from "nanoid"

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

app.post("/api/create/", async (req, res) => {
  try {
    console.log('req in create:', req.body);

    const { url } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required" });

    const short_url = nanoid(7);

    const newUrl = new urlSchema({
      full_url: url,
      short_url: short_url
    });

    await newUrl.save();

    res.status(201).json({ message: "Short URL created", short_url });

  } catch (error) {
    console.error("Error in /api/create:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


connectDB();
// Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});