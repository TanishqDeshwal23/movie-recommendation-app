🎬 AI Movie Recommendation App

A modern, AI-powered movie recommendation platform that understands natural language preferences and delivers intelligent movie suggestions with a polished, animated UI and persistent search history.

Example input:
“Sci-fi movies with time travel”
“Feel-good movies for weekends”

🌟 Overview

AI Movie Recommendation App is a full-stack web application that recommends movies based on free-text user preferences such as genres, moods, or descriptions.

This project was built as a technical assignment and intentionally goes beyond the base requirements, showcasing:

🤖 AI integration

🧠 Backend API design

💾 Database persistence

🎨 Frontend UX/UI engineering

🏗️ Real-world software architecture practices

✨ Key Features
🎥 Smart Movie Recommendations

Accepts natural language input

Generates 3–5 relevant movie suggestions

Uses OpenAI API for AI-powered recommendations

Includes graceful fallback logic when AI quota/billing is unavailable

💾 Persistent Search History

Stores user prompts & recommendations in SQLite

Displays past searches in a clean UI

Demonstrates full backend CRUD-style interaction

🎨 Modern UI & UX

Animated gradient background

Subtle ambient glow effects

Card-based layout

Fully responsive design

Clean, minimal & professional aesthetic

Built using custom CSS (no UI frameworks)

⚙️ Robust Backend Architecture

Fastify-based REST API

Secure environment variable handling

Centralized error handling

Safe fallback responses to prevent crashes

🧠 Tech Stack
Frontend

⚛️ React

🎨 Custom CSS (no external UI libraries)

📱 Responsive & animated UI

Backend

🟢 Node.js

⚡ Fastify

🤖 OpenAI API

Database

🗄️ SQLite (lightweight & persistent)

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
│   │   └── App.css        # Global styling & animations
│   └── package.json
│
├── .gitignore
└── README.md

🔄 Application Flow

User enters a movie preference in the frontend

Frontend sends a POST request to the backend

Backend processes the request and calls OpenAI

AI generates movie recommendations

User input & recommendations are stored in SQLite

Frontend displays results and updates search history

🔐 OpenAI Integration & Fallback Logic

OpenAI API is fully integrated

During development or demo:

A mock fallback response is returned if:

API quota is exceeded

Billing is unavailable

✅ Benefits

App never crashes

Entire workflow remains demo-ready

No paid API access required for evaluation

⚠️ Once OpenAI billing is enabled, the app automatically switches to live AI responses without any code changes.

🌐 Live Demo

Frontend (Vercel)
👉 https://movie-recommendation-app-liart-zeta.vercel.app/

Backend (Render)
👉 https://movie-recommendation-app-yzf9.onrender.com/

🚀 Why This Project Stands Out

✔ Real-world AI integration
✔ Clean backend architecture
✔ Persistent data storage
✔ Thoughtful UI/UX design
✔ Production-style error handling
✔ Recruiter-friendly, demo-ready setup
