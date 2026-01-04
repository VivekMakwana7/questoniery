
'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [readmeContent, setReadmeContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'Vivek@Learn') {
            setIsAuthenticated(true);
            fetchReadme();
        } else {
            setStatus({ type: 'error', message: 'Incorrect password' });
        }
    };

    const fetchReadme = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/chat/readme');
            const data = await response.json();
            setReadmeContent(data.content);
        } catch (error) {
            console.error('Failed to fetch README:', error);
            setStatus({ type: 'error', message: 'Failed to load README file.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setStatus({ type: null, message: '' });
        try {
            const response = await fetch('http://localhost:4000/chat/readme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: readmeContent }),
            });
            const data = await response.json();
            if (data.success) {
                setStatus({ type: 'success', message: 'README updated successfully!' });
            } else {
                setStatus({ type: 'error', message: 'Failed to update README.' });
            }
        } catch (error) {
            console.error('Failed to save README:', error);
            setStatus({ type: 'error', message: 'Error saving changes.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col h-screen bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-slate-200 items-center justify-center p-4 font-sans antialiased">
                <div className="w-full max-w-md bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative ring-1 ring-white/10">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">Admin Access</h1>
                        <p className="text-slate-500 text-sm mt-2">Enter password to edit README</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                        />
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            Access Editor
                        </button>
                        {status.message && (
                            <div className={`text-sm text-center ${status.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                                {status.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-[#050505] text-slate-200 font-sans antialiased">
            {/* Header */}
            <div className="bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h1 className="font-bold text-lg">README Editor</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        Back to Chat
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 p-6 bg-[#050505] overflow-hidden flex flex-col items-center">
                {status.message && (
                    <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {status.message}
                    </div>
                )}
                <div className="w-full max-w-5xl h-full bg-[#1e1e1e] rounded-xl border border-white/10 shadow-xl overflow-hidden flex flex-col relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50"></div>
                    <textarea
                        value={readmeContent}
                        onChange={(e) => setReadmeContent(e.target.value)}
                        className="flex-1 w-full bg-transparent p-6 font-mono text-sm text-slate-300 resize-none outline-none focus:bg-[#252525] transition-colors leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                        spellCheck={false}
                        placeholder="Loading content..."
                    />
                </div>
            </div>
        </div>
    );
}
