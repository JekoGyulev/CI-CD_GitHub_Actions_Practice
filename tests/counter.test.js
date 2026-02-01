const request = require('supertest');
const app = require('../server');

describe('Counter API', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('should increment counter', async () => {
    const res1 = await request(app).get('/api/counter');
    const initial = res1.body.counter;

    const res2 = await request(app).post('/api/counter/increment');
    expect(res2.body.counter).toBe(initial + 2);
  });
});