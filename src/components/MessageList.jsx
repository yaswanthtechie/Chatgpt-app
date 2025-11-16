import { useRef, useEffect, Fragment } from 'react';
import MessageItem from './MessageItem';

const MessageList = ({ history, sessionId, setHistory }) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="flex-1 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {history.map((entry) => (
          <Fragment key={entry.id}>
            {/* User's Question */}
            <MessageItem message={{ author: 'user', text: entry.question }} />
            
            {/* Bot's Answer */}
            {entry.answer && (
              <MessageItem 
                message={{ author: 'bot', ...entry.answer }} 
                entryId={entry.id}
                sessionId={sessionId}
                setHistory={setHistory}
              />
            )}
          </Fragment>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MessageList;
