import { useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-4 md:px-6 md:pb-6">
      <div className="relative max-w-3xl mx-auto">
        <div className="w-full p-4 pr-28 rounded-2xl bg-light-surface-glass dark:bg-dark-surface-glass backdrop-blur-xl border border-light-border dark:border-dark-border shadow-lg">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Chat..."
            aria-label="Chat input"
            rows="1"
            className="w-full bg-transparent focus:outline-none resize-none max-h-48"
            disabled={isLoading}
          />
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors" aria-label="Attach file">
            <Paperclip className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
          </button>
          <button className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors" aria-label="Use microphone">
            <Mic className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="p-2.5 bg-light-accent dark:bg-dark-accent rounded-full text-white disabled:bg-light-secondary disabled:dark:bg-dark-secondary disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
