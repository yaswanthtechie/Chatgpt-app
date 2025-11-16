import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { sendFeedback } from '../api';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const FeedbackButtons = ({ entryId, feedback, sessionId, setHistory }) => {
  // NOTE: In a real app, the initial userVote would come from the API.
  // Here, we assume the user hasn't voted on this item in this session.
  const [userVote, setUserVote] = useState(null); // 'like', 'dislike', or null

  const handleFeedback = (action) => {
    // The new API handles all the logic, so we just call it.
    // The component will then re-render with the new history prop.
    // We can still perform an optimistic update for a snappier UI.

    const oldVote = userVote;
    
    // Determine next optimistic vote state
    let nextVote = null;
    if (oldVote !== action) {
        nextVote = action;
    }
    setUserVote(nextVote);

    // TODO: replace stub with real axios/fetch call to /api/feedback
    sendFeedback(sessionId, entryId, action)
      .then(response => {
        if (response.success) {
          // Update the history state in ChatPage with the confirmed data from the API
          setHistory(prevHistory => prevHistory.map(entry => 
            entry.id === entryId 
              ? { ...entry, answer: { ...entry.answer, feedback: response.entry.answer.feedback } } 
              : entry
          ));
        } else {
          // Revert optimistic update on failure
          setUserVote(oldVote);
        }
      })
      .catch(() => {
        // Revert optimistic update on error
        setUserVote(oldVote);
      });
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <button 
        onClick={() => handleFeedback('like')} 
        className={twMerge(
          "flex items-center gap-1.5 p-1 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface",
          userVote === 'like' && 'text-light-accent dark:text-dark-accent bg-light-accent/10 dark:bg-dark-accent/20'
        )} 
        aria-label="Like response"
      >
        <ThumbsUp className="h-4 w-4" />
        {feedback.like > 0 && <span className="text-xs">{feedback.like}</span>}
      </button>
      <button 
        onClick={() => handleFeedback('dislike')} 
        className={twMerge(
          "flex items-center gap-1.5 p-1 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface",
          userVote === 'dislike' && 'text-red-500 bg-red-500/10'
        )} 
        aria-label="Dislike response"
      >
        <ThumbsDown className="h-4 w-4" />
        {feedback.dislike > 0 && <span className="text-xs">{feedback.dislike}</span>}
      </button>
    </div>
  );
};

export default FeedbackButtons;
