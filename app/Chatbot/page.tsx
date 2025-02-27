"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");

    // Reference for the chat container to auto-scroll
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput(""); // Clear input immediately after sending

        try {
            const response = await axios.post("http://localhost:5000/api/ask-gemini", { message: input });
            const botReply = response.data.reply;

            setMessages([...newMessages, { sender: "bot", text: botReply }]);
        } catch (error) {
            setMessages([
                ...newMessages,
                { sender: "bot", text: "Sorry, I couldn't connect to the medical assistant. Please try later." }
            ]);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center py-10">
            <div className="bg-white border border-gray-300 w-full max-w-3xl rounded-xl shadow-lg overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-pink-500 text-white font-semibold text-lg p-4 text-center">
                    Pregnancy & Women's Health Assistant
                </div>

                {/* Chat Area - Scrollable container */}
                <div 
                    ref={chatContainerRef} 
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50 max-h-[500px]"
                    style={{ scrollbarWidth: 'thin' }} // optional for Firefox
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`p-3 max-w-sm rounded-lg break-words ${
                                    msg.sender === "user"
                                        ? "bg-pink-500 text-white"
                                        : "bg-white border border-gray-300"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200 flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about pregnancy, periods, fertility..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
