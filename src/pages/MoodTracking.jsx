import React, { useState } from 'react';
import { Smile, Frown, AlertCircle, Wind, CloudRain, ChevronRight } from 'lucide-react';

const MOODS = [
    { id: 'happy', label: 'Happy', icon: <Smile size={32} color="#10b981" />, color: '#10b981', tip: "That's wonderful! Keep up the positive energy. Share your joy to uplift others." },
    { id: 'sad', label: 'Sad', icon: <Frown size={32} color="#3b82f6" />, color: '#3b82f6', tip: "It's okay to feel sad. Be gentle with yourself. Consider listening to a calming playlist, drinking some tea, or talking to our AI for support." },
    { id: 'anxious', label: 'Anxious', icon: <AlertCircle size={32} color="#f59e0b" />, color: '#f59e0b', tip: "Take a deep breath. Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, and exhale for 8. You are safe." },
    { id: 'stressed', label: 'Stressed', icon: <Wind size={32} color="#ef4444" />, color: '#ef4444', tip: "Drink some water, step away from your screen, and take a 5-minute break. Break down your tasks into smaller, manageable chunks." },
    { id: 'lonely', label: 'Lonely', icon: <CloudRain size={32} color="#8b5cf6" />, color: '#8b5cf6', tip: "Feeling alone is difficult, but you are not isolated. Visit our Anonymous Wall to connect with others feeling the same way, or chat with our AI companion." }
];

export default function MoodTracking() {
    const [selectedMood, setSelectedMood] = useState(null);

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How are you feeling today?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Tracking your mood is the first step toward better mental wellbeing.</p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
                {MOODS.map((mood) => (
                    <div
                        key={mood.id}
                        className="glass-card"
                        style={{
                            padding: '2rem 1.5rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            width: '140px',
                            border: selectedMood?.id === mood.id ? `2px solid ${mood.color}` : '1px solid var(--border)',
                            background: selectedMood?.id === mood.id ? `var(--surface-hover)` : 'var(--surface)',
                            transform: selectedMood?.id === mood.id ? 'translateY(-8px) scale(1.05)' : 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onClick={() => setSelectedMood(mood)}
                    >
                        <div style={{ display: 'inline-block', marginBottom: '1rem', background: `${mood.color}22`, borderRadius: '50%', padding: '1rem' }}>
                            {mood.icon}
                        </div>
                        <h4 style={{ color: selectedMood?.id === mood.id ? mood.color : 'inherit' }}>{mood.label}</h4>
                    </div>
                ))
                }
            </div >

            {selectedMood && (
                <div
                    className="glass"
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '2rem',
                        borderLeft: `4px solid ${selectedMood.color}`,
                        animation: 'fadeInUp 0.4s ease-out'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: `${selectedMood.color}33`, padding: '0.75rem', borderRadius: '50%' }}>
                            {selectedMood.icon}
                        </div>
                        <h3 style={{ fontSize: '1.5rem' }}>Here for you</h3>
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                        {selectedMood.tip}
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between', padding: '1rem' }}>
                            Explore more coping tools <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
}
`}</style>
        </div>
    );
}