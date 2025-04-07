import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ clearChat, onOpenAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem('conversations');
    return savedConversations 
      ? JSON.parse(savedConversations) 
      : [
          { id: 1, title: 'Welcome to ChatGPT', date: new Date().toLocaleDateString(), time: '1:30 PM' },
          { id: 2, title: 'Explaining React Concepts', date: new Date().toLocaleDateString(), time: '2:45 PM' },
          { id: 3, title: 'Building a Portfolio', date: new Date().toLocaleDateString(), time: '4:20 PM' },
        ];
  });
  const [activeSection, setActiveSection] = useState('today');

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const startNewChat = () => {
    clearChat();
    setIsMobileMenuOpen(false);
  };

  const selectConversation = (id) => {
    console.log(`Selected conversation ${id}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside 
        className={`
          fixed top-0 left-0 z-10 h-full w-64 bg-gray-100 dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-screen
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* ChatGPT Logo */}
          <div className="flex items-center mb-4 px-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white">
              {/* <path d="M9.32 19.1C9.58 19.1 9.79 19.05 9.95 18.95C10.11 18.85 10.24 18.71 10.34 18.53L14.31 11.5L11.89 6.95C11.79 6.77 11.65 6.63 11.47 6.53C11.29 6.43 11.08 6.38 10.84 6.38C10.58 6.38 10.36 6.43 10.18 6.53C10 6.63 9.87 6.77 9.79 6.95L7.33 11.5L9.32 14.9V19.1Z" fill="currentColor"/>
              <path d="M12 22C10.6 22 9.26 21.75 7.98 21.25C6.7 20.75 5.58 20.05 4.62 19.15C3.66 18.25 2.9 17.19 2.34 15.97C1.78 14.75 1.5 13.43 1.5 12C1.5 10.57 1.78 9.25 2.34 8.03C2.9 6.81 3.66 5.75 4.62 4.85C5.58 3.95 6.7 3.25 7.98 2.75C9.26 2.25 10.6 2 12 2C13.4 2 14.74 2.25 16.02 2.75C17.3 3.25 18.42 3.95 19.38 4.85C20.34 5.75 21.1 6.81 21.66 8.03C22.22 9.25 22.5 10.57 22.5 12C22.5 13.43 22.22 14.75 21.66 15.97C21.1 17.19 20.34 18.25 19.38 19.15C18.42 20.05 17.3 20.75 16.02 21.25C14.74 21.75 13.4 22 12 22Z" fill="currentColor"/> */}
              <path d="M9.20509 8.76511V6.50545C9.20509 6.31513 9.27649 6.17234 9.44293 6.0773L13.9861 3.46088C14.6046 3.10413 15.342 2.93769 16.103 2.93769C18.9573 2.93769 20.7651 5.14983 20.7651 7.50454C20.7651 7.67098 20.7651 7.86129 20.7412 8.05161L16.0316 5.2924C15.7462 5.12596 15.4607 5.12596 15.1753 5.2924L9.20509 8.76511ZM19.8135 17.5659V12.1664C19.8135 11.8333 19.6708 11.5955 19.3854 11.429L13.4152 7.95633L15.3656 6.83833C15.5321 6.74328 15.6749 6.74328 15.8413 6.83833L20.3845 9.45474C21.6928 10.216 22.5728 11.8333 22.5728 13.4031C22.5728 15.2108 21.5025 16.8758 19.8135 17.5657V17.5659ZM7.80173 12.8088L5.8513 11.6671C5.68486 11.5721 5.61346 11.4293 5.61346 11.239V6.00613C5.61346 3.46111 7.56389 1.53433 10.2042 1.53433C11.2033 1.53433 12.1307 1.86743 12.9159 2.46202L8.2301 5.17371C7.94475 5.34015 7.80195 5.57798 7.80195 5.91109V12.809L7.80173 12.8088ZM12 15.2349L9.20509 13.6651V10.3351L12 8.76534L14.7947 10.3351V13.6651L12 15.2349ZM13.7958 22.4659C12.7967 22.4659 11.8693 22.1328 11.0841 21.5382L15.7699 18.8265C16.0553 18.6601 16.198 18.4222 16.198 18.0891V11.1912L18.1723 12.3329C18.3388 12.4279 18.4102 12.5707 18.4102 12.761V17.9939C18.4102 20.5389 16.4359 22.4657 13.7958 22.4657V22.4659ZM8.15848 17.1617L3.61528 14.5452C2.30696 13.784 1.42701 12.1667 1.42701 10.5969C1.42701 8.76534 2.52115 7.12414 4.20987 6.43428V11.8574C4.20987 12.1905 4.35266 12.4284 4.63802 12.5948L10.5846 16.0436L8.63415 17.1617C8.46771 17.2567 8.32492 17.2567 8.15848 17.1617ZM7.897 21.0625C5.20919 21.0625 3.23488 19.0407 3.23488 16.5432C3.23488 16.3529 3.25875 16.1626 3.2824 15.9723L7.96817 18.6839C8.25352 18.8504 8.53911 18.8504 8.82446 18.6839L14.7947 15.2351V17.4948C14.7947 17.6851 14.7233 17.8279 14.5568 17.9229L10.0136 20.5393C9.39518 20.8961 8.6578 21.0625 7.89677 21.0625H7.897ZM13.7958 23.8929C16.6739 23.8929 19.0762 21.8474 19.6235 19.1357C22.2874 18.4459 24 15.9484 24 13.4034C24 11.7383 23.2865 10.121 22.002 8.95542C22.121 8.45588 22.1924 7.95633 22.1924 7.45702C22.1924 4.0557 19.4331 1.51045 16.2458 1.51045C15.6037 1.51045 14.9852 1.60549 14.3668 1.81968C13.2963 0.773071 11.8215 0.107086 10.2042 0.107086C7.32606 0.107086 4.92383 2.15256 4.37653 4.86425C1.7126 5.55411 0 8.05161 0 10.5966C0 12.2617 0.713506 13.879 1.99795 15.0446C1.87904 15.5441 1.80764 16.0436 1.80764 16.543C1.80764 19.9443 4.56685 22.4895 7.75421 22.4895C8.39632 22.4895 9.01478 22.3945 9.63324 22.1803C10.7035 23.2269 12.1783 23.8929 13.7958 23.8929Z" fill="currentColor"></path>
            </svg>
            <span className="ml-2 text-xl font-semibold dark:text-white">ChatGPT</span>
          </div>
          <button
            onClick={startNewChat}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 mb-4 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-black dark:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>New chat</span>
          </button>

          <div className="flex-1 overflow-y-auto">
            <div className="flex mb-4 border-b border-gray-700">
              <button 
                onClick={() => setActiveSection('today')} 
                className={`flex-1 py-2 text-sm font-medium ${activeSection === 'today' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
              >
                Today
              </button>
              <button 
                onClick={() => setActiveSection('yesterday')} 
                className={`flex-1 py-2 text-sm font-medium ${activeSection === 'yesterday' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
              >
                Yesterday
              </button>
              <button 
                onClick={() => setActiveSection('previous')} 
                className={`flex-1 py-2 text-sm font-medium ${activeSection === 'previous' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
              >
                Previous 7 Days
              </button>
            </div>
            
            {/* Conversations List */}
            <ul className="space-y-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <button
                    onClick={() => selectConversation(conversation.id)}
                    className="flex items-center w-full py-2 px-3 rounded-md hover:bg-gray-700 text-left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1 truncate">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-white">{conversation.title}</p>
                        <p className="text-xs text-gray-400">{conversation.time}</p>
                      </div>
                      <p className="text-xs text-gray-400">{conversation.date}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile or Auth Buttons */}
          <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-600">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center w-full py-2 px-3 rounded-md">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2 flex items-center justify-center text-white font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="w-full py-2 px-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-left"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                >
                  Log In
                </button>
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;