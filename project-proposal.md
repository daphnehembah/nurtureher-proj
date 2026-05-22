# Project Proposal: NurtureHer — Pregnancy & Maternal Health Tracking with Risk Prediction

**Course:** MERN Stack Application Development
**Group:** 29
**Members:**

- Member A (Backend/API): Daphne Hembah — 20230909
- Member B (Database/Models): Hadiza Na’abba Ghali — 20230829
- Member C (Frontend/React): Nmesoma Nwosu — 20230909
- Member D (Testing/Deployment/Docs): Michelle Oko — 20231511

**Stack:** MongoDB · Express.js · React.js · Node.js
**Submission Date:** 30th May, 2026

## 1. Problem Statement

Maternal health complications remain a serious concern, particularly for women who lack access to consistent monitoring and guidance throughout preconception, pregnancy, and the postpartum period. Many women are unaware of how their lifestyle habits and health indicators contribute to maternal risk. NurtureHer addresses this by providing a digital platform where women can track their health, monitor habits, and receive automated risk predictions — empowering them to take informed action at every stage.

## 2. Project Overview

NurtureHer is a full-stack MERN web application that supports women across three maternal stages: preconception, pregnancy, and postpartum. Users register and select their stage, submit health information, log lifestyle habits, track symptoms and health updates, and receive risk assessments based on their data. The system notifies users of potential risk factors and encourages healthier habits.

## 3. Target Users

- **Preconception users:** Women planning a pregnancy who want to monitor their health and lifestyle readiness
- **Pregnant/Expecting users:** Women tracking their pregnancy health, symptoms, and risk factors
- **Postpartum users:** New mothers monitoring their recovery and wellbeing after birth

## 4. Core Features

### 4.1 User Authentication and Account Management

- Register a new account
- Secure login with JWT authentication
- Logout
- View and update profile information
- Protected routes — only logged-in users can access their data

### 4.2 Maternal Category Selection

- Select maternal stage during registration: Preconception, Pregnant/Expecting, or New Motherhood/Postpartum
- Update category as the user’s stage changes
- Dashboard and features adapt based on selected category

### 4.3 Maternal Health Information Collection

- Submit and store: full name, age, weight, contact information, blood group, medical history, previous pregnancy history, and expected delivery date (for pregnant users)
- View and update stored health profile

### 4.4 Health Status Tracking

- Log regular health status updates with notes
- Record symptoms or health changes
- View full chronological history of health entries

### 4.5 Lifestyle and Habit Monitoring

- Rate lifestyle habits on a scale of 1–5:
  - Smoking habits
  - Alcohol intake
  - Drug use
  - Sleep quality
  - Exercise frequency
- Track lifestyle history over time

### 4.6 Risk Prediction and Notifications

- System analyses health profile and lifestyle data
- Predicts risk level: Low, Moderate, or High
- Identifies specific risk factors and provides recommendations
- Sends notifications to alert users of potential risks or unhealthy patterns
- Users can view and mark notifications as read

### 4.7 Data Security

- All passwords hashed before storage
- JWT authentication protects all sensitive routes
- Only the account owner can access their own data

## 5. Technical Architecture

|Layer     |Technology                              |Responsibility                       |
|----------|----------------------------------------|-------------------------------------|
|Frontend  |React.js + React Router                 |UI, routing, API calls               |
|Backend   |Node.js + Express.js                    |REST API, business logic, risk engine|
|Database  |MongoDB + Mongoose                      |Data storage                         |
|Auth      |JWT + bcrypt                            |Secure authentication                |
|Validation|express-validator                       |Input validation on all routes       |
|Testing   |Jest + Supertest + Postman              |API and unit testing                 |
|Deployment|Render.com (backend) + Vercel (frontend)|Live hosting                         |

## 6. API Endpoints Summary

|Method|Endpoint                   |Description                |
|------|---------------------------|---------------------------|
|POST  |/api/auth/register         |Register new user          |
|POST  |/api/auth/login            |Login                      |
|POST  |/api/auth/logout           |Logout                     |
|GET   |/api/auth/me               |Get current user           |
|PUT   |/api/users/:id             |Update profile and category|
|POST  |/api/health-profile        |Submit health information  |
|GET   |/api/health-profile/:userId|Get health profile         |
|PUT   |/api/health-profile/:id    |Update health profile      |
|POST  |/api/health-status         |Log health status update   |
|GET   |/api/health-status/:userId |Get health status history  |
|POST  |/api/symptoms              |Record a symptom           |
|GET   |/api/symptoms/:userId      |Get symptom history        |
|POST  |/api/lifestyle             |Log lifestyle ratings      |
|GET   |/api/lifestyle/:userId     |Get lifestyle history      |
|PUT   |/api/lifestyle/:id         |Update lifestyle entry     |
|POST  |/api/risk/predict          |Run risk prediction        |
|GET   |/api/risk/:userId          |Get risk assessment        |
|GET   |/api/notifications/:userId |Get notifications          |
|PUT   |/api/notifications/:id/read|Mark notification as read  |

## 7. Work Division

|Member|Role                   |Responsibilities                                                               |
|------|-----------------------|-------------------------------------------------------------------------------|
|A     |Backend/API            |Express routes, controllers, middleware, risk prediction logic                 |
|B     |Database/Models        |Mongoose schemas, MongoDB Atlas setup, seed data                               |
|C     |Frontend/React         |React components, pages, routing, API integration                              |
|D     |Testing/Deployment/Docs|Postman collection, Jest tests, Render & Vercel deployment, README, process log|

## 8. Timeline (Hypothetical)

|Phase |Tasks                                          |Owner(s)                |
|------|-----------------------------------------------|------------------------|
|Week 1|Project setup, DB models, API stubs            |A, B, D (Postman + docs)|
|Week 2|Auth, user category, health profile endpoints  |A, B                    |
|Week 3|Health status, symptoms, lifestyle endpoints   |A, C                    |
|Week 4|Risk prediction engine, notifications, frontend|A, C                    |
|Week 5|Testing, bug fixes, incremental deployment     |D                       |
|Week 6|Final deployment, documentation, submission    |D + all                 |

## 9. Success Criteria

- All 19 API endpoints return correct responses and status codes
- Authentication protects all sensitive routes
- Risk prediction correctly classifies user data into Low / Moderate / High
- Application is live and accessible via public URLs
- All submission checklist items completed