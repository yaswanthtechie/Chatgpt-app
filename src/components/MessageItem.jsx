import TableView from './TableView';
import FeedbackButtons from './FeedbackButtons';
import { User, Bot } from 'lucide-react';

const MessageItem = ({ message, entryId, sessionId, setHistory }) => {
  const isBot = message.author === 'bot';

  const BotMessageWrapper = ({ children }) => (
    <div className="p-4 rounded-xl bg-light-surface dark:bg-dark-surface">
      {children}
    </div>
  );

  const content = (
    <>
      <div className="prose prose-sm dark:prose-invert max-w-none text-light-primary dark:text-dark-primary">
          {(message.text || message.description || '').split('\n').map((line, i) => <p key={i}>{line}</p>)}
      </div>
      {isBot && message.table && (
        <div className="mt-4">
          <TableView table={message.table} />
        </div>
      )}
      {isBot && <FeedbackButtons entryId={entryId} feedback={message.feedback} sessionId={sessionId} setHistory={setHistory} />}
    </>
  );

  return (
    <div className="flex gap-4 py-6 px-4 md:px-6">
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isBot ? 'bg-light-accent dark:bg-dark-accent' : 'bg-light-secondary dark:bg-dark-secondary'}`}>
        {isBot ? <Bot className="h-5 w-5 text-white" /> : <User className="h-5 w-5 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-light-primary dark:text-dark-primary mb-2">{isBot ? 'AI Assistant' : 'You'}</p>
        {isBot ? <BotMessageWrapper>{content}</BotMessageWrapper> : content}
      </div>
    </div>
  );
};

export default MessageItem;
