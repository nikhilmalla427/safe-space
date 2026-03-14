import React, { useState } from 'react';
import { Send, Heart, MessageCircle } from 'lucide-react';

const INITIAL_POSTS = [
    { id: 1, text: "I've been feeling so overwhelmed with exams lately. It feels like no matter how much I study, it's not enough.", likes: 12, comments: 3, time: "2 hours ago" },
    { id: 2, text: "Finally took a mental health day. Sometimes you just need to step back and breathe. Highly recommend it to anyone struggling right now.", likes: 45, comments: 8, time: "4 hours ago" },
    { id: 3, text: "Does anyone else feel like they don't belong here? Imposter syndrome is hitting really hard today.", likes: 28, comments: 14, time: "5 hours ago" },
];

export default function AnonymousWall() {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [newPost, setNewPost] = useState("");

    const handlePost = () => {
        if (!newPost.trim()) return;
        const post = {
            id: Date.now(),
            text: newPost,
            likes: 0,
            comments: 0,
            time: "Just now"
        };
        setPosts([post, ...posts]);
        setNewPost("");
    };

    const handleLike = (id) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Anonymous Wall</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Share your thoughts, feelings, and struggles. No names, no judgment.</p>
            </div>

            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
                <textarea
                    placeholder="What's on your mind? You are safe here."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={4}
                    style={{ width: '100%', marginBottom: '1rem', resize: 'none' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button className="btn btn-primary" onClick={handlePost} style={{ padding: '0.5rem 1.5rem', borderRadius: '8px' }}>
                        <Send size={18} />
                        Share Anonymously
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {posts.map((post) => (
                    <div key={post.id} className="glass-card" style={{ padding: '1.5rem', animation: 'fadeIn 0.3s ease-in' }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{post.text}</p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <span>{post.time}</span>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <button
                                    onClick={() => handleLike(post.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                                >
                                    <Heart size={18} /> {post.likes}
                                </button>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageCircle size={18} /> {post.comments}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}