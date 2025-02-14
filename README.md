# Simple Chat


A real-time chat application built with React, TypeScript, and Bun, featuring WebSocket communication for instant messaging.

## Features

- Real-time messaging using WebSockets
- Multiple chat rooms support
- User presence indicators (join/leave system messages)
- Message editing and deletion
- Participant list
- Accessibility-focused UI
- Emoji picker

## Technology Stack

### Frontend
- React
- TypeScript
- TailwindCSS
- React Router
- Vitest for testing

### Backend
- Bun
- WebSocket Server
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v22 or later)
- Bun runtime (1.2.1)
- pnpm package manager (tested with 10.4)

### Installation

1. Clone the repository:
```bash
git clone https://git.shiverpeak.xyz/alex/simple-chat
cd simple-chat
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
pnpm install

# Install server dependencies
cd server
bun install
```

3. Start the development servers:

```bash
# In a new terminal, start the frontend
cd client
pnpm run dev

# Start the backend server
cd server
bun run dev
```

4. Open http://localhost:5173 in your browser
5. A refresh might be necessary after starting the dev server. Might be something wrong with this vite version.

## Usage

1. Create a new room or join an existing one using a room ID
2. Enter your name to join the chat
3. Start chatting!

## Testing

Run the test suite:

```bash
cd client
pnpm test
```

## Limitations and Future Improvements

- Users can join the chat with the same name
- Server does not verify if a client action is valid, i.e. a user can delete another user's message if you send the right request
- Messages are not persisted, so they are lost when the server restarts and also its not possible to send new users a history
- no user authentication
- Client Websockets should be more robust, i.e. reconnecting
- Client state does not persist on refresh
- Performance: when sending a very large amount of messages, like 100000, the browser will freeze. This is not due to bad rendering per se, but the websocket message ingestion. Fixing this would be quite easy with a server-sided message debounce and batching.
- Test coverage very limited: only a single component is tested
- Keyboard navigation and focus management could be improved
- Entire deployment process is missing, i.e. Dockerfiles, CI/CD, reverse proxy
- No Metrics, Traces or Logs

## License

This project is licensed under the MIT License
