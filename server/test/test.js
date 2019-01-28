import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../server';
import { admin, user } from './testToken';

const should = chai.should();
chai.use(chaiHttp);

describe('PARTY', () => {
  it('admin should be able to create new party on POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('data').which.is.an('object').and.has.property('partyName');
        response.body.should.have.property('data').which.is.an('object').and.has.property('hqAddress');
        response.body.should.have.property('data').which.is.an('object').and.has.property('id');
        done();
      });
  });

  it('user should not be able to create new party on POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', user)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('user/admin should be able to get all party on GET /api/v1/parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('data');
        done();
      });
  });
});
