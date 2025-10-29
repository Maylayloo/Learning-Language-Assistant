'use client';

import { IoMdAdd } from "react-icons/io";
import React, { useState } from "react";
import Microphone from "@/components/microphone";

type Message = {
    id: number;
    sender: "bot" | "user";
    text: string;
};

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        const newMessage: Message = { id: Date.now(), sender: "user", text: input };
        setMessages(prev => [...prev, newMessage]);
        setInput("");
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
                                        : "rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
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
