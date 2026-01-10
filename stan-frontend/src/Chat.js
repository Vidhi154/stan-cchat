import { useState, useEffect } from "react";
import { sendMessage } from "./api";
import "./style.css";

function Chat() {
  const [userName, setUserName] = useState("");
  const [started, setStarted] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [chatList, setChatList] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);

  useEffect(() => {
    if (userName) {
      const data = localStorage.getItem(userName);
      setChatList(data ? JSON.parse(data) : []);
    }
  }, [userName]);

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
    if (!input) return;

    const newMsgs = [...messages, { sender: "user", text: input }];
    setMessages(newMsgs);

    const reply = await sendMessage(userName.toLowerCase(), input);

    const finalMsgs = [...newMsgs, { sender: "bot", text: reply }];
    setMessages(finalMsgs);
    setInput("");

    if (currentChatIndex === null) {
      setChatList([...chatList, finalMsgs]);
      setCurrentChatIndex(chatList.length);
    } else {
      const updated = [...chatList];
      updated[currentChatIndex] = finalMsgs;
      setChatList(updated);
    }
  };

  const newChat = () => {
    setMessages([]);
    setCurrentChatIndex(null);
  };

  const loadChat = (i) => {
    setMessages(chatList[i]);
    setCurrentChatIndex(i);
  };

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

  return (
    <div className="app-layout">

      {/* Sidebar */}
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

      {/* Chat Area */}
      <div className="chat-area">

        <div className="chat-header">Nova AI</div>

        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.sender}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>

      </div>
    </div>
  );
}

export default Chat;
