require("dotenv").config();

const Fastify = require("fastify");
const cors = require("@fastify/cors");
const OpenAI = require("openai");

const db = require("./db");

const fastify = Fastify({ logger: true });

// Enable CORS
fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
  });
  

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
fastify.get("/", async () => {
  return { status: "Backend is running" };
});

// =======================
// RECOMMEND MOVIES API
// =======================
fastify.post("/recommend", async (request, reply) => {
  const { userInput } = request.body || {};

  if (!userInput) {
    return reply.code(400).send({ error: "User input is required" });
  }

  try {
    const prompt = `
    Recommend 3 to 5 movies based on this preference:
    "${userInput}"
    Return only movie names in a list.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const movieText = response.choices[0].message.content;

    // Save to database
    db.run(
      "INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)",
      [userInput, movieText]
    );

    const movies = movieText
      .split("\n")
      .map((m) => m.replace(/^-/, "").trim())
      .filter(Boolean);

    reply.send({ movies });
  } catch (error) {
    console.error("OpenAI Error:", error.message);

    // Mock fallback (used when OpenAI quota is exceeded)
    const mockMovies = [
      "Mad Max: Fury Road",
      "Wonder Woman",
      "Atomic Blonde",
      "The Old Guard",
    ];

    // Save mock result to database
    db.run(
      "INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)",
      [userInput, mockMovies.join("\n")]
    );

    reply.send({
      movies: mockMovies,
      note: "Mocked response because OpenAI quota is exceeded",
    });
  }
});

// =======================
// SEARCH HISTORY API
// =======================
fastify.get("/history", (request, reply) => {
    db.all("SELECT * FROM recommendations", [], (err, rows) => {
      console.log("ROWS FROM DB:", rows);
  
      if (err) {
        return reply.code(500).send({ error: err.message });
      }
  
      reply.send({
        history: rows,
      });
    });
  });

  const PORT = process.env.PORT || 5000;

  fastify.listen({ port: PORT, host: "0.0.0.0" }, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
