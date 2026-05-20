# API Contract

Base URL: `/api`
Auth: Bearer token (JWT) in `Authorization` header

---

## Auth

### POST /auth/register
**Body:**
```json
{ "name": "string", "email": "string", "password": "string" }
```
**Response 201:**
```json
{ "token": "string", "user": { "id": "string", "name": "string", "email": "string" } }
```
**Errors:** 400 validation, 409 email taken

---

### POST /auth/login
**Body:** `{ "email": "string", "password": "string" }`  
**Response 200:** `{ "token": "string", "user": { ... } }`  
**Errors:** 400 validation, 401 wrong credentials

---

## Users  *(protected — requires token)*

### GET /users
**Response 200:** `{ "users": [ { "id", "name", "email" } ] }`

### GET /users/:id
**Response 200:** `{ "user": { ... } }`  
**Errors:** 404 not found

### PUT /users/:id
**Body:** `{ "name": "string", "email": "string" }` *(all optional)*  
**Response 200:** `{ "user": { ... } }`

### DELETE /users/:id
**Response 200:** `{ "message": "User deleted" }`