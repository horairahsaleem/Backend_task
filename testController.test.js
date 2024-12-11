const request = require('supertest'); 
const app = require('../app'); 

describe('GET /tasks', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app).get('/api/v1/tasks');
    expect(response.statusCode).toBe(200); 
  });
});
