import axios from "axios";

export async function sendMessage(data) {
  const res = await axios.post("http://localhost:5000/chat", data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.data;
}
