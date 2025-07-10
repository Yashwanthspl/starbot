import axios from "axios";

const GRANITE_API_URL = "http://localhost:3001/api/chat";

export const askGranite = async (message) => {
  try {
    const res = await axios.post(
      GRANITE_API_URL,
      { prompt: message }
    );
    return res.data.reply;
  } catch (error) {
    console.error("Granite API Error:", error?.response?.data || error.message);
    return "Sorry, something went wrong with the AI response.";
  }
};
  