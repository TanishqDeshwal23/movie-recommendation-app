require("dotenv").config();
console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);

const Fastify = require("fastify");
const cors = require("@fastify/cors");
const OpenAI = require("openai");
const db = require("./db");

const fastify = Fastify({ logger: true });

fastify.register(cors);
fastify.addContentTypeParser(
    "application/json",
    { parseAs: "string" },
    function (req, body, done) {
      try {
        const json = JSON.parse(body);
        done(null, json);
      } catch (err) {
        err.statusCode = 400;
        done(err, undefined);
      }
    }
  );
  

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check route
fastify.get("/", async () => {
  return { status: "Backend is running" };
});

// Movie recommendation route
fastify.post("/recommend", async (request, reply) => {
    console.log("REQUEST BODY:", request.body);

  const { userInput } = request.body;

  if (!userInput) {
    return reply.code(400).send({ error: "User input is required" });
  }

  try {
    const prompt = `
    Recommend 3 to 5 movies based on this preference:
    "${userInput}"
    Return only movie names in a bullet list.
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

    // Convert response to array
    const movies = movieText
      .split("\n")
      .map((m) => m.replace(/^-/, "").trim())
      .filter(Boolean);

    reply.send({ movies });
} catch (error) {
    console.error("OpenAI Error:", error.message);
  
    // Fallback movie list (used when OpenAI fails)
    const mockMovies = [
      "Mad Max: Fury Road",
      "Wonder Woman",
      "Atomic Blonde",
      "The Old Guard"
    ];
  
    reply.send({
      movies: mockMovies,
      note: "Mocked response because OpenAI quota is exceeded"
    });
  }
  
});

fastify.listen({ port: 5000 }, () => {
  console.log("Server running at http://localhost:5000");
});
