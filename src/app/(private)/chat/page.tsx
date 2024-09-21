"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [suggestions] = useState([
        { text: "Create a surreal landscape", emoji: "🌄" },
        { text: "Design a futuristic cityscape", emoji: "🏙️" },
        { text: "Generate an abstract portrait", emoji: "🎨" },
        { text: "Illustrate a magical forest scene", emoji: "🌳" }
    ]);
    const scrollAreaRef = useRef<any>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (input.trim()) {
            setMessages((prev: any) => [...prev, { type: 'user', content: input }]);
            setInput('');
            setIsGenerating(true);
            setTimeout(() => {
                setMessages((prev: any) => [...prev, { type: 'ai', content: "Generating your image..." }]);
                setTimeout(() => {
                    setMessages((prev: any) => [...prev, {
                        type: 'image',
                        content: `/api/placeholder/512/512`,
                        actions: {
                            like: false,
                            dislike: false,
                            wishlist: false,
                            orderNow: false
                        }
                    }]);
                    setIsGenerating(false);
                }, 3000);
            }, 1000);
        }
    };

    const handleAction = (index: any, action: any) => {
        setMessages((prev: any) => prev.map((msg: any, i: any) =>
            i === index && msg.type === 'image'
                ? { ...msg, actions: { ...msg.actions, [action]: !msg.actions[action] } }
                : msg
        ));
    };

    return (
        <div className="h-full bg-black border border-white rounded-xl text-gray-100 flex flex-col">
            <header className="text-center py-4 ">
                <h1 className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text">AI Image Studio</h1>
            </header>

            <ScrollArea className="flex-grow" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                    <AnimatePresence>
                        {messages.map((message: any, index: any) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className={`${message.type === 'user' ? 'ml-auto bg-black border border-gray-100' : 'bg-gray-900 border-none'} max-w-[80%]  text-gray-200`}>
                                    <CardContent className="p-3">
                                        {message.type === 'image' ? (
                                            <div>
                                                <img src={message.content} alt="AI generated" className="w-full h-auto rounded-md mb-2" />
                                                <div className="flex justify-between mt-2">
                                                    {[
                                                        { icon: ThumbsUp, label: 'Like', action: 'like', color: 'text-green-400', fill:"green" },
                                                        { icon: ThumbsDown, label: 'Dislike', action: 'dislike', color: 'text-red-400', fill:"red" },
                                                        { icon: Heart, label: 'Wishlist', action: 'wishlist', color: 'text-pink-400', fill:"pink" },
                                                        { icon: ShoppingCart, label: 'Order', action: 'orderNow', color: 'text-blue-400', fill:"blue" },
                                                    ].map((action, i) => (
                                                        <Button
                                                            key={i}
                                                            variant={message.actions[action.action] ? "link" : "link"}
                                                            size="sm"
                                                            onClick={() => handleAction(index, action.action)}
                                                            className={`flex items-center ${action.color}`}
                                                        >
                                                            <action.icon size={16} fill={`${message.actions[action.action] ? `${action.fill}`: `transparent`}`} className="mr-1" />
                                                            {action.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p>{message.content}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>

            <div className="border-t border-gray-700 p-4">
                <div className="relative mb-4">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Enter your image generation prompt..."
                        className="w-full resize-none pr-12 bg-gray-950 text-gray-100 border-gray-600 focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
                        rows={3}
                    />
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-md"
                        animate={{
                            boxShadow: isGenerating
                                ? '0 0 0 2px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)'
                                : '0 0 0 0px rgba(59, 130, 246, 0)',
                        }}
                        transition={{ duration: 0.5 }}
                    />
                    <Button
                        className="absolute right-2 bottom-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                        size="sm"
                        onClick={handleSend}
                        disabled={!input.trim() || isGenerating}
                    >
                        {isGenerating ? <Sparkles className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                        Generate
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => setInput(suggestion.text)}
                            className="text-xs border-gray-600 hover:bg-gray-700"
                        >
                            {suggestion.emoji} {suggestion.text}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chat;