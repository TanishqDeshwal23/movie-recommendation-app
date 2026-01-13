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
    } catch (err) {
      console.error("Failed to fetch history");
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      setMovies(data.movies || []);
      if (data.note) setNote(data.note);

      // refresh history after search
      fetchHistory();
    } catch (err) {
      alert("Backend not reachable");
    }

    setLoading(false);
  };

  // load history on first page load
  useEffect(() => {
    fetchHistory();
  }, []);

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

      {movies.length > 0 && (
        <>
          <h2>🎥 Recommendations</h2>
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </>
      )}

      <hr />

      <h2>📜 Search History</h2>

      {history.length === 0 && <p>No searches yet.</p>}

      {history.map((item) => (
        <div key={item.id} className="history-card">
          <strong>{item.user_input}</strong>

          <ul>
            {item.recommended_movies
              .split("\n")
              .map((movie, index) => (
                <li key={index}>{movie}</li>
              ))}
          </ul>

          <small>{new Date(item.timestamp).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
