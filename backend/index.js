const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const ollamaRes = await axios.post('http://localhost:11434/api/chat', {
      model: "mistral",
      messages: [
        {
          role: "system",
          content: "You are a helpful and empathetic mental health assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = ollamaRes.data.message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Ollama API error:', error?.response?.data || error.message);
    res.status(500).json({ reply: "Sorry, something went wrong with the AI response." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});