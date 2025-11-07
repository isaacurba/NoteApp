import express from "express";
import Notes from "../models/Notes.js";

const app = express();
const router = express.Router();


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

// PUT /api/notes/:id UPDATE
router.put("/:id", async (req, res) => { 
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedNote = await Notes.findByIdAndUpdate(
    id,
    { $set: { title, content } },
    { new: true }
  );
  if (!updatedNote) return res.status(404).json({ message: "Note not found" });
  res.json(updatedNote);
});

// DELETE /api/notes/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Notes.findByIdAndDelete({ _id: id });
  if (!deletedNote) return res.status(404).json({ message: "Nothing there to delete" });
  res.json({ ok: true });
});

export default router;