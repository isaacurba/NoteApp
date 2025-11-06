import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    userId:{
        type: String,
        index: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        default: "",
    }
}, {timestamps: true})

notesSchema.index({ userId: 1, createdAt: -1 })

const Notes = mongoose.model("Notes", notesSchema)

export default Notes;