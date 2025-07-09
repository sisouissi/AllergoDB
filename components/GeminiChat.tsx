
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/genai';
import { Allergen } from '../types';
import { SendIcon } from './icons';

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
  allAllergens: Allergen[];
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ isOpen, onClose, allAllergens }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `You are a world-class expert allergist assistant. Your knowledge base is strictly limited to the provided JSON data about molecular allergens. Do not use any external knowledge. You must answer the user's questions based ONLY on this data. The data is as follows: ${JSON.stringify(allAllergens)}. Answer in French.`;

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    if(isOpen && messages.length === 0) {
        setMessages([{sender: 'ai', text: 'Bonjour! Je suis votre assistant IA. Posez-moi une question sur les allergènes moléculaires listés dans cette application.'}]);
    }
  }, [isOpen, messages.length]);


  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const aiMessage: Message = { sender: 'ai', text: response.text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = { sender: 'ai', text: "Désolé, une erreur s'est produite. Veuillez réessayer." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[80vh] flex flex-col transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-xl font-bold text-thermo-red">Assistant IA</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer le chat"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>

        <div ref={chatHistoryRef} className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-thermo-red text-white' : 'bg-thermo-gray-light text-gray-800'}`}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-thermo-gray-light text-gray-800 p-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 rounded-b-2xl">
          <form onSubmit={handleSend} className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question ici..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-thermo-red focus:border-thermo-red transition-shadow"
              disabled={isLoading}
              aria-label="Votre message"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-thermo-red text-white rounded-full p-3 flex-shrink-0 disabled:bg-thermo-red-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-thermo-red-dark transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thermo-red"
              aria-label="Envoyer le message"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
