import React from 'react';

const Message = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 shadow-md ${isUser
          ? 'bg-blue-500 text-white rounded-br-none'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
          }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;