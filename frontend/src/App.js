import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/history");
      const data = await res.json();
      setHistory(data.history || []);
    } catch {
      console.error("Failed to load history");
    }
  };

  const getRecommendations = async () => {
    if (!input.trim()) {
      alert("Please enter a movie preference");
      return;
    }

    setLoading(true);
    setMovies([]);
    setNote("");

    try {
      const res = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      setMovies(data.movies || []);
      if (data.note) setNote(data.note);
      fetchHistory();
    } catch {
      alert("Backend not reachable");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container">
      <h1>🎬 Movie Recommendation App</h1>

      <input
        type="text"
        placeholder="Describe the kind of movies you like..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={getRecommendations} disabled={loading}>
        {loading ? "Finding movies..." : "Get Recommendations"}
      </button>

      {note && <p className="note">{note}</p>}

      {!loading && movies.length === 0 && (
        <p className="empty">
          Enter a preference to get movie recommendations 🎥
        </p>
      )}

      {movies.length > 0 && (
        <>
          <h2>🎥 Recommended Movies</h2>
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div key={index} className="movie-card">
                🎬 {movie}
              </div>
            ))}
          </div>
        </>
      )}

      <hr />

      <h2>📜 Search History</h2>

      {history.length === 0 && <p className="empty">No searches yet.</p>}

      {history.map((item) => (
        <div key={item.id} className="history-card">
          <strong>{item.user_input}</strong>
          <ul>
            {item.recommended_movies.split("\n").map((movie, i) => (
              <li key={i}>{movie}</li>
            ))}
          </ul>
          <small>{new Date(item.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
