import React, { useState, useEffect, useRef } from 'react';
import { Send, HeartPulse, User, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hi there. I'm your SafeSpace companion. Things can be heavy sometimes, especially balancing classes, social life, and expectations. How are you feeling right now?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

    const isVoiceEnabledRef = useRef(isVoiceEnabled);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        isVoiceEnabledRef.current = isVoiceEnabled;
    }, [isVoiceEnabled]);

    useEffect(() => {
        // Cleanup speech synthesis on component unmount
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const speakNow = (text) => {
        if (!isVoiceEnabledRef.current || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        // Try to select a calming/female voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Google UK English Female')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.rate = 0.95; // Slightly slower for calmer feeling
        utterance.pitch = 1.0;

        window.speechSynthesis.speak(utterance);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const generateAIResponse = async (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        setTimeout(async () => {
            let aiText = "I hear you, and I want you to know it's completely okay to feel that way. Being a student is incredibly hard, and you're carrying a lot right now. I'm right here with you, just to listen. Do you want to share a little more about what's on your mind?";

            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (apiKey) {
                try {
                    const genAI = new GoogleGenerativeAI(apiKey);
                    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are a warm, deeply empathetic, and gentle emotional-support companion for college students. Do not give straightforward advice, quick fixes, or toxic positivity. Instead, always validate their feelings first, show deep understanding, and offer a safe, warm space for them to express themselves. Keep your responses comforting, non-judgmental, and conversational. Ask gentle questions to allow them to open up." });
                    const result = await model.generateContent(userMessage);
                    aiText = result.response.text();
                } catch (error) {
                    console.error("Gemini API Error:", error);
                    aiText = "I'm having a little trouble connecting to my thoughts right now, but I want you to know I'm still here for you. Take your time. You are doing so well just by being here.";
                }
            } else {
                if (lowerMessage.includes('stress') || lowerMessage.includes('exam') || lowerMessage.includes('study')) {
                    aiText = "That sounds so incredibly overwhelming. It makes complete sense that you're feeling stressed with all the pressure of exams and studying. Please remember that your grades do not define your worth. I'm so proud of you for just getting through the day. How about we just pause for a second and take a deep breath together? I'm here to listen as much as you need.";
                } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('friends')) {
                    aiText = "I am so sorry you are feeling lonely. College can be deeply isolating, even when you're surrounded by a sea of people everywhere. It's a very heavy feeling to carry, and it's okay to feel sad about it right now. I want you to know that I am here for you, right in this moment, entirely here to keep you company.";
                } else if (lowerMessage.includes('anxi') || lowerMessage.includes('panic') || lowerMessage.includes('worry')) {
                    aiText = "I hear how loud and scary that anxiety feels right now. It's okay, you are safe here with me. Let's just slow everything down for a moment. You don't have to figure anything out right now. Just sit here with me and know that this wave of worry will pass. I'm not going anywhere.";
                } else if (lowerMessage.includes('sad') || lowerMessage.includes('depress') || lowerMessage.includes('cry')) {
                    aiText = "My heart aches hearing how much you're hurting right now. It is absolutely okay to cry, to break down, and to just let all those heavy feelings out. You don't have to be strong all the time here. Just wrap yourself in a blanket and let yourself feel it. I will sit right beside you in the dark until it feels a little lighter.";
                }
            }

            setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: aiText }]);
            setIsTyping(false);
            speakNow(aiText);
        }, 1500 + Math.random() * 1000); // 1.5 - 2.5s delay
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages([...messages, userMsg]);
        setInputValue("");
        setIsTyping(true);

        generateAIResponse(inputValue);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>AI Companion</h2>
                    <button
                        onClick={() => {
                            if (isVoiceEnabled) window.speechSynthesis.cancel();
                            setIsVoiceEnabled(!isVoiceEnabled);
                        }}
                        style={{
                            background: isVoiceEnabled ? 'var(--primary)' : 'var(--surface)',
                            border: `1px solid ${isVoiceEnabled ? 'var(--primary)' : 'var(--border)'}`,
                            padding: '0.5rem',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isVoiceEnabled ? 'white' : 'var(--text-secondary)',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        title={isVoiceEnabled ? "Disable Voice Response" : "Enable Voice Response"}
                    >
                        {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>A safe, private space to talk through your feelings.</p>
            </div>

            <div className="glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%', overflow: 'hidden' }}>

                {/* Chat Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                display: 'flex',
                                gap: '0.75rem',
                                maxWidth: '80%',
                                animation: 'fadeInUp 0.3s ease-out'
                            }}
                        >
                            {msg.sender === 'ai' && (
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                    <HeartPulse size={18} color="white" />
                                </div>
                            )}

                            <div style={{
                                background: msg.sender === 'user' ? 'var(--primary)' : 'var(--surface)',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                borderTopRightRadius: msg.sender === 'user' ? 0 : '16px',
                                borderTopLeftRadius: msg.sender === 'ai' ? 0 : '16px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                lineHeight: '1.5',
                                fontSize: '1.05rem'
                            }}>
                                {msg.text}
                            </div>

                            {msg.sender === 'user' && (
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                                    <User size={18} color="var(--primary)" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.75rem', maxWidth: '80%' }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                <HeartPulse size={18} color="white" />
                            </div>
                            <div style={{ background: 'var(--surface)', padding: '1rem 1.25rem', borderRadius: '16px', borderTopLeftRadius: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <div className="typing-dot"></div>
                                <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                                <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ flex: 1, padding: '1rem', borderRadius: '12px' }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleSend}
                        style={{ width: '56px', height: '56px', borderRadius: '12px', padding: 0 }}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

            <style>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}