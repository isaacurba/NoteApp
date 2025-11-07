import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  connectedDB  from "./config/db.js";
import notesRouter from "./routes/notes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

connectedDB();

app.get("/", (req, res) => {
  res.send("NOTE API UP AND RUNNING");
});

app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}!`);
});
