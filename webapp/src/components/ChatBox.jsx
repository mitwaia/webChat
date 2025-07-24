import { useState } from "react";
import Message from "./Message";

export default function ChatBox({ messages, onSend }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[70vh]">
                {messages.map((msg, idx) => (
                    <Message key={idx} role={msg.role} content={msg.content} />
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none"
                    placeholder="Type your message..."
                />
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700">
                    Send
                </button>
            </form>
        </div>
    );
}
