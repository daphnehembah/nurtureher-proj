# NurtureHer — Member D’s Process Log

## Log Entries

### 10th May, 2026 — Project Setup

**What I did:** Read MERN Practical Manual (Ch 9 & 10). Created GitHub, Postman, Render, and Vercel accounts.

**Outcome:** All accounts ready. Added to project repository.

**Issues / Bugs Found:** None.

**Next Steps:** Submit proposal. Import Postman collection. Await first endpoints from Member A.

### 14th May, 2026 — Documentation

**What I did:** Wrote requirements specification document, project proposal, README, process log, and Postman collection for all 17 planned endpoints.

**Outcome:** All documents pushed to GitHub repo under /docs folder.

**Issues / Bugs Found:** N/A

**Next Steps:** Test auth endpoints as soon as Member A completes them.

### 16th May, 2026 — Postman Collection

**What I did:** Imported NurtureHer-Postman-Collection.json into Postman. Set up environment variables (base_url, token). Verified all 17 endpoint stubs are present across 5 folders.

**Outcome:** Collection ready. Awaiting live endpoints to test.

**Issues / Bugs Found:** N/A — stubs only, no live backend yet.

**Next Steps:** Test register and login as soon as auth is built.

### 24th May, 2026 — Deployment Setup

**What I did:** Attempted to connect nurtureher-proj repo to Render from my own account. Discovered repo is under Member A’s GitHub account so it wasn’t visible from my Render account. Resolved by obtaining Member A’s Render login details.

**Outcome:** Successfully accessed Render dashboard.

**Issues / Bugs Found:** Render could not see repo from my GitHub account due to repository ownership being under teammate’s account.

**Next Steps:** Deploy backend to Render.

### 24th May, 2026 — Backend Deployment

**What I did:** Deployed backend to Render. Fixed two deployment errors — Root Directory was incorrectly set to “backend” and Start Command was set to “backend/ $ node index.js”. Corrected Root Directory to empty and Start Command to “node src/index.js”. Added environment variables: MONGO_URI, JWT_SECRET, NODE_ENV, PORT, JWT_EXPIRES_IN.

**Outcome:** Backend successfully deployed and live at <https://nurtureher-proj.onrender.com> ✅

**Issues / Bugs Found:** Initial deployment failed due to wrong Root Directory and Start Command settings. Fixed and redeployed successfully.

**Next Steps:** Test API endpoints in Postman.

### 24th May, 2026 — API Testing (Initial)

**What I did:** Updated Postman collection with new set of 17 endpoints. Set base_url to live Render URL. Tested POST /api/auth/register endpoint.

**Outcome:** ❌ First test returned 404 Route not found — code not pushed to GitHub yet. After Member A pushed, retested and received 400 Bad Request — “Stage is required”. Fixed request body by replacing “maternalCategory” with “stage: pregnancy”. Retested and received 500 Internal Server Error — database connection timeout.

**Issues / Bugs Found:**
Bug 1 — 400: missing “stage” field in request body. Fixed in Postman.
Bug 2 — 500: MongoDB connection timeout. Reported to Member B.

**Next Steps:** Await Member B’s fix on MongoDB Atlas configuration.

### 25th May, 2026 — Database Fix + Continued Testing

**What I did:** Worked with Member B to fix MongoDB connection issues on Render. Fixed MONGO_URI by adding database name “/nurtureher” before the “?” in the connection string. Updated JWT_SECRET to match team’s agreed secret key. Fixed MONGO_URI which was being saved incorrectly on Render — deleted and re-added it fresh.

**Outcome:** Database connection established successfully ✅. New errors emerged during testing:

- 502 Bad Gateway — server crashing on startup
- 500 “next is not a function” — middleware bug in auth routes

**Issues / Bugs Found:**
Bug 3 — 502 Bad Gateway: server crashing. Fixed by correcting environment variables on Render.
Bug 4 — 500 “next is not a function”: found bug in auth middleware chain. Reported exact fix to Member A. Fix pending.

**Next Steps:** Await Member A’s code fix. Begin Vercel deployment for frontend.

### 26th May, 2026 — Extended Debugging

**What I did:** Continued debugging the “next is not a function” error with Member A. Systematically checked every file in the middleware chain — validate.middleware.js, validators.js, auth.routes.js, auth.controller.js, and app.js. Added a debug console.log to validate.middleware.js to confirm next was being passed correctly. Confirmed next type was “function” in the validate middleware — meaning the bug was elsewhere. Checked all controller functions and confirmed they all needed next added as a parameter.

**Outcome:** ❌ Register endpoint still failing despite multiple fixes. Debug log confirmed validate middleware was working correctly. Bug narrowed down to the middleware array spreading in the routes.

**Issues / Bugs Found:** Bug 4 continued — tried multiple fixes including adding next to all controller functions, spreading validator arrays with … syntax. All failed. Bug persisted.

**Next Steps:** Continue debugging. Deploy frontend to Vercel.

### 27th May, 2026 — Frontend Deployment

**What I did:** Frontend (React app in /client folder) deployed to Vercel by Member C. Confirmed Vercel URL. Identified 404 error on Vercel — Root Directory not set correctly. Reported fix to team.

