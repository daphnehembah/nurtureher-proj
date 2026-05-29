# Requirements Specification Document

## NurtureHer — Pregnancy & Maternal Health Tracking and Risk Prediction System

**Project:** NurtureHer
**Course:** MERN Stack Application Development
**Group:** 29
**Members:**

- Member A (Backend/API): Daphne Hembah — 20230909
- Member B (Database/Models): Hadiza Na’abba Ghali — 20230829
- Member C (Frontend/React): Nmesoma Nwosu — 20230909
- Member D (Testing/Deployment/Docs): Michelle Oko — 20231511

**Stack:** MongoDB · Express.js · React.js · Node.js
**Date:** [Insert Date]
**Version:** 1.0

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements for NurtureHer, a full-stack web application designed to support women across all stages of maternal health — from preconception through pregnancy and into postpartum recovery. The system collects health and lifestyle data, tracks changes over time, and predicts potential maternal health risks.

### 1.2 Scope

NurtureHer is a MERN stack web application accessible on both mobile and desktop devices. It enables users to register, select their maternal stage, input health information, monitor lifestyle habits, and receive risk predictions based on their data.

### 1.3 Intended Audience

- Development team (Members A, B, C, D)
- Course lecturer / assessor
- End users: women at preconception, pregnancy, or postpartum stages

## 2. Functional Requirements

### FR-1: User Authentication and Account Management

|ID    |Requirement                                                                        |
|------|-----------------------------------------------------------------------------------|
|FR-1.1|The system shall allow users to create a new account with their details            |
|FR-1.2|The system shall allow registered users to log in securely using email and password|
|FR-1.3|The system shall allow users to log out of the system                              |
|FR-1.4|The system shall allow users to view and update their profile information          |
|FR-1.5|The system shall use JWT (JSON Web Token) to protect authenticated routes          |

### FR-2: User Category Selection

|ID    |Requirement                                                                                        |
|------|---------------------------------------------------------------------------------------------------|
|FR-2.1|The system shall allow users to select their maternal stage during registration or profile setup   |
|FR-2.2|The available categories shall be: Preconception, Pregnant/Expecting, and New Motherhood/Postpartum|
|FR-2.3|The system shall display relevant features and information based on the selected category          |
|FR-2.4|The system shall allow users to update their category if their stage changes                       |

### FR-3: Maternal Health Profile

|ID    |Requirement                                                                           |
|------|--------------------------------------------------------------------------------------|
|FR-3.1|The system shall collect and store the user’s full name                               |
|FR-3.2|The system shall collect and store the user’s age                                     |
|FR-3.3|The system shall collect and store the user’s weight                                  |
|FR-3.4|The system shall collect and store the user’s contact information                     |
|FR-3.5|The system shall collect and store the user’s blood group                             |
|FR-3.6|The system shall collect and store the user’s medical history                         |
|FR-3.7|The system shall collect and store the user’s previous pregnancy history              |
|FR-3.8|The system shall collect and store the expected delivery date (EDD) for pregnant users|
|FR-3.9|The system shall allow users to update their profile information at any time          |

### FR-4: Health and Symptom Logging

|ID    |Requirement                                                                       |
|------|----------------------------------------------------------------------------------|
|FR-4.1|The system shall allow users to log symptoms and mood entries                     |
|FR-4.2|The system shall store each log entry with a timestamp                            |
|FR-4.3|The system shall allow users to retrieve all their log entries                    |
|FR-4.4|The system shall allow users to retrieve their log entry for today                |
|FR-4.5|The system shall allow users to retrieve a log entry by a specific date           |
|FR-4.6|The system shall allow users to delete a log entry                                |
|FR-4.7|The system shall maintain a full history of all log entries in chronological order|

### FR-5: Lifestyle and Habit Monitoring

|ID    |Requirement                                                                                                                |
|------|---------------------------------------------------------------------------------------------------------------------------|
|FR-5.1|The system shall allow users to rate their lifestyle habits on a scale of 1–5                                              |
|FR-5.2|The lifestyle habits tracked shall include: smoking habits, alcohol intake, drug use, sleep quality, and exercise frequency|
|FR-5.3|The system shall store each lifestyle entry with a timestamp                                                               |
|FR-5.4|The system shall maintain a history of lifestyle entries for trend analysis                                                |

### FR-6: Risk Assessment

|ID    |Requirement                                                                           |
|------|--------------------------------------------------------------------------------------|
|FR-6.1|The system shall analyze user-provided health and lifestyle data to assess risk       |
|FR-6.2|The system shall predict possible maternal health risks based on collected information|
|FR-6.3|The system shall classify risk into levels: Low, Moderate, or High                    |
|FR-6.4|The system shall allow users to retrieve their latest risk assessment                 |
|FR-6.5|The system shall maintain a full history of all past risk assessments                 |
|FR-6.6|The system shall notify users of potential risk factors or unhealthy habits           |

### FR-7: Insights and Analytics

