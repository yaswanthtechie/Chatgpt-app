import { ChevronDown, MoreHorizontal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const ChatHeader = ({ session }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `Last activity: ${date.toLocaleDateString()}`;
  }

  return (
    <div className="flex items-center justify-between p-4 h-14 border-b border-light-border dark:border-dark-border sticky top-0 bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-xl z-10">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors">
        <div className="flex flex-col items-start">
            <span className="font-semibold text-light-primary dark:text-dark-primary">{session?.title || 'AI Assistant'}</span>
            {session && <span className="text-xs text-light-secondary dark:text-dark-secondary">{formatDate(session.createdAt)}</span>}
        </div>
        <ChevronDown className="h-4 w-4 text-light-secondary dark:text-dark-secondary" />
      </button>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button className="p-2 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface" aria-label="More options">
          <MoreHorizontal className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
