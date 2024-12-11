const request = require('supertest'); // Import supertest
const app = require('../app'); // Import your Express app

describe('GET /tasks', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app).get('/api/v1/tasks');
    expect(response.statusCode).toBe(200); // Adjust based on your API's response
  });
});
