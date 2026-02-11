import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

app.post("/chat", async (req, res) => {
  const msg = req.body.message;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_KEY
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      messages: [{role:"user", content: msg}]
    })
  });

  const data = await r.json();
  res.json({ reply: data.choices[0].message.content });
});

app.listen(3000);
