import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../server';
import { admin, user } from './testToken';

const should = chai.should();
chai.use(chaiHttp);

describe('PARTY', () => {
  it('user/admin should be able to fetch all parties on GET /api/v1/parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        done();
      });
  });
});
