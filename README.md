# NurtureHer 🤰

> Pregnancy & Maternal Health Tracking with Risk Prediction
> A MERN Stack Group Project

## About the Project

NurtureHer is a full-stack web application supporting women across three maternal stages: Preconception, Pregnant/Expecting, and New Motherhood/Postpartum. Users can submit their health information, log symptoms and mood, rate lifestyle habits, and receive automated risk predictions with detailed insights and analytics.

**Live URLs:**

- Frontend: *(update after deployment)*
- Backend API: <https://nurtureher-proj.onrender.com>

## Features

- Secure registration and login with JWT authentication
- Maternal stage selection (Preconception / Pregnancy / Postpartum)
- Health profile setup and management
- Daily symptom and mood logging with full history
- Lifestyle habit monitoring rated 1–5 (smoking, alcohol, drug use, sleep, exercise)
- Automated risk assessment — Low / Moderate / High
- Health insights — summary stats, common symptoms, mood trends
- Responsive design — works on mobile and desktop

## Tech Stack

|Layer     |Technology                             |
|----------|---------------------------------------|
|Frontend  |React.js, React Router, Axios          |
|Backend   |Node.js, Express.js                    |
|Database  |MongoDB, Mongoose                      |
|Auth      |JWT, bcryptjs                          |
|Validation|express-validator                      |
|Testing   |Jest, Supertest, Postman               |
|Deployment|Render.com (backend), Vercel (frontend)|

## Getting Started

### Prerequisites

- Node.js v18+
- Git
- A MongoDB Atlas account (free)

### Installation

```bash
git clone https://github.com/daphnehembah/nurtureher-proj.git
cd nurtureher-proj
npm install
```

### Environment Variables

Create a `.env` file in the root folder:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nurtureher
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Running the App

```bash
npm run dev
```

## API Endpoints

Full API documentation: [NurtureHer Postman Collection](./docs/NurtureHer-Postman-Collection.json)

|Method|Endpoint              |Auth|Description         |
|------|----------------------|----|--------------------|
|POST  |/api/auth/register    |No  |Create account      |
|POST  |/api/auth/login       |No  |Login, get token    |
|GET   |/api/auth/me          |Yes |Get logged-in user  |
|POST  |/api/profile          |Yes |Save onboarding data|
|GET   |/api/profile          |Yes |Fetch profile       |
|PUT   |/api/profile          |Yes |Update profile      |
|POST  |/api/logs             |Yes |Log symptoms/mood   |
|GET   |/api/logs             |Yes |All logs            |
|GET   |/api/logs/today       |Yes |Today’s log         |
|GET   |/api/logs/:date       |Yes |Log by date         |
|DELETE|/api/logs/:id         |Yes |Delete a log        |
|POST  |/api/risk/assess      |Yes |Run risk assessment |
|GET   |/api/risk             |Yes |Latest assessment   |
|GET   |/api/risk/history     |Yes |All past assessments|
|GET   |/api/insights/summary |Yes |Summary stats       |
|GET   |/api/insights/symptoms|Yes |Most common symptoms|
|GET   |/api/insights/mood    |Yes |Mood over time      |

## Deployment

### Backend → Render.com

1. Push code to GitHub
1. Log in to render.com → New Web Service → connect repo
1. Build Command: `npm install`
1. Start Command: `node src/index.js`
1. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV`, `PORT`
1. Deploy

### Frontend → Vercel

1. Log in to vercel.com → Add New Project → import repo
1. Set Root Directory to `frontend`
1. Deploy

## Team

|Member              |Role                                |
|--------------------|------------------------------------|
|Daphne Hembah       |Backend / API Routes                |
|Hadiza Na’abba Ghali|Database / Mongoose Models          |
|Nmesoma Nwosu       |Frontend / React UI                 |
|Michelle Oko        |Testing / Deployment / Documentation|

*NurtureHer — MERN Stack Capstone Project 2026*