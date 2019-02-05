import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../server';
import { admin, user } from './testToken';

const should = chai.should();
chai.use(chaiHttp);

describe('USERS', () => {
  it('users should be able to create an account on POST /api/v2/users', (done) => {
    chai.request(app)
      .post('/api/v2/users')
      .send({
        firstname: 'sandra', lastname: 'sandra', othername: 'sandra', email: 'sandra@gmail.com', phonenumber: 2348134766076, password: 'sandra', passportUrl: 'assets/img/profile.jpg', role: 'user',
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('201');
        response.body.should.have.property('data').which.is.an('object').and.has.property('firstname');
        response.body.should.have.property('data').which.is.an('object').and.has.property('lastname');
        done();
      });
  });

  it('users should be able to login on POST /api/v2/login', (done) => {
    chai.request(app)
      .post('/api/v2/login')
      .send({ email: 'sandra@gmail.com', password: 'sandra' })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        response.body.should.have.property('data').which.is.an('object').and.has.property('email');
        done();
      });
  });
});
