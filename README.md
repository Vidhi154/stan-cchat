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

📌 Demo Video: https://drive.google.com/file/d/1QuCCuKnHrdZiIznPIP2e8GPvrWpdvZyY/view?usp=sharing

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

📌 Sample Conversation

<img width="1919" height="961" alt="image" src="https://github.com/user-attachments/assets/2f29c31f-5412-4dce-8274-6159ae584343" />

<img width="1507" height="474" alt="image" src="https://github.com/user-attachments/assets/9b09568e-0551-42ff-b8c4-6e5d264781fe" />

<img width="1568" height="693" alt="image" src="https://github.com/user-attachments/assets/eb7f1125-7d3f-48ed-824c-3ead7288cbd8" />

<img width="1566" height="855" alt="image" src="https://github.com/user-attachments/assets/beba3d08-66dd-4fe5-84ba-76e4f42630d9" />

<img width="1909" height="752" alt="image" src="https://github.com/user-attachments/assets/11264f1d-b189-469e-b473-31e2e768596e" />

<img width="1914" height="953" alt="image" src="https://github.com/user-attachments/assets/e3d1495b-0c48-4301-8d83-787d2d5d657d" />


<img width="1917" height="947" alt="image" src="https://github.com/user-attachments/assets/591d25e7-23b9-4c74-a4fb-b466e2f35e3f" />





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

---
mongodb-
<img width="1835" height="550" alt="image" src="https://github.com/user-attachments/assets/6f0ea152-594d-48bf-84ae-80612b650e61" />

<img width="1816" height="469" alt="image" src="https://github.com/user-attachments/assets/090fadc5-d9cc-4e49-a4dd-105f9f1a2315" />

<img width="1784" height="494" alt="image" src="https://github.com/user-attachments/assets/6e2e403f-ba37-4159-a0a5-b9f367cb968d" />

---

Environment Variables

Create .env file in backend:

MONGO_URI=your_mongodb_url
GEMINI_KEY=your_gemini_api_key
---


📄 Documentation :



