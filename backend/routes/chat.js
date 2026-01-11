const express = require("express");
const Chat = require("../models/Chat");
const askGemini = require("../llm/gemini");
const { getUser, updateMemory } = require("../memory/userMemory");

const router = express.Router();

/* ---------------- TONE DETECTOR ---------------- */
function detectTone(text) {
  const msg = text.toLowerCase();

  if (msg.includes("please") || msg.includes("explain")) return "formal";
  if (msg.includes("bro") || msg.includes("lol") || msg.includes("hey")) return "casual";
  if (msg.includes("sad") || msg.includes("low") || msg.includes("depressed")) return "empathetic";
  if (msg.includes("roast") || msg.includes("joke")) return "playful";

  return "friendly";
}

/* ---------------- GREETING DIVERSITY ---------------- */
const greetings = [
  "Hey there 😊",
  "Hello! Nice to see you!",
  "Hi! How’s your day going?",
  "Hey! What’s new?",
  "Hellooo 👋"
];

function isGreeting(msg) {
  return ["hi","hello","hey","hii","what's up","whats up"].includes(msg.toLowerCase().trim());
}

/* ---------------- CONTEXT REWRITE ---------------- */
function rewriteMessage(message, tone, context) {
  if (message.split(" ").length > 3) return message;

  if (tone === "playful" && context.toLowerCase().includes("roast"))
    return `Continue roasting ${message}`;

  if (context.toLowerCase().includes("suggest"))
    return `Continue suggesting about ${message}`;

  return message;
}

/* ---------------- CHAT ROUTE ---------------- */
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message)
      return res.status(400).json({ reply: "Missing input." });

    /* FAST greeting handling */
    if (isGreeting(message)) {
      const reply = greetings[Math.floor(Math.random() * greetings.length)];
      return res.json({ reply });
    }

    const user = await getUser(userId);
    const tone = detectTone(message);

    /* Fetch only last 3 chats → token optimized */
    let recentChats = await Chat.find({ userId })
  .sort({ timestamp: -1 })
  .limit(3);

recentChats = recentChats.reverse();

    const conversationContext = recentChats
      .map(c => `User: ${c.message}\nNova: ${c.reply}`)
      .join("\n");

    const rewrittenMessage = rewriteMessage(message, tone, conversationContext);

    /* ---------------- PROMPT ---------------- */
    const prompt = `
IDENTITY:
Your name is Nova.
You are a friendly digital companion.
You are NOT an AI model.
You never mention companies or training data.

BEHAVIOR:
- Stay in character always.
- Continue conversation naturally.
- Never hallucinate memories.
- If unsure, say you don’t remember.

TONE: ${tone}

FORMAT:
- Each sentence on new line.
- Use "*" before each line except greeting.
- Max 6 lines.

DIVERSITY:
- Never repeat same wording.

CONTEXT:
${conversationContext}

USER MEMORY:
${user.memory.slice(-4).join(", ")}

USER PREFERENCES:
${user.preferences.join(", ")}

User message:
${rewrittenMessage}

Reply like a real human friend.
`;

    let reply;

    try {
      reply = await askGemini(prompt);
    } catch (err) {
      if (err.response?.status === 429)
        return res.json({ reply: "Nova is resting 😴. Try again shortly." });

      return res.json({ reply: "Nova had a small thinking error." });
    }

    await Chat.create({ userId, message, reply });
    await updateMemory(user, message);

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "Nova encountered a server issue." });
  }
});

module.exports = router;
