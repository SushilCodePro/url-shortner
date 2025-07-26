import { nanoid } from "nanoid"
import urlSchema from '../model/shorturl.model.js';

export const createShortUrl=async (req, res) => {
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

    res.status(201).json({ message: "Short URL created",ans:process.env.APP_URL+ short_url });
  } catch (error) {
    console.error("Error in /api/create:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

