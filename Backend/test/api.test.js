import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
  it('should return 200 for the root endpoint', (done) => {
    chai
      .request(app)
      .get('/') // Ensure this matches your backend's route
      .end((err, res) => {
        expect(res).to.have.status(200); // Assert a 200 status code
        expect(res.body).to.have.property('message', 'Welcome to the API!');
        done();
      });
  });
});
