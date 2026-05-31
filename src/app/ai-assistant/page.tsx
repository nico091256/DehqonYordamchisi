'use client';

import { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AiAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Assalomu alaykum! Men DehqonYordamchisi AI tizimiman. Qishloq xo\'jaligi, ekinlar parvarishi, bozor narxlari yoki platformadan foydalanish bo\'yicha savollaringiz bo\'lsa bemalol bering!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      let reply = "Savolingiz uchun rahmat. Hozirda tizim sinov rejimida, shuning uchun batafsil javob bera olmayman. Lekin tez orada sun'iy intellekt xizmati to'liq ishga tushadi!";
      
      if (userMsg.toLowerCase().includes('olma') || userMsg.toLowerCase().includes('narx')) {
        reply = "Hozirgi kunda bozorda eng xaridorgir olmalar qatoriga Samarqand va Quba olmalari kiradi. O'rtacha narxlar naviga qarab 8,000 dan 15,000 so'mgacha o'zgarib turibdi.";
      } else if (userMsg.toLowerCase().includes('kasallik') || userMsg.toLowerCase().includes('dori')) {
        reply = "Ekinlardagi kasalliklarni davolash uchun avvalo to'g'ri tashxis kerak. Masalan, pomidordagi fitoftorozga qarshi mis kuporosi yoki maxsus fungitsidlar yordam beradi. Batafsil ma'lumot uchun agronomingiz bilan maslahatlashishni tavsiya qilaman.";
      }

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#F9FBFA] flex flex-col pt-20 pb-20 lg:pb-0">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-[2rem] shadow-soft border border-gray-100 transform-gpu">
          <div className="w-16 h-16 bg-[#2D5A27] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#2D5A27]/20">
            <Sparkles size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">AI Yordamchi</h1>
            <p className="text-sm font-medium text-gray-500">Aqlli agronom bilan maslahatlashing</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow bg-white rounded-[2.5rem] shadow-soft border border-gray-100 flex flex-col overflow-hidden transform-gpu">
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-[#2D5A27] flex items-center justify-center shrink-0 border border-[#2D5A27]/10">
                    <Bot size={20} />
                  </div>
                )}
                <div className={`p-5 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#2D5A27] text-white rounded-tr-sm shadow-md' 
                    : 'bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-500/10">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-[#2D5A27] flex items-center justify-center shrink-0 border border-[#2D5A27]/10">
                  <Bot size={20} />
                </div>
                <div className="p-5 rounded-2xl bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Savolingizni yozing..."
                className="w-full pl-6 pr-16 py-4 bg-white border border-gray-200 rounded-2xl focus:border-[#2D5A27] focus:ring-4 focus:ring-[#2D5A27]/10 outline-none transition-all font-medium text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 w-12 h-12 bg-[#2D5A27] hover:bg-[#1E3D1A] disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-all active:scale-95"
              >
                <Send size={20} className="ml-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
