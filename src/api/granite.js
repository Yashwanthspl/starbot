import axios from "axios";

const GRANITE_API_URL = "http://localhost:8080/api/v1/chat/completions";

export const askGranite = async (message) => {
  try {
    const res = await axios.post(
      GRANITE_API_URL,
      {
        model: "granite3.2:8b", // Use the model you configured in Open WebUI
        messages: [
          {
            role: "system",
            content: "You are a helpful and empathetic mental health assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        // Add other parameters if needed (e.g., max_tokens, temperature)
      }
    );
    // Adjust this if the response format is different
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Granite API Error:", error?.response?.data || error.message);
    return "Sorry, something went wrong with the AI response.";
  }
};
  