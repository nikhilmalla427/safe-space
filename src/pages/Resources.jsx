import React from 'react';
import { Phone, PhoneCall, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';

export default function Resources() {
    const helplines = [
        {
            title: "National Suicide Prevention Lifeline",
            description: "Available 24/7. Free and confidential support for people in distress.",
            number: "988",
            color: "#ef4444",
            icon: <PhoneCall size={24} color="#ef4444" />
        },
        {
            title: "Crisis Text Line",
            description: "Text HOME to connect with a volunteer Crisis Counselor 24/7.",
            number: "Text HOME to 741741",
            color: "#6366f1",
            icon: <MessageSquareIcon color="#6366f1" />
        },
        {
            title: "Student Helpline",
            description: "Dedicated support for college and university students facing mental health challenges.",
            number: "1-800-273-TALK",
            color: "#10b981",
            icon: <Phone size={24} color="#10b981" />
        },
        {
            title: "The Trevor Project",
            description: "Crisis intervention and suicide prevention services to LGBTQ young people.",
            number: "1-866-488-7386",
            color: "#a855f7",
            icon: <Globe size={24} color="#a855f7" />
        }
    ];

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f59e0b)', marginBottom: '1.5rem', color: 'white' }}>
                    <HeartHandshake size={32} />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Emergency Resources</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
                    If you are feeling overwhelmed, please reach out. There is always someone ready to listen and help. You don't have to face this alone.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {helplines.map((resource, index) => (
                    <div
                        key={index}
                        className="glass-card"
                        style={{
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                            animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                            flexWrap: 'wrap'
                        }}
                    >
                        <div style={{ background: `${resource.color}22`, padding: '1.5rem', borderRadius: '50%', flexShrink: 0 }}>
                            {resource.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                                {resource.title}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {resource.description}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right', minWidth: '200px' }}>
                            <a
                                href={resource.number.includes('Text') ? '#' : `tel:${resource.number}`}
                                className="btn"
                                style={{
                                    background: `${resource.color}15`,
                                    color: resource.color,
                                    border: `1px solid ${resource.color}40`,
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    padding: '0.75rem 1.5rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <ShieldCheck size={20} />
                                {resource.number}
                            </a>
                        </div>
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

// Quick inline component to fix missing icon from lucide
function MessageSquareIcon({ color }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    );
}