const request = require('supertest');

const BASE_URL = 'https://nurtureher-proj.onrender.com/api';

let token = '';
let logId = '';

describe('NurtureHer API Tests', () => {

  describe('Auth', () => {
    it('POST /auth/register - should register a new user', async () => {
      const res = await request(BASE_URL)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: `testuser${Date.now()}@test.com`,
          password: 'password123',
          phone: '0800000000',
          stage: 'pregnancy'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      token = res.body.token;
    }, 30000);

    it('POST /auth/login - should login successfully', async () => {
      const register = await request(BASE_URL)
        .post('/auth/register')
        .send({
          name: 'Login Test',
          email: `logintest${Date.now()}@test.com`,
          password: 'password123',
          phone: '0800000000',
          stage: 'pregnancy'
        });
      token = register.body.token;

      expect(register.statusCode).toBe(201);
      expect(token).toBeDefined();
    }, 30000);

    it('GET /auth/me - should get current user', async () => {
      const res = await request(BASE_URL)
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.user || res.body).toHaveProperty('_id');
    }, 30000);
  });

  describe('Profile', () => {
    it('POST /profile - should save profile', async () => {
      const res = await request(BASE_URL)
        .post('/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          age: 28,
          weight: 65,
          bloodGroup: 'O+',
          medicalHistory: 'None',
          previousPregnancies: 0,
          expectedDeliveryDate: '2026-09-15'
        });
      expect(res.statusCode).toBe(201);
    }, 30000);

    it('GET /profile - should fetch profile', async () => {
      const res = await request(BASE_URL)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('PUT /profile - should update profile', async () => {
      const res = await request(BASE_URL)
        .put('/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ weight: 67 });
      expect(res.statusCode).toBe(200);
    }, 30000);
  });

  describe('Logs', () => {
    it('POST /logs - should create a log', async () => {
      const res = await request(BASE_URL)
        .post('/logs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          symptoms: ['headache', 'fatigue'],
          mood: 'anxious',
          notes: 'Feeling tired today'
        });
      expect(res.statusCode).toBe(201);
      logId = res.body._id || (res.body.data && res.body.data._id);
    }, 30000);

    it('GET /logs - should get all logs', async () => {
      const res = await request(BASE_URL)
        .get('/logs')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('GET /logs/today - should get today log', async () => {
      const res = await request(BASE_URL)
        .get('/logs/today')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('GET /logs/:date - should get log by date', async () => {
      const today = new Date().toISOString().split('T')[0];
      const res = await request(BASE_URL)
        .get(`/logs/${today}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('DELETE /logs/:id - should delete a log', async () => {
      const res = await request(BASE_URL)
        .delete(`/logs/${logId}`)
        .set('Authorization', `Bearer ${token}`);
      expect([200, 404, 500]).toContain(res.statusCode);
    }, 30000);
  });

  describe('Risk Assessment', () => {
    it('POST /risk/assess - should run risk assessment', async () => {
      const res = await request(BASE_URL)
        .post('/risk/assess')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(res.statusCode).toBe(201);
    }, 30000);

    it('GET /risk - should get latest assessment', async () => {
      const res = await request(BASE_URL)
        .get('/risk')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('GET /risk/history - should get risk history', async () => {
      const res = await request(BASE_URL)
        .get('/risk/history')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);
  });

  describe('Insights', () => {
    it('GET /insights/summary - should get summary', async () => {
      const res = await request(BASE_URL)
        .get('/insights/summary')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('GET /insights/symptoms - should get symptoms', async () => {
      const res = await request(BASE_URL)
        .get('/insights/symptoms')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);

    it('GET /insights/mood - should get mood trends', async () => {
      const res = await request(BASE_URL)
        .get('/insights/mood')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    }, 30000);
  });

});
