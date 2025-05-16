
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AuraMoon assistant. You can ask me anything about menstrual cycles, period health, or get personalized recommendations.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    
    // Simulate AI response (this would be replaced with actual AI integration)
    setTimeout(() => {
      let aiResponse: string;
      const userQuestion = input.toLowerCase();
      
      if (userQuestion.includes('menstrual') || userQuestion.includes('period') || 
          userQuestion.includes('cycle')) {
        aiResponse = "Your menstrual cycle is divided into four main phases: menstrual, follicular, ovulatory, and luteal. Each phase brings different hormonal changes and symptoms. Check out the Info section for specific recommendations for each phase!";
      } else if (userQuestion.includes('food') || userQuestion.includes('eat')) {
        aiResponse = "During your period, it's best to consume iron-rich foods like leafy greens, lean proteins, and complex carbohydrates. Avoiding processed foods, caffeine, and alcohol can help reduce cramps and bloating.";
      } else if (userQuestion.includes('exercise') || userQuestion.includes('workout')) {
        aiResponse = "Exercise needs vary throughout your cycle. During menstruation, gentle activities like walking and yoga are ideal. In the follicular phase, you may have more energy for high-intensity workouts. During the luteal phase, moderate exercise like Pilates or swimming can help with PMS symptoms.";
      } else if (userQuestion.includes('pain') || userQuestion.includes('cramp')) {
        aiResponse = "For period cramps, try using a heating pad, taking warm baths, gentle exercise, and staying hydrated. Anti-inflammatory foods like ginger and turmeric can also help. If pain is severe, consider speaking with a healthcare provider about medication options.";
      } else {
        aiResponse = "Thank you for your question! I'm here to help with any period-related concerns. Feel free to ask about cycle phases, nutrition, exercise recommendations, or general menstrual health.";
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  return (
    <div className="ai-chat-container flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b border-aurora-purple/30">
        <Button 
          variant="ghost" 
          className="mr-2 text-aurora-purple hover:bg-aurora-deep-purple/20" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-aurora-purple">AuraMoon Assistant</h1>
          <p className="text-sm text-white/70">Ask me anything about your cycle</p>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-xl p-3 ${
                message.sender === 'user' 
                  ? 'bg-aurora-purple/70 text-white' 
                  : 'bg-aurora-deep-purple/40 border border-aurora-purple/30 text-white'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center mb-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <div className="bg-aurora-purple rounded-full flex items-center justify-center h-full w-full">
                      AM
                    </div>
                  </Avatar>
                  <span className="text-xs text-aurora-purple font-semibold">AuraMoon</span>
                </div>
              )}
              <p>{message.text}</p>
              <p className="text-xs opacity-70 text-right mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-aurora-purple/30">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about your cycle..."
            className="resize-none min-h-[50px] max-h-[120px] bg-aurora-deep-purple/20 border-aurora-purple/30 text-white"
          />
          <Button 
            type="submit" 
            className="bg-aurora-purple hover:bg-aurora-deep-purple text-white"
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBox;
