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

  it('should disable increment and reset counter buttons', async () => {

    const res = await request(app).post('/api/counter/toggle');
    const counterEnabled = res.body.enabled;

    expect(counterEnabled).toBe(false);
  });

  it('should stay 1 after being disabled', async () => {

    const res = await request(app).post('/api/counter/increment');
    const counter = res.body.counter;

    const resToggle = await request(app).post('/api/counter/toggle');
    const isEnabled = resToggle.body.enabled;

    await request(app).post('/api/counter/increment');

    expect(counter).toBe(1);
    expect(isEnabled).toBe(true);
  });


});