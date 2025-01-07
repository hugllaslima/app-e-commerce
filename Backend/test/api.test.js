import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; // Ensure you add .js for ESM imports

chai.use(chaiHttp);
const { expect } = chai;

describe('API Endpoints', () => {
  it('should return 200 for the product listings endpoint', (done) => {
    chai.request(app)
      .get('/api/products') // Replace with your actual product endpoint
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array'); // Assuming products are returned as an array
        done();
      });
  });

  it('should return 404 for a non-existent route', (done) => {
    chai.request(app)
      .get('/api/non-existent')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
