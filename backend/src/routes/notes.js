import express from "express";
const router = express.Router();
import Notes from "../models/Notes";

// GET /api/notes?userId=abc123 -> List (optionally filter by userId) => READ
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { userId } : {};
  try {
    const notes = await Notes.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// POST  /api/notes   -> Create (optionally attach userId )  => CREATE
router.post("/", async (req, res) => {
  const { userId, title, content } = req.body;
  if (!title)
    return res.status(400).json({ message: "Please give us a title" });
  try {
    const newNote = new Notes({ userId, title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});
