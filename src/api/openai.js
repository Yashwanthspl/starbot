import axios from "axios";

export const getGPTResponse = async (message) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o", // or "gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are a helpful and empathetic mental health assistant." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI error:", error);
    return "Sorry, something went wrong while contacting GPT.";
  }
};