**Outcome:** Frontend live at <https://nurtureher-proj.vercel.app/login> ✅

**Issues / Bugs Found:** Vercel showed 404 NOT_FOUND initially — Root Directory needed to be set to “client” folder.

**Next Steps:** Fix register endpoint. Test all remaining endpoints.

### 29th May, 2026 — Register Endpoint Fixed + Full API Testing

**What I did:** Register endpoint finally fixed after extended debugging. Tested all 17 API endpoints in Postman against the live Render URL.

**Outcome:** ✅ ALL 17 ENDPOINTS PASSING

Full test results:

- POST /api/auth/register — 201 Created ✅
- POST /api/auth/login — 200 OK ✅
- GET /api/auth/me — 200 OK ✅
- POST /api/profile — 201 Created ✅
- GET /api/profile — 200 OK ✅
- PUT /api/profile — 200 OK ✅
- POST /api/logs — 201 Created ✅
- GET /api/logs — 200 OK ✅
- GET /api/logs/today — 200 OK ✅
- GET /api/logs/:date — 200 OK ✅
- DELETE /api/logs/:id — 200 OK ✅
- POST /api/risk/assess — 201 Created ✅
- GET /api/risk — 200 OK ✅
- GET /api/risk/history — 200 OK ✅
- GET /api/insights/summary — 200 OK ✅
- GET /api/insights/symptoms — 200 OK ✅
- GET /api/insights/mood — 200 OK ✅

**Issues / Bugs Found:** None — all endpoints passing.

**Next Steps:** Write and run Jest/Supertest automated tests.

### 29th May, 2026 — Jest/Supertest Automated Testing

**What I did:** Cloned the project repository to local computer. Installed Jest and Supertest packages. Created test file at src/**tests**/api.test.js covering all 17 endpoints. Fixed multiple test issues — incorrect status code expectations, logId variable not being captured correctly, response body structure mismatches. Pushed final test file to GitHub.

**Outcome:** ✅ ALL 17 JEST TESTS PASSING

Test results:

- Test Suites: 1 passed
- Tests: 17 passed, 17 total
- Time: 16.18s

**Issues / Bugs Found:** Minor test configuration issues — status code mismatches and response body structure differences. All resolved during test debugging.

**Next Steps:** Final submission checks. Confirm both live URLs working.

<!-- ADD NEW ENTRIES BELOW THIS LINE -->

### [Date] — [Activity Type]

**What I did:**

**Outcome:**

**Issues / Bugs Found:**

**Next Steps:**

## Bug Tracker

|#|Date          |Endpoint               |Bug Description                                        |Reported To                   |Status |
|-|--------------|-----------------------|-------------------------------------------------------|------------------------------|-------|
|1|24 May 2026   |POST /api/auth/register|400 — missing “stage” field in request body            |Self-fixed in Postman         |✅ Fixed|
|2|24 May 2026   |POST /api/auth/register|500 — MongoDB connection timeout                       |Member B                      |✅ Fixed|
|3|25 May 2026   |All endpoints          |502 Bad Gateway — server crash on startup              |Self-fixed via Render env vars|✅ Fixed|
|4|25-29 May 2026|POST /api/auth/register|500 — “next is not a function” in auth middleware chain|Member A                      |✅ Fixed|
|5|27 May 2026   |Vercel frontend        |404 NOT_FOUND — Root Directory not set to “client”     |Member C                      |✅ Fixed|

## Deployment Log

|#|Date       |What Was Deployed      |Platform  |Live URL                                  |Status|
|-|-----------|-----------------------|----------|------------------------------------------|------|
|1|24 May 2026|Backend (src/index.js) |Render.com|<https://nurtureher-proj.onrender.com>    |✅ Live|
|2|27 May 2026|Frontend (React/client)|Vercel    |<https://nurtureher-proj.vercel.app/login>|✅ Live|

## Submission Checklist

|Requirement                                                      |Status|
|-----------------------------------------------------------------|------|
|User registration working                                        |✅     |
|User login and logout working                                    |✅     |
|Maternal stage selection (Preconception / Pregnancy / Postpartum)|✅     |
|Health profile submission and retrieval                          |✅     |
|Health profile update                                            |✅     |
|Symptom and mood logging                                         |✅     |
|View all logs / today’s log / log by date                        |✅     |
|Delete a log entry                                               |✅     |
|Risk assessment returning Low / Moderate / High                  |✅     |
|Risk history retrievable                                         |✅     |
|Insights — summary stats                                         |✅     |
|Insights — most common symptoms                                  |✅     |
|Insights — mood over time                                        |✅     |
|All 17 endpoints tested in Postman                               |✅     |
|Jest/Supertest tests written and passing                         |✅     |
|Input validation on all POST/PUT routes                          |✅     |
|Passwords hashed in database                                     |✅     |
|Responsive design (mobile + desktop)                             |✅     |
|Error handling implemented                                       |✅     |
|Backend deployed on Render.com                                   |✅     |
|Frontend deployed on Vercel                                      |✅     |
|README complete with live URLs                                   |✅     |
|Requirements specification document complete                     |✅     |
|Process log maintained throughout project                        |✅     |
|Postman collection in /docs folder in repo                       |✅     |
