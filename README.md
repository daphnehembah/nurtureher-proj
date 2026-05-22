# NurtureHer 🤰

> Pregnancy & Maternal Health Tracking with Risk Prediction
> A MERN Stack Group Project

## About the Project

NurtureHer is a full-stack web application supporting women across three maternal stages: Preconception, Pregnant/Expecting, and New Motherhood/Postpartum. Users can submit their health information, log symptoms and health updates, rate lifestyle habits, and receive automated risk predictions with notifications.

**Live URLs:**

- Frontend: <https://nurtureher.vercel.app> *(update after deployment)*
- Backend API: <https://nurtureher-api.onrender.com> *(update after deployment)*

## Features

- Secure registration and login with JWT authentication
- Maternal category selection (Preconception / Pregnant / Postpartum)
- Maternal health profile (age, weight, blood group, medical history, EDD)
- Health status and symptom logging with full history
- Lifestyle habit monitoring rated 1–5 (smoking, alcohol, drug use, sleep, exercise)
- Automated risk prediction — Low / Moderate / High
- Notifications for identified risk factors and unhealthy habits
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
git clone https://github.com/[your-org]/nurtureher.git
cd nurtureher
cd backend && npm install
cd ../frontend && npm install
```

### Environment Variables

Create a `.env` file in the `/backend` folder:

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nurtureher
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Running the App

```bash
# Terminal 1 — start backend
cd backend && npm run dev

# Terminal 2 — start frontend
cd frontend && npm start
```

## API Endpoints

Full API documentation: [NurtureHer Postman Collection](./docs/NurtureHer-Postman-Collection.json)

|Method|Endpoint                   |Auth|Description              |
|------|---------------------------|----|-------------------------|
|POST  |/api/auth/register         |No  |Register new user        |
|POST  |/api/auth/login            |No  |Login                    |
|POST  |/api/auth/logout           |Yes |Logout                   |
|GET   |/api/auth/me               |Yes |Get current user         |
|PUT   |/api/users/:id             |Yes |Update profile/category  |
|POST  |/api/health-profile        |Yes |Submit health information|
|GET   |/api/health-profile/:userId|Yes |Get health profile       |
|PUT   |/api/health-profile/:id    |Yes |Update health profile    |
|POST  |/api/health-status         |Yes |Log health status        |
|GET   |/api/health-status/:userId |Yes |Get status history       |
|POST  |/api/symptoms              |Yes |Record symptom           |
|GET   |/api/symptoms/:userId      |Yes |Get symptom history      |
|POST  |/api/lifestyle             |Yes |Log lifestyle ratings    |
|GET   |/api/lifestyle/:userId     |Yes |Get lifestyle history    |
|PUT   |/api/lifestyle/:id         |Yes |Update lifestyle entry   |
|POST  |/api/risk/predict          |Yes |Run risk prediction      |
|GET   |/api/risk/:userId          |Yes |Get risk assessment      |
|GET   |/api/notifications/:userId |Yes |Get notifications        |
|PUT   |/api/notifications/:id/read|Yes |Mark notification read   |

## Deployment

### Backend → Render.com

1. Push code to GitHub
1. Log in to render.com → New Web Service → connect repo
1. Build Command: `cd backend && npm install`
1. Start Command: `cd backend && node server.js`
1. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`
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