import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; // Update this path if necessary

chai.use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
  it('should return 200 for the root endpoint', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
