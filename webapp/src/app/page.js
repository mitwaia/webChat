"use client";
import { useState, useEffect } from "react";
import ChatBox from "@/components/ChatBox";
import PromptEditor from "@/components/PromptEditor";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant.");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("openai-api-key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSend = async (userMessage) => {
    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages: updatedMessages, systemPrompt }),
    });

    const data = await res.json();
    if (data.reply) {
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } else {
      setMessages([...updatedMessages, { role: "assistant", content: "❌ Error from OpenAI" }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 p-4 border-r border-gray-800">
        <ChatBox messages={messages} onSend={handleSend} />
      </div>
      <div className="w-full md:w-1/3 p-4 bg-gray-900">
        <PromptEditor
          prompt={systemPrompt}
          setPrompt={setSystemPrompt}
          apiKey={apiKey}
          setApiKey={setApiKey}
        />
      </div>
    </div>
  );
}
