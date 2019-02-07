import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../server';
import { admin, user } from './testToken';

const should = chai.should();
chai.use(chaiHttp);

describe('USERS', () => {
  it('users should be able to create an account on POST /api/v2/auth/signup', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send({
        firstname: 'sandra', lastname: 'sandra', othername: 'sandra', email: 'sandra@gmail.com', phonenumber: 2348134766076, password: 'sandras', passportUrl: 'assets/img/profile.jpg', role: 'user',
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

  it('users firstname is required /api/v2/users', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send({
        firstname: '', lastname: 'sandra', othername: 'sandra', email: 'sandra@gmail.com', phonenumber: 2348134766076, password: 'sandra', passportUrl: 'assets/img/profile.jpg', role: 'user',
      })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, firstname name is required');
        done();
      });
  });

  it('users firstname is required /api/v2/auth/signup', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send({
        firstname: 'sandra', lastname: '', othername: 'sandra', email: 'sandra@gmail.com', phonenumber: 2348134766076, password: 'sandras', passportUrl: 'assets/img/profile.jpg', role: 'user',
      })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, lastname is required');
        done();
      });
  });

  it('users should be able to login on POST /api/v2/auth/login', (done) => {
    chai.request(app)
      .post('/api/v2/auth/login')
      .send({ email: 'sandra@gmail.com', password: 'sandras' })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        response.body.should.have.property('data').which.is.an('object').and.has.property('email');
        done();
      });
  });
});
