# Project Proposal: NurtureHer — Pregnancy & Maternal Health Tracking with Risk Prediction

**Course:** MERN Stack Application Development
**Group:** 29
**Members:**

- Member A (Backend/API): Daphne Hembah — 20231020
- Member B (Database/Models): Hadiza Na’abba Ghali — 20230829
- Member C (Frontend/React): Nmesoma Nwosu — 20230909
- Member D (Testing/Deployment/Docs): Michelle Oko — 20231511

**Stack:** MongoDB · Express.js · React.js · Node.js
**Submission Date:** 30th May, 2026

## 1. Problem Statement

Maternal health complications remain a serious concern, particularly for women who lack access to consistent monitoring and guidance throughout preconception, pregnancy, and the postpartum period. Many women are unaware of how their lifestyle habits and health indicators contribute to maternal risk. NurtureHer addresses this by providing a digital platform where women can track their health, monitor habits, and receive automated risk predictions — empowering them to take informed action at every stage.

## 2. Project Overview

NurtureHer is a full-stack MERN web application that supports women across three maternal stages: preconception, pregnancy, and postpartum. Users register and select their stage, submit health information, log symptoms and mood, track lifestyle habits, and receive risk assessments based on their data. The system provides insights and analytics to help users understand their health trends over time.

## 3. Target Users

- **Preconception users:** Women planning a pregnancy who want to monitor their health and lifestyle readiness
- **Pregnant/Expecting users:** Women tracking their pregnancy health, symptoms, and risk factors
- **Postpartum users:** New mothers monitoring their recovery and wellbeing after birth

## 4. Core Features

### 4.1 User Authentication and Account Management

- Register a new account with maternal stage selection
- Secure login with JWT authentication
- Get current logged-in user details
- Protected routes — only logged-in users can access their data

### 4.2 Health Profile

- Save onboarding health data: age, weight, blood group, medical history, previous pregnancies, expected delivery date
- Fetch and update health profile at any time

### 4.3 Health and Symptom Logging

- Log daily symptoms and mood entries
- View all log entries
- View today’s log entry
- View log entry by specific date
- Delete a log entry

### 4.4 Lifestyle and Habit Monitoring

- Rate lifestyle habits on a scale of 1–5:
  - Smoking habits
  - Alcohol intake
  - Drug use
  - Sleep quality
  - Exercise frequency
- Logged alongside symptom and mood entries

### 4.5 Risk Assessment

- Run automated risk assessment based on health and lifestyle data
- Risk classified as Low, Moderate, or High
- View latest risk assessment
- View full history of past risk assessments

### 4.6 Insights and Analytics

- Summary statistics of overall health data
- Most commonly reported symptoms
- Mood trends over time

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

|Method|Endpoint              |Description         |
|------|----------------------|--------------------|
|POST  |/api/auth/register    |Create account      |
|POST  |/api/auth/login       |Login, get token    |
|GET   |/api/auth/me          |Get logged-in user  |
|POST  |/api/profile          |Save onboarding data|
|GET   |/api/profile          |Fetch profile       |
|PUT   |/api/profile          |Update profile      |
|POST  |/api/logs             |Log symptoms/mood   |
|GET   |/api/logs             |All logs            |
|GET   |/api/logs/today       |Today’s log         |
|GET   |/api/logs/:date       |Log by date         |
|DELETE|/api/logs/:id         |Delete a log        |
|POST  |/api/risk/assess      |Run risk assessment |
|GET   |/api/risk             |Latest assessment   |
|GET   |/api/risk/history     |All past assessments|
|GET   |/api/insights/summary |Summary stats       |
|GET   |/api/insights/symptoms|Most common symptoms|
|GET   |/api/insights/mood    |Mood over time      |

## 7. Work Division

|Member|Role                   |Responsibilities                                                               |
|------|-----------------------|-------------------------------------------------------------------------------|
|A     |Backend/API            |Express routes, controllers, middleware, risk assessment logic                 |
|B     |Database/Models        |Mongoose schemas, MongoDB Atlas setup, seed data                               |
|C     |Frontend/React         |React components, pages, routing, API integration                              |
|D     |Testing/Deployment/Docs|Postman collection, Jest tests, Render & Vercel deployment, README, process log|

## 8. Timeline (Hypothetical)

|Phase |Tasks                                      |Owner(s)                |
|------|-------------------------------------------|------------------------|
|Week 1|Project setup, DB models, API stubs        |A, B, D (Postman + docs)|
|Week 2|Auth, profile, logging endpoints           |A, B                    |
|Week 3|Risk assessment, insights, frontend        |A, C                    |
|Week 4|Frontend integration, API testing          |C, D                    |
|Week 5|Testing, bug fixes, incremental deployment |D                       |
|Week 6|Final deployment, documentation, submission|D + all                 |

## 9. Success Criteria

- All 17 API endpoints return correct responses and status codes
- Authentication protects all sensitive routes
- Risk assessment correctly classifies user data into Low / Moderate / High
- Insights endpoints return meaningful health analytics
- Application is live and accessible via public URLs
- All submission checklist items completed