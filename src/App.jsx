import { useState, useEffect } from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import ThemeToggle from './components/ThemeToggle';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage if available
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login');

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (text) => {
    // Add user message
    const userMessage = { text, isUser: true };
    setMessages([...messages, userMessage]);
    
    // Set loading state
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = { 
        text: generateAIResponse(text), 
        isUser: false 
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple function to generate AI responses
  const generateAIResponse = (userMessage) => {
    const responses = [
      "I'm just a simple demo AI. In a real app, this would connect to an actual AI service.",
      "That's an interesting point. Could you tell me more about it?",
      "I understand what you're saying. Let me think about that...",
      "Thanks for sharing your thoughts with me!",
      "I'm designed to simulate a ChatGPT-like experience, but I'm just using predefined responses for this demo."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  const handleOpenAuth = (view = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      {!currentUser ? (
        // Landing Page UI
        <div className="flex flex-col h-screen bg-black text-white">
          {/* Header with Logo and Auth Buttons */}
          <header className="p-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M9.32 19.1C9.58 19.1 9.79 19.05 9.95 18.95C10.11 18.85 10.24 18.71 10.34 18.53L14.31 11.5L11.89 6.95C11.79 6.77 11.65 6.63 11.47 6.53C11.29 6.43 11.08 6.38 10.84 6.38C10.58 6.38 10.36 6.43 10.18 6.53C10 6.63 9.87 6.77 9.79 6.95L7.33 11.5L9.32 14.9V19.1Z" fill="currentColor"/>
                  <path d="M12 22C10.6 22 9.26 21.75 7.98 21.25C6.7 20.75 5.58 20.05 4.62 19.15C3.66 18.25 2.9 17.19 2.34 15.97C1.78 14.75 1.5 13.43 1.5 12C1.5 10.57 1.78 9.25 2.34 8.03C2.9 6.81 3.66 5.75 4.62 4.85C5.58 3.95 6.7 3.25 7.98 2.75C9.26 2.25 10.6 2 12 2C13.4 2 14.74 2.25 16.02 2.75C17.3 3.25 18.42 3.95 19.38 4.85C20.34 5.75 21.1 6.81 21.66 8.03C22.22 9.25 22.5 10.57 22.5 12C22.5 13.43 22.22 14.75 21.66 15.97C21.1 17.19 20.34 18.25 19.38 19.15C18.42 20.05 17.3 20.75 16.02 21.25C14.74 21.75 13.4 22 12 22Z" fill="currentColor"/>
                </svg>
                <h1 className="text-xl font-bold ml-2">ChatGPT</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleOpenAuth('login')}
                  className="px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
                >
                  Log in
                </button>
                <button 
                  onClick={() => handleOpenAuth('signup')}
                  className="px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                >
                  Sign up
                </button>
              </div>
            </div>
          </header>

           {/* Main Content Area */}
           <main className="flex-1 flex flex-col items-center justify-center px-4">
             <div className="max-w-3xl w-full flex flex-col items-center">
               {/* Heading */}
               <h1 className="text-4xl font-bold mb-12 text-center">What can I help with?</h1>
               
               {/* Input Area */}
               <div className="w-full relative">
                 <div className="w-full bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                   <input
                     type="text"
                     placeholder="Ask anything"
                     className="w-full bg-transparent p-4 pl-12 pr-20 text-white focus:outline-none"
                     onFocus={() => handleOpenAuth('login')}
                   />
                   
                   {/* Input Buttons */}
                   <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                     <button className="text-gray-400 hover:text-gray-200" title="Attach">
                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                       </svg>
                     </button>
                   </div>
                   
                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                     <button className="text-gray-400 hover:text-gray-200" title="Search">
                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                       </svg>
                     </button>
                     <button className="text-gray-400 hover:text-gray-200" title="Reason">
                       <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                     </button>
                   </div>
                 </div>
                 
                 {/* Voice Button */}
                 <button className="absolute right-3 -top-12 bg-gray-800 p-2 rounded-full shadow-md text-gray-400 hover:text-gray-200 border border-gray-700">
                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                   </svg>
                 </button>
               </div>
               
               {/* Footer Text */}
               <div className="text-center text-xs text-gray-500 mt-8">
                 By messaging ChatGPT, you agree to our <a href="#" className="underline hover:text-gray-300">Terms</a> and have read our <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
               </div>
             </div>
           </main>
         </div>
       ) : (
         <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
           
           {/* Sidebar */}
           <Sidebar clearChat={clearChat} onOpenAuth={handleOpenAuth} />
           
           {/* Main Content */}
           <div className="flex flex-col flex-1 h-full">
             {/* Header */}
             <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 p-4">
               <div className="flex justify-between items-center">
                 <div className="flex items-center">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white">
                     <path d="M9.32 19.1C9.58 19.1 9.79 19.05 9.95 18.95C10.11 18.85 10.24 18.71 10.34 18.53L14.31 11.5L11.89 6.95C11.79 6.77 11.65 6.63 11.47 6.53C11.29 6.43 11.08 6.38 10.84 6.38C10.58 6.38 10.36 6.43 10.18 6.53C10 6.63 9.87 6.77 9.79 6.95L7.33 11.5L9.32 14.9V19.1Z" fill="currentColor"/>
                     <path d="M12 22C10.6 22 9.26 21.75 7.98 21.25C6.7 20.75 5.58 20.05 4.62 19.15C3.66 18.25 2.9 17.19 2.34 15.97C1.78 14.75 1.5 13.43 1.5 12C1.5 10.57 1.78 9.25 2.34 8.03C2.9 6.81 3.66 5.75 4.62 4.85C5.58 3.95 6.7 3.25 7.98 2.75C9.26 2.25 10.6 2 12 2C13.4 2 14.74 2.25 16.02 2.75C17.3 3.25 18.42 3.95 19.38 4.85C20.34 5.75 21.1 6.81 21.66 8.03C22.22 9.25 22.5 10.57 22.5 12C22.5 13.43 22.22 14.75 21.66 15.97C21.1 17.19 20.34 18.25 19.38 19.15C18.42 20.05 17.3 20.75 16.02 21.25C14.74 21.75 13.4 22 12 22Z" fill="currentColor"/>
                   </svg>
                   <h1 className="text-xl font-bold ml-2 lg:hidden">ChatGPT</h1>
                 </div>
                 <div className="flex items-center space-x-4 ml-auto">
                   <button 
                     className="px-3 py-1 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                   >
                     Temporary
                   </button>
                   <button 
                     onClick={clearChat}
                     className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                   >
                     Clear Chat
                   </button>
                   <ThemeToggle />
                 </div>
               </div>
             </header>
             
             {/* Main chat area */}
             <div className="flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
               <ChatContainer messages={messages} isLoading={isLoading} />
               <ChatInput onSendMessage={(text) => {
                 handleSendMessage(text);
               }} isLoading={isLoading} />
             </div>
           </div>
         </div>
       )}
       
       {/* Auth Modal - Always available */}
       <AuthModal 
         isOpen={isAuthModalOpen} 
         onClose={handleCloseAuth} 
         initialView={authModalView} 
       />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
