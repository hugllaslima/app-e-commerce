const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../dist/server.js'); // Adjust the path to your server file if necessary

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return 200 for the root endpoint', (done) => {
    chai
      .request(app)
      .get('/') // Replace with your actual API endpoint
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          done();
        }
      });
  });
});
