import { useState, useEffect, useRef } from "react";
import { sendMessage } from "./api";
import "./style.css";

function Chat() {
  const [userName, setUserName] = useState("");
  const [started, setStarted] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [chatList, setChatList] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load user chat history
  useEffect(() => {
    if (userName) {
      const data = localStorage.getItem(userName);
      setChatList(data ? JSON.parse(data) : []);
    }
  }, [userName]);

  // Save chat history
  useEffect(() => {
    if (userName) {
      localStorage.setItem(userName, JSON.stringify(chatList));
    }
  }, [chatList, userName]);

  const handleStart = () => {
    if (!userName) return;
    setStarted(true);
    setMessages([]);
    setCurrentChatIndex(null);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    const newMsgs = [...messages, { sender: "user", text: userText }];
    setMessages([...newMsgs, { sender: "bot", text: "Nova is typing..." }]);

    try {
      const res = await sendMessage({
        userId: userName.toLowerCase(),
        message: userText
      });

      let reply = res.reply || "No response";

      reply = reply
        .replace(/\*\*/g, "")
        .replace(/\n+/g, "\n")
        .split("\n")
        .map(l => l.trim())
        .filter(l => l)
        .join("\n");

      const finalMsgs = [...newMsgs, { sender: "bot", text: reply }];
      setMessages(finalMsgs);

      if (currentChatIndex === null) {
        setChatList([...chatList, finalMsgs]);
        setCurrentChatIndex(chatList.length);
      } else {
        const updated = [...chatList];
        updated[currentChatIndex] = finalMsgs;
        setChatList(updated);
      }

    } catch (err) {
      alert("Too many requests. Please wait 1 minute.");
      setMessages(newMsgs);
    }

    setLoading(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const newChat = () => {
    setMessages([]);
    setCurrentChatIndex(null);
  };

  const loadChat = (i) => {
    setMessages(chatList[i]);
    setCurrentChatIndex(i);
  };

  // ---------- LOGIN SCREEN ----------
  if (!started) {
    return (
      <div className="login-screen">
        <h2>Nova AI 🤖</h2>
        <input
          placeholder="Enter your name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <button onClick={handleStart}>Start Chat</button>
      </div>
    );
  }

  // ---------- CHAT UI ----------
  return (
    <div className="app-layout">

      <div className="sidebar">
        <h3>{userName}</h3>

        {chatList.map((c, i) => (
          <div
            key={i}
            className={`chat-item ${currentChatIndex === i ? "active" : ""}`}
            onClick={() => loadChat(i)}
          >
            Chat {i + 1}
          </div>
        ))}

        <button className="new-chat-btn" onClick={newChat}>+ New Chat</button>
      </div>

      <div className="chat-area">

        <div className="chat-header">Nova AI</div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.sender}`}>
              {m.text}
            </div>
          ))}

          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat;
