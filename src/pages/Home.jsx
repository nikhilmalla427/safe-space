import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, MessageSquare, ShieldCheck, Quote, Wind } from 'lucide-react';

const QUOTES = [
    "You don't have to control your thoughts. You just have to stop letting them control you.",
    "Breathe, it's just a bad day, not a bad life.",
    "Your present circumstances don't determine where you can go; they merely determine where you start.",
    "It is okay to take a break. It is okay to be gentle with yourself.",
    "You are stronger than the challenges you face today."
];

export default function Home() {
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathState, setBreathState] = useState('Inhale');

    useEffect(() => {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    useEffect(() => {
        if (!isBreathing) return;

        let interval;
        const breathCycle = () => {
            setBreathState('Inhale');
            interval = setTimeout(() => {
                setBreathState('Hold');
                interval = setTimeout(() => {
                  setBreathState('Exhale');
                    interval = setTimeout(() => {
                        setBreathState('Hold');
                    }, 4000); // Exhale 4s
               }, 4000); // Hold 4s
            }, 4000); // Inhale 4s
        };

        breathCycle();
        const mainInterval = setInterval(breathCycle, 16000);

        return () => {
            clearTimeout(interval);
            clearInterval(mainInterval);
        };
    }, [isBreathing]);

    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem', animation: 'fadeIn 0.5s ease-out' }}>

            {/* Daily Quote Section */}
            <div style={{ marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto', background: 'var(--surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Quote size={32} color="var(--primary)" style={{ flexShrink: 0, opacity: 0.5 }} />
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>
                    "{quote}"
                </p>
            </div>

            <div className="glass" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: '-webkit-linear-gradient(45deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Speak Freely. Stay Anonymous.
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    A safe, judgment-free space designed for college students to share feelings, track moods, and get emotional support. You are not alone.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => navigate('/mood')}>
                        <Smile size={20} />
                        Check Mood
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/share')}>
                        <ShieldCheck size={20} />
                        Share Feelings
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/chat')}>
                        <MessageSquare size={20} />
                        Talk to AI
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <ShieldCheck size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>100% Anonymous</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>No logins, no tracking. Express yourself freely without fear of judgment.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <Smile size={32} color="#a855f7" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>Mood Tracking</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Keep tabs on your emotional well-being and get personalized coping strategies.</p>
                </div>
                <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <MessageSquare size={32} color="#06b6d4" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '0.5rem' }}>AI Companion</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Chat with an empathetic AI assistant anytime you need someone to talk to.</p>
                </div>
            </div>

            {/* Breathing Exercise Tool */}
            <div style={{ marginTop: '4rem', marginBottom: '2rem', padding: '3rem 2rem', background: 'var(--surface)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Wind size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Quick Unwind</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                        Feeling overwhelmed? Take a moment for a quick box breathing exercise to center yourself.
                    </p>

                    {!isBreathing ? (
                        <button className="btn btn-primary" onClick={() => setIsBreathing(true)}>Start Breathing</button>
                    ) : (
                        <div>
                            <div className="breath-circle" style={{ animation: breathState === 'Inhale' ? 'expand 4s linear' : breathState === 'Exhale' ? 'contract 4s linear' : 'none', transform: breathState === 'Exhale' || (breathState === 'Hold' && !isBreathing) ? 'scale(1)' : 'scale(1.5)' }}>
                                <span style={{ zIndex: 2, position: 'relative', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>{breathState}</span>
                            </div>
                            <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={() => setIsBreathing(false)}>Stop</button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .breath-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.1);
            border: 2px solid var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            transition: transform 4s linear;
        }
        @keyframes expand {
            from { transform: scale(1); }
            to { transform: scale(1.5); }
        }
        @keyframes contract {
            from { transform: scale(1.5); }
            to { transform: scale(1); }
        }
      `}</style>
        </div>
    );
}