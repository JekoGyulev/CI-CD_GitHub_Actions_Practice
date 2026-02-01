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
    expect(res2.body.counter).toBe(initial + 1);
  });

  it('should return number', async() => {
    const res = await request(app).get('/api/counter');
    const counter = res.body.counter;

    expect(typeof counter).toBe('number');
  });

  it('should reset counter to 0', async() => {
    const res = await request(app).patch('/api/counter/reset');
    const counter = res.body.counter;
    
    expect(counter).toBe(0);
  });
});