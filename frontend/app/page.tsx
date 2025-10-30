'use client';

import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Microphone from "@/components/microphone";

type Message = {
    id: number;
    sender: "bot" | "user";
    text: string;
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [chatId, setChatId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const createChat = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/chat/create", {
                    method: "POST",
                });
                const data = await res.json();
                setChatId(data.chat_id);
            } catch (err) {
                console.error("Error creating chat:", err);
            }
        };
        createChat();
    }, []);

    const handleSend = async () => {
        if (!input.trim() || !chatId) return;

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/chat?prompt=${encodeURIComponent(input)}&chat_id=${chatId}`
            );
            const data = await res.json();

            const botMessage: Message = {
                id: Date.now() + 1,
                sender: "bot",
                text: data.response,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("Error sending message:", err);
        } finally {
            setLoading(false);
        }
    };

    const hasNoMessages = messages.length === 0;

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#212121] flex-col gap-8 -mt-16">
            {hasNoMessages && (
                <h2 className="text-2xl text-white">What are we cooking today?</h2>
            )}

            {!hasNoMessages && (
                <div className="flex flex-col w-full max-w-xl rounded-2xl p-4 h-[60vh] overflow-y-auto">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex mb-3 ${
                                msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-[70%] text-white text-base ${
                                    msg.sender === "user"
                                        ? "bg-[#303030] rounded-br-none"
                                        : "bg-[#444444] rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="text-gray-400 text-sm text-center mt-2">
                            Bot is typing...
                        </div>
                    )}
                </div>
            )}

            <div className="flex">
                <div className="rounded-l-[4rem] bg-[#303030]">
                    <button className="flex items-center justify-center p-3 focus:outline-none">
                        <IoMdAdd className="text-4xl text-white" />
                    </button>
                </div>

                <input
                    className="bg-[#303030] w-164 focus:outline-none text-lg text-[rgba(255,255,255,0.8)] placeholder:text-[rgba(255,255,255,0.4)] px-4"
                    type="text"
                    placeholder="Talk to me!"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <div className="rounded-r-[4rem] bg-[#303030] flex items-center justify-center pr-2">
                    <Microphone onTranscriptChange={setInput} />
                </div>
            </div>
        </div>
    );
}
