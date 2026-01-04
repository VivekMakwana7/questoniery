'use client';

import { useState, useRef, useEffect, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import classNames from 'classnames';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const CodeBlock = memo(({ language, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code my-4 rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 backdrop-blur-sm">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-0 text-sm">
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          showLineNumbers={true}
          lineNumberStyle={{ minWidth: "3em", paddingRight: "1em", color: "#475569", textAlign: "right", userSelect: "none" }}
          {...props}
          customStyle={{ margin: 0, background: 'transparent', padding: '1rem', fontSize: '0.875rem', lineHeight: '1.5' }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
});

const MessageItem = memo(({ msg }: { msg: Message }) => {
  return (
    <div
      className={classNames("flex w-full group", {
        "justify-end": msg.role === 'user',
        "justify-start": msg.role === 'bot',
      })}
    >
      <div
        className={classNames(
          "max-w-[85%] md:max-w-[75%] rounded-2xl px-6 py-4 shadow-sm transition-all duration-200",
          {
            "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-none shadow-indigo-500/10": msg.role === 'user',
            "bg-slate-900/80 border border-white/5 text-slate-200 rounded-bl-none hover:bg-slate-900": msg.role === 'bot',
          }
        )}
      >
        {msg.role === 'bot' ? (
          <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950/50 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-xl">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <CodeBlock language={match[1]} {...props}>
                      {children}
                    </CodeBlock>
                  ) : (
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-200 font-mono text-xs" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
        )}
        <div className={classNames("text-[10px] mt-2 font-medium opacity-60 uppercase tracking-wider flex items-center gap-1", {
          "text-indigo-200 justify-end": msg.role === 'user',
          "text-slate-500 justify-start": msg.role === 'bot'
        })}>
          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
});

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hello! I am your README assistant. Ask me anything about this project.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });

      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.answer,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Sorry, something went wrong connecting to the server. Please check if the backend is online.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-slate-200 items-center justify-center p-4 md:p-6 font-sans antialiased selection:bg-indigo-500/30">
      <div className="w-full max-w-5xl bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] relative ring-1 ring-white/10">

        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-md p-5 border-b border-white/5 flex items-center justify-between z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                README Bot
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-400">Online</span>
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-slate-400">
            v1.0.0
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent hover:scrollbar-thumb-slate-600">
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}

          {isLoading && (
            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl rounded-bl-none px-6 py-5 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-slate-900/30 backdrop-blur-md border-t border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about the project..."
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/50 rounded-full py-4 pl-6 pr-14 text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/10 shadow-inner"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409 8.75 8.75 0 013.322-.977 1 1 0 011.169 1.409 8.75 8.75 0 003.322.977 1 1 0 001.788 0l7-14a1 1 0 00-1.169-1.409 8.75 8.75 0 01-3.322.977 1 1 0 01-1.169-1.409 8.75 8.75 0 00-3.322-.977z" />
              </svg>
            </button>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] text-slate-600 font-medium">Powered by Gemini AI • Built with Next.js & NestJS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
