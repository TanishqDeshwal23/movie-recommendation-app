import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const getRecommendations = async () => {
    if (!input) return alert("Please enter a movie preference");

    setLoading(true);
    setNote("");
    setMovies([]);

    try {
      const res = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      setMovies(data.movies || []);
      if (data.note) setNote(data.note);
    } catch (error) {
      alert("Failed to connect to backend");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🎬 Movie Recommendation App</h1>

      <input
        type="text"
        placeholder="e.g. action movies with strong female lead"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={getRecommendations}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {note && <p className="note">{note}</p>}

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
