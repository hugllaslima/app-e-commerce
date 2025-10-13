const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../server'); // Adjust the path if necessary

chai.use(chaiHttp);

describe('API Tests', () => {
  it('should return 200 for the root endpoint', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Welcome to the API!');
        done();
      });
  });
});
