import { faker } from '@faker-js/faker';

// In-memory mock database
const db = {
  sessions: [
    { 
      id: 'session-1', 
      title: 'Life Lessons & Animal Thoughts', 
      createdAt: faker.date.recent({ days: 1 }),
      history: [
        {
          id: 'entry-1',
          question: "What's one lesson life has taught you?",
          answer: {
            description: faker.lorem.paragraphs(2),
            table: null,
            feedback: { like: 12, dislike: 1 },
          },
          timestamp: faker.date.recent({ days: 1 }),
        },
        {
          id: 'entry-2',
          question: "If animals could talk, which one would be the rudest?",
          answer: {
            description: faker.lorem.paragraphs(2),
            table: {
              columns: ['Animal', 'Rudeness Factor', 'Common Phrase'],
              rows: [
                ['Cat', 'High', '"My bowl is 2% empty."'],
                ['Goose', 'Extreme', '"HONK!" (aggressively)'],
                ['Chihuahua', 'High', '(incoherent trembling rage)'],
              ],
            },
            feedback: { like: 42, dislike: 3 },
          },
          timestamp: faker.date.recent({ days: 1 }),
        }
      ]
    },
  ],
};

// This mock state simulates a backend tracking a user's vote per entry.
const userVotes = {}; // e.g., { 'entry-id': 'like' }

const createBotAnswer = () => ({
  description: faker.lorem.paragraphs(2),
  table: Math.random() > 0.5 ? {
    columns: ['Metric', 'Value', 'Trend'],
    rows: Array.from({ length: 3 }, () => [
      faker.commerce.productName(),
      `${faker.number.int({ min: 50, max: 99 })}%`,
      `${Math.random() > 0.5 ? '+' : '-'}${faker.number.int({ min: 1, max: 5 })}%`
    ]),
  } : null,
  feedback: { like: 0, dislike: 0 },
});

// --- API Functions ---
// TODO: Replace all functions with actual API calls (e.g., using axios or fetch) to import.meta.env.VITE_API_URL

/**
 * Creates a new chat session.
 * @returns {Promise<{success: boolean, session: {id: string, title: string, createdAt: Date}}>}
 */
export const newSession = async (firstQuestion) => {
  // TODO: `await axios.post(`${import.meta.env.VITE_API_URL}/sessions`, { question: firstQuestion });`
  await new Promise(res => setTimeout(res, 500)); // Simulate network delay
  const newSessionData = {
    id: faker.string.uuid(),
    title: firstQuestion.split(' ').slice(0, 5).join(' ') + (firstQuestion.length > 30 ? '...' : ''),
    createdAt: new Date(),
    history: [],
  };
  
  const firstEntry = {
    id: faker.string.uuid(),
    question: firstQuestion,
    answer: createBotAnswer(),
    timestamp: new Date(),
  };

  newSessionData.history.push(firstEntry);
  db.sessions.unshift(newSessionData);
  
  return { success: true, session: { id: newSessionData.id, title: newSessionData.title, createdAt: newSessionData.createdAt } };
};

/**
 * Retrieves a list of all sessions.
 * @returns {Promise<{success: boolean, sessions: Array<{id: string, title: string, createdAt: Date}>}>}
 */
export const getSessions = async () => {
  // TODO: `await axios.get(`${import.meta.env.VITE_API_URL}/sessions`);`
  await new Promise(res => setTimeout(res, 700)); // Simulate network delay
  const sessions = db.sessions.map(({ id, title, createdAt }) => ({ id, title, createdAt }));
  return { success: true, sessions };
};

/**
 * Retrieves the full history for a specific session.
 * @param {string} sessionId
 * @returns {Promise<{success: boolean, history: Array<object>}>}
 */
export const getHistory = async (sessionId) => {
  // TODO: `await axios.get(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`);`
  await new Promise(res => setTimeout(res, 500)); // Simulate network delay
  const session = db.sessions.find(s => s.id === sessionId);
  if (!session) return { success: false, history: [] };
  return { success: true, ...session };
};

/**
 * Asks a question within a session.
 * @param {string} sessionId
 * @param {string} question
 * @returns {Promise<{success: boolean, entry: object}>}
 */
export const askQuestion = async (sessionId, question) => {
  // TODO: `await axios.post(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}/ask`, { question });`
  await new Promise(res => setTimeout(res, 1500)); // Simulate network delay
  const session = db.sessions.find(s => s.id === sessionId);
  if (!session) throw new Error('Session not found');

  const newEntry = {
    id: faker.string.uuid(),
    question,
    answer: createBotAnswer(),
    timestamp: new Date(),
  };
  
  session.history.push(newEntry);
  return { success: true, entry: newEntry };
};

/**
 * Sends feedback for a specific answer.
 * @param {string} sessionId
 * @param {string} entryId
 * @param {'like' | 'dislike'} action
 * @returns {Promise<{success: boolean, entry: object}>}
 */
export const sendFeedback = async (sessionId, entryId, action) => {
  // TODO: `await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, { sessionId, entryId, action });`
  await new Promise(res => setTimeout(res, 200)); // Simulate network delay
  const session = db.sessions.find(s => s.id === sessionId);
  const entry = session?.history.find(e => e.id === entryId);

  if (entry) {
    const currentVote = userVotes[entryId];
    if (currentVote === action) {
      entry.answer.feedback[action]--;
      userVotes[entryId] = null;
    } else {
      if (currentVote) entry.answer.feedback[currentVote]--;
      entry.answer.feedback[action]++;
      userVotes[entryId] = action;
    }
    return { success: true, entry };
  }
  throw new Error('Entry not found');
};
