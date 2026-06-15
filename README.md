# Prompt Pilot

A full-stack AI chat application with text and image generation, user authentication, a credit system, and a community gallery for shared images.

## Features

- **AI text chat** — Send prompts and get responses powered by Google Gemini
- **AI image generation** — Generate images from text via ImageKit AI transformations
- **User auth** — Register, login, and JWT-protected routes
- **Chat management** — Create, browse, search, and delete conversations
- **Credits** — New users start with 20 credits; text costs 1 credit, images cost 2
- **Stripe payments** — Purchase credit plans (Basic, Pro, Premium)
- **Community gallery** — Browse images published by other users
- **Dark mode** — Toggle theme with persistence in local storage
- **Responsive UI** — Mobile-friendly sidebar and layout

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4, React Router, Axios |
| Backend | Node.js, Express 5, TypeScript, MongoDB, Mongoose |
| AI | Gemini API (OpenAI-compatible client) |
| Media | ImageKit (upload + AI image generation) |
| Payments | Stripe |
| Auth | JWT, bcryptjs |

## Project Structure

```
PromptPilot/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # ChatBox, SideBar, Message, etc.
│   │   ├── context/      # AppContext (auth, chats, theme)
│   │   └── pages/        # Login, Credits, Community, Loading
│   └── vercel.json
└── server/          # Express API
    ├── configs/     # DB, OpenAI/Gemini, ImageKit
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── vercel.json
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- [Google AI Studio](https://aistudio.google.com/) API key (Gemini)
- [ImageKit](https://imagekit.io/) account (public key, private key, URL endpoint)
- [Stripe](https://stripe.com/) account (for credit purchases)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd PromptPilot
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=3000
MONGO_DB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL=https://ik.imagekit.io/your_imagekit_id

STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Start the server:

```bash
npm run server
```

The API runs at `http://localhost:3000`.

### 3. Frontend setup

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_SERVER_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## API Reference

All protected routes require an `Authorization` header with the JWT token.

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/register` | No | Register a new user |
| POST | `/login` | No | Login and receive JWT |
| GET | `/data` | Yes | Get current user profile |
| GET | `/published-images` | No | Get community-published images |

### Chats — `/api/chat`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/create` | Yes | Create a new chat |
| GET | `/get` | Yes | Get all user chats |
| POST | `/delete` | Yes | Delete a chat |

### Messages — `/api/message`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/text` | Yes | Send a text prompt (1 credit) |
| POST | `/image` | Yes | Generate an image (2 credits) |

### Credits — `/api/credit`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/plan` | No | List available credit plans |
| POST | `/purchase` | Yes | Start Stripe checkout |

### Webhooks

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/stripe` | Stripe payment webhook |

## Deployment (Vercel)

Deploy the **frontend** and **backend** as two separate Vercel projects from the same repo.

### Backend

| Setting | Value |
| --- | --- |
| Root Directory | `server` |
| Build Command | (default — uses `vercel.json`) |
| Environment Variables | All variables from `server/.env` |

The server exports the Express app for Vercel serverless and uses `.js` extensions on relative imports for ESM compatibility.

### Frontend

| Setting | Value |
| --- | --- |
| Root Directory | `client` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | `VITE_SERVER_URL=https://your-backend.vercel.app` |

## Credits

| Action | Cost |
| --- | --- |
| Text message | 1 credit |
| Image generation | 2 credits |
| New user signup | 20 credits (free) |

Credit plans can be purchased via Stripe on the `/credits` page.

## Author

Guru Hadadi