|ID    |Requirement                                                                     |
|------|--------------------------------------------------------------------------------|
|FR-7.1|The system shall provide users with a summary of their health statistics        |
|FR-7.2|The system shall identify and display the user’s most commonly reported symptoms|
|FR-7.3|The system shall display the user’s mood trends over time                       |

### FR-8: Data Management

|ID    |Requirement                                                                                                   |
|------|--------------------------------------------------------------------------------------------------------------|
|FR-8.1|The system shall store all user data securely in a MongoDB database                                           |
|FR-8.2|The system shall allow only authorized (logged-in) users to retrieve and update their data                    |
|FR-8.3|The system shall protect sensitive health information from unauthorized access using authentication middleware|
|FR-8.4|Passwords shall be hashed before being stored in the database                                                 |

## 3. Non-Functional Requirements

|ID   |Requirement                                                                                                 |
|-----|------------------------------------------------------------------------------------------------------------|
|NFR-1|The system shall have a user-friendly, intuitive interface                                                  |
|NFR-2|The system shall respond to user requests within a reasonable time (under 3 seconds for standard operations)|
|NFR-3|The system shall ensure data privacy and security at all times                                              |
|NFR-4|The system shall be accessible and fully functional on both mobile and desktop devices (responsive design)  |
|NFR-5|The system shall maintain accurate and reliable health records                                              |
|NFR-6|The system shall handle errors gracefully and return meaningful error messages to the user                  |

## 4. API Endpoints

|Method|Endpoint              |Auth Required|Description                        |
|------|----------------------|-------------|-----------------------------------|
|POST  |/api/auth/register    |No           |Create a new user account          |
|POST  |/api/auth/login       |No           |Login and receive JWT token        |
|GET   |/api/auth/me          |Yes          |Get current logged-in user         |
|POST  |/api/profile          |Yes          |Save onboarding/health profile data|
|GET   |/api/profile          |Yes          |Fetch user health profile          |
|PUT   |/api/profile          |Yes          |Update health profile              |
|POST  |/api/logs             |Yes          |Log symptoms and mood              |
|GET   |/api/logs             |Yes          |Get all log entries                |
|GET   |/api/logs/today       |Yes          |Get today’s log entry              |
|GET   |/api/logs/:date       |Yes          |Get log entry by specific date     |
|DELETE|/api/logs/:id         |Yes          |Delete a log entry                 |
|POST  |/api/risk/assess      |Yes          |Run risk assessment                |
|GET   |/api/risk             |Yes          |Get latest risk assessment         |
|GET   |/api/risk/history     |Yes          |Get all past risk assessments      |
|GET   |/api/insights/summary |Yes          |Get summary health statistics      |
|GET   |/api/insights/symptoms|Yes          |Get most common symptoms           |
|GET   |/api/insights/mood    |Yes          |Get mood trends over time          |

## 5. Data Models

### User

|Field    |Type  |Description                           |
|---------|------|--------------------------------------|
|name     |String|Full name                             |
|email    |String|Unique email address                  |
|password |String|Hashed password                       |
|stage    |String|preconception / pregnancy / postpartum|
|phone    |String|Contact number                        |
|createdAt|Date  |Account creation date                 |

### Health Profile

|Field               |Type    |Description                   |
|--------------------|--------|------------------------------|
|userId              |ObjectId|Reference to User             |
|age                 |Number  |User’s age                    |
|weight              |Number  |Weight in kg                  |
|bloodGroup          |String  |Blood group (A+, O-, etc.)    |
|medicalHistory      |String  |Existing conditions or notes  |
|previousPregnancies |Number  |Number of previous pregnancies|
|expectedDeliveryDate|Date    |EDD (for pregnant users)      |

### Log Entry

|Field            |Type    |Description              |
|-----------------|--------|-------------------------|
|userId           |ObjectId|Reference to User        |
|symptoms         |[String]|List of symptoms reported|
|mood             |String  |User’s mood              |
|notes            |String  |Additional notes         |
|smoking          |Number  |Lifestyle rating 1–5     |
|alcohol          |Number  |Lifestyle rating 1–5     |
|drugUse          |Number  |Lifestyle rating 1–5     |
|sleepQuality     |Number  |Lifestyle rating 1–5     |
|exerciseFrequency|Number  |Lifestyle rating 1–5     |
|createdAt        |Date    |Timestamp of entry       |

### Risk Assessment

|Field         |Type    |Description                    |
|--------------|--------|-------------------------------|
|userId        |ObjectId|Reference to User              |
|riskLevel     |String  |Low / Moderate / High          |
|riskFactors   |[String]|List of identified risk factors|
|recommendation|String  |Suggested action for user      |
|createdAt     |Date    |Date of assessment             |

## 6. System Constraints

- The application must be built using the MERN stack (MongoDB, Express.js, React.js, Node.js)
- Backend must be deployed on Render.com
- Frontend must be deployed on Vercel
- API must be tested using Postman
- Authentication must use JWT tokens
