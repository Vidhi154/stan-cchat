# 🤖 Nova — Human-Like Conversational AI Chatbot  

> A memory-driven, context-aware, emotionally intelligent conversational AI built with Gemini 2.5 Flash.

![Node](https://img.shields.io/badge/Node.js-Backend-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Gemini](https://img.shields.io/badge/Gemini-2.5--Flash-blue)
![React](https://img.shields.io/badge/React-Frontend-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ Overview  

**Nova** is a human-like conversational AI chatbot designed to provide:

- Natural, emotionally engaging conversations  
- Context-aware tone adaptation  
- Long-term personalized memory  
- Identity consistency  
- Hallucination resistance  
- Cost-efficient AI inference  

This project demonstrates real-world **Conversational AI system design**, not just LLM usage.

---

🎥 Demo

📌 Demo Video: 

---

## 🚀 Features  

| Feature | Description |
|------|-------------|
| 🧠 Long-Term Memory | Remembers user name, interests, and facts |
| 🎭 Tone Adaptation | Matches user mood and style |
| 🔗 Context Continuity | Continues conversation naturally |
| 👤 Identity Consistency | Fixed persona (Nova) |
| 🚫 Hallucination Control | Never fabricates memories |
| 🎲 Response Diversity | Avoids repetitive replies |
| ⚡ Cost Efficient | Token-optimized Gemini 2.5 Flash |

---

## 🏗 Architecture  

User
  ↓
React Frontend
  ↓
Node.js + Express Backend
  ↓
Gemini 2.5 Flash API
  ↓
MongoDB (Memory + Chat History)

---

##🧠 Memory Strategy

Each user has a persistent MongoDB profile:
userId
name
preferences
memory


Memory rules:

Preferences are overwritten to avoid conflicts

Memory capped to last 10 items

Only last 4 memory items injected into prompt

---

## 🎭 Tone Detection

Tone is inferred dynamically using keyword-based rules:

| Input Keywords | Tone |
|---------------|------|
| please, explain | Formal |
| bro, lol, hey | Casual |
| sad, low | Empathetic |
| roast, joke | Playful |
| default | Friendly |

Nova adjusts response style based on detected tone.

---

## 🛡 AI Safety Principles

Nova is designed to:

- Never claim to be an AI model
- Never invent memories
- Admit uncertainty gracefully
- Avoid impossible real-world claims
- Maintain consistent identity
- Avoid hallucinated experiences

---

## ⚡ Performance Optimization

To reduce token usage and cost:

- Only last **3 chat messages** are sent to LLM
- Only last **4 memory facts** are injected
- Local greeting handling
- Short structured prompts
- Gemini **2.5 Flash** model for efficiency

---

## 🧪 Test Coverage

Nova is validated against:

✔ Long-Term Memory Recall  
✔ Context-Aware Tone Adaptation  
✔ Personalization Over Time  
✔ Response Naturalness & Diversity  
✔ Identity Consistency  
✔ Hallucination Resistance  
✔ Memory Stability  

---

## 🧩 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React |
| Backend | Node.js, Express |
| Database | MongoDB |
| LLM | Gemini 2.5 Flash |
| Deployment | Render / Vercel |

---

## ⚙️ Setup

### Clone Repository
```bash
git clone https://github.com/your-username/nova-chatbot.git
cd nova-chatbot

Backend Setup
cd backend
npm install
npm start

Frontend Setup
cd frontend
npm install
npm start
```

Environment Variables

Create .env file in backend:

MONGO_URI=your_mongodb_url
GEMINI_KEY=your_gemini_api_key
---


📄 Documentation :



