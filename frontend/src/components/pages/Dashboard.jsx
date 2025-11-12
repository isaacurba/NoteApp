import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard";
import NewNoteDialog from "../NewNoteDialog";
// Fixed import path from '../lib/api' to '../../lib/api'
import { NotesAPI } from "../../lib/api";
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState("idle");
  const { user } = useUser();
  const [error, setError] = useState("");
  // Added missing frontendUserId - in a real app this should come from auth context
  const frontendUserId = user?.id;

  useEffect(() => {
    (async () => {
      try {
        setStatus("loading");
        // Pass userId to list function
        const data = await NotesAPI.list(frontendUserId);
        setNotes(data);
        setStatus("success");
      } catch (error) {
        setError(error.message);
        setStatus("error");
      }
    })();
  }, [frontendUserId]);

  async function createNote(payload) {
    // Include userId in payload
    const created = await NotesAPI.create({
      ...payload,
      userId: frontendUserId,
      userEmail: user?.primaryEmailAddress?.emailAddress
    });
    setNotes((prev) => [...created, ...prev]);
  }
  // saveNote definition is fine, it expects (id, payload)
  async function saveNote(id, payload) {
    const updated = await NotesAPI.update(id, {
      ...payload,
      userId: frontendUserId,
    });
    setNotes((prev) => prev.map((note) => (note._id === id ? updated : note)));
  }
  async function deleteNote(id) {
    // Pass userId to remove function
    await NotesAPI.remove(id, frontendUserId);
    setNotes((prev) => prev.filter((note) => note._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {user ? `${user.firstName}'s Notes` : "Your Notes"}
        </h2>
        <NewNoteDialog onCreate={createNote} />
      </div>

      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && notes.length === 0 && (
        <p>No notes yet. Create your first note!</p>
      )}

      <div className="grid gap-3">
               {" "}
        {notes.map((n) => (
          <NoteCard
            key={n._id}
            note={n}
            // ✅ FIX: Use (_, payload) to capture the second argument
            // (the draft object) passed from NoteCard, ignoring the redundant ID.
            onSave={(_, payload) => saveNote(n._id, payload)}
            onDelete={deleteNote}
          />
        ))}
             {" "}
      </div>
    </div>
  );
};

export default Dashboard;
