🎬 AI Movie Recommendation App

A modern, AI-powered movie recommendation platform with persistent search history and a polished UI.

🌟 Overview

AI Movie Recommendation App is a full-stack web application that suggests movies based on natural language user preferences such as genres, moods, or descriptions (e.g. “sci-fi movies with time travel”).

The application demonstrates:

AI integration

Backend API design

Database persistence

Frontend UX/UI design

Real-world engineering practices

This project was built as a technical assignment and goes beyond the base requirements with additional features and UI enhancements.

✨ Key Features
🎥 Smart Movie Recommendations

Accepts free-text movie preferences

Generates 3–5 relevant movie suggestions

Uses OpenAI API (with graceful fallback handling)

💾 Persistent Search History

Stores user input and recommendations in SQLite

Displays previous searches in a clean UI

Demonstrates full CRUD-style backend interaction

🎨 Modern UI & UX

Gradient animated background

Ambient glow effects

Card-based layout

Responsive design

Clean, minimal, and professional look

⚙️ Robust Backend Architecture

Fastify-based REST API

Secure environment variable handling

Graceful error handling and fallback logic

🧠 Tech Stack
Frontend

React

Custom CSS (no UI frameworks)

Responsive & animated UI

Backend

Node.js

Fastify

OpenAI API

Database

SQLite (lightweight & persistent)

📁 Project Structure
movie-recommendation-app/
│
├── backend/
│   ├── server.js          # Fastify server & API routes
│   ├── db.js              # SQLite database configuration
│   ├── movies.db          # SQLite database file
│   └── .env               # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Global styling & effects
│   └── package.json
│
├── .gitignore
└── README.md

🔄 Application Flow

User enters a movie preference in the frontend.

Frontend sends a POST request to the backend.

Backend processes the request and calls OpenAI.

Movie recommendations are generated.

User input and recommendations are stored in SQLite.

Frontend displays results and updates search history.

🔐 OpenAI Integration & Fallback Logic

OpenAI API integration is fully implemented.

During development, a mock fallback response is used when OpenAI quota or billing is unavailable.

This ensures:

The app never crashes

The full workflow remains demo-ready

No paid API access is required to evaluate functionality

⚠️ Once OpenAI billing is enabled, the app automatically switches to live AI recommendations without code changes.
## 🌐 Live Demo

- **Frontend (Vercel):**[ https://your-vercel-app.vercel.app](https://movie-recommendation-app-liart-zeta.vercel.app/)
- **Backend (Render):** https://movie-recommendation-app-yzf9.onrender.com/
