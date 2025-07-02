import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const askGranite = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/ibm-granite/granite-3.3-8b-instruct",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.generated_text || "No response.";
  } catch (err) {
    console.error("Granite API Error:", err.message);
    return "Error getting response from Granite.";
  }
};
