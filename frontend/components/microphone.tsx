'use client';
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

interface MicrophoneProps {
    onTranscriptChange?: (text: string) => void;
}

const Microphone: React.FC<MicrophoneProps> = ({ onTranscriptChange }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (onTranscriptChange) {
            onTranscriptChange(transcript);
        }
    }, [transcript, onTranscriptChange]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const handleClick = async () => {
        if (listening) {
            await SpeechRecognition.stopListening();
        } else {
            await SpeechRecognition.startListening({
                continuous: true,
                interimResults: true,
            });
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={handleClick} className="flex items-center justify-center p-3 focus:outline-none cursor-pointer">
                {listening ? (
                    <FaMicrophoneSlash className="text-2xl text-white" />
                ) : (
                    <FaMicrophone className="text-2xl text-white" />
                )}
            </button>
        </div>
    );
};

export default Microphone;
