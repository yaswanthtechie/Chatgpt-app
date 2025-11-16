# ChatGPT-style UI

A frontend-only React application mimicking a ChatGPT-style interface, built with Vite, React, and Tailwind CSS.

## Features

-   **Neutral Theme**: Light (soft whites) and Dark (deep grays) modes.
-   **Theme Persistence**: Saves user's theme preference in `localStorage`.
-   **Responsive Design**: Collapsible sidebar on desktop, drawer on mobile.
-   **Client-Side Routing**: Uses React Router for session-based URLs (`/session/:sessionId`).
-   **Mock API Layer**: Includes stub functions in `src/api.js` for easy backend integration.
-   **Modern UI/UX**: Features subtle glassmorphism, loading states, and accessibility enhancements.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm

### Installation & Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).

## Backend Integration

This project is frontend-only and uses a mock API to simulate backend responses. To connect it to a real backend, follow these steps:

1.  **Create an environment file:**

    Create a file named `.env` in the root of the project.

2.  **Set the API URL:**

    Add your backend's base URL to the `.env` file:
    ```
    VITE_API_URL=https://your-backend-api.com/api
    ```

3.  **Update the API functions:**

    Go to `src/api.js` and replace the mock Promise-based functions with actual `fetch` or `axios` calls to your backend endpoints. Use `import.meta.env.VITE_API_URL` to construct the request URLs.

    The stub functions to be replaced are:
    -   `newSession()`
    -   `getSessions()`
    -   `getHistory(sessionId)`
    -   `askQuestion(sessionId, question)`
    -   `sendFeedback(sessionId, entryId, action)`
