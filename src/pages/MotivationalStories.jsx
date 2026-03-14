import React from 'react';
import { BookOpen, Star, TrendingUp, Heart } from 'lucide-react';

const STORIES = [
    {
        id: 1,
        title: "The Bamboo Tree",
        category: "Patience & Growth",
        icon: <TrendingUp size={24} color="#10b981" />,
        content: "A Chinese bamboo tree takes five years to grow. It has to be watered and fertilized in the ground every day, and it doesn't break through the ground for five years. After five years, once it breaks through the ground, it will grow 90 feet tall in just five weeks! The same goes for your academic journey. The work you put in today might not show immediate results, but you are building a strong foundation for future success.",
        color: "#10b981"
    },
    {
        id: 2,
        title: "Embracing Failure",
        category: "Resilience",
        icon: <Star size={24} color="#f59e0b" />,
        content: "Thomas Edison was once asked how he felt about failing 1,000 times while trying to invent the lightbulb. He famously replied, 'I didn't fail 1,000 times. The light bulb was an invention with 1,000 steps.' A bad grade or a failed exam isn't the end of your story—it's just a step in your learning process. Be kind to yourself and keep moving forward.",
        color: "#f59e0b"
    },
    {
        id: 3,
        title: "The Weight of the Glass",
        category: "Managing Stress",
        icon: <Heart size={24} color="#ef4444" />,
        content: "A professor held up a glass of water and asked his class, 'How heavy is this?' The answers ranged from a few ounces to a pound. He replied, 'The absolute weight doesn't matter. It depends on how long I hold it. If I hold it for a minute, it's not a problem. If I hold it for an hour, my arm will ache. If I hold it for a day, my arm will feel numb and paralyzed.' The weight of the glass doesn't change, but the longer you hold it, the heavier it becomes. Set your worries down and rest.",
        color: "#ef4444"
    }
];

export default function MotivationalStories() {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', marginBottom: '1.5rem', color: 'white' }}>
                    <BookOpen size={32} />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Motivational Stories</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
                    Take a moment to read these short stories about resilience, overcoming struggles, and finding your strength. You are capable of more than you know.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {STORIES.map((story, index) => (
                    <div
                        key={story.id}
                        className="glass-card"
                        style={{
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: `${story.color}22`, padding: '1rem', borderRadius: '12px' }}>
                                {story.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{story.title}</h3>
                                <span style={{ fontSize: '0.85rem', color: story.color, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {story.category}
                                </span>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', flex: 1, fontSize: '1.05rem' }}>
                            {story.content}
                        </p>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}