# Notes App

A full-stack note-taking application built with Express, MongoDB, React, and Tailwind CSS. Features user authentication via Clerk and a responsive UI with Radix components.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Library**: Radix UI
- **HTTP Client**: Axios
- **Authentication**: Clerk
- **Linting**: ESLint

## Project Structure

```
NoteApp/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server entry point
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection config
│   │   ├── models/
│   │   │   └── Notes.js       # Note schema definition
│   │   └── routes/
│   │       └── notes.js       # API routes for notes
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main app component
    │   ├── main.jsx           # React entry point
    │   ├── components/
    │   │   ├── NewNoteDialog.jsx    # Create note dialog
    │   │   ├── NoteCard.jsx         # Individual note display
    │   │   ├── pages/
    │   │   │   └── Dashboard.jsx    # Main dashboard page
    │   │   └── ui/                  # Radix UI components
    │   ├── lib/
    │   │   ├── api.js         # API client
    │   │   └── utils.js       # Utility functions
    │   └── index.css          # Global styles
    ├── vite.config.js
    ├── tailwind.config.js
    ├── package.json
    └── jsconfig.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Clerk account

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/NoteApp?appName=Cluster0
ALLOWED_ORIGIN=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Authentication (Clerk)

This project uses Clerk for user authentication on the frontend. Clerk provides prebuilt UI components for sign-in, sign-out and user management. Below are the basic steps to set up Clerk for local development:

1. Create an account at https://clerk.com and create a new application.
2. In your Clerk application settings:
    - Add `http://localhost:5173` to the **Allowed Origins** and **Redirect URLs** for local development.
    - Copy the **Publishable Key** (used in the frontend) and the **Secret Key** (used if you verify tokens on the backend).
3. In the frontend, add the publishable key to `.env.local`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXX
```

4. (Optional) If you want your backend to verify Clerk session tokens or enforce authentication server-side, add the Clerk secret key to the backend `.env` as `CLERK_SECRET_KEY` and implement token verification using Clerk's server SDK or JWT verification. See Clerk docs for examples: https://docs.clerk.dev

Notes:
- The frontend uses Clerk React components (`SignInButton`, `UserButton`, `SignedIn`, `SignedOut`) already present in the app.
- Currently the app's frontend passes the authenticated user's ID in API requests; backend enforcement is not implemented by default. For production apps you should verify tokens on the server to ensure requests are authenticated.


## Features

- **User Authentication**: Sign in/sign out with Clerk
- **Create Notes**: Add new notes with title and content
- **View Notes**: See all your notes in a responsive grid layout
- **Edit Notes**: Update existing notes
- **Delete Notes**: Remove notes you no longer need
- **User-Specific**: Each user can only see their own notes

## API Endpoints

All endpoints require the user to be authenticated.

- `GET /api/notes` - Get all notes for the authenticated user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note by ID
- `DELETE /api/notes/:id` - Delete a note by ID

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `ALLOWED_ORIGIN` - Frontend origin for CORS

### Frontend (.env.local)
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key for authentication

## Running the Application

To run both frontend and backend simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Then visit `http://localhost:5173` in your browser.

## Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own purposes.
