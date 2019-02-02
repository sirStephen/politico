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

  it('admin should be able to create new parties POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ partyname: 'pdp', hqAddress: '3, Wegbo Street, Lagos.', createat: 'NOW()' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('201');
        response.body.should.have.property('data').which.is.an('object').and.has.property('partyname');
        response.body.should.have.property('data').which.is.an('object').and.has.property('hqAddress');
        done();
      });
  });

  it('user should not be able to create new party on POST /api/v1/party', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', user)
      .send({ partyname: 'pdpUSER', hqAddress: '3, Wegbo Street, Lagos.', createat: 'NOW()' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('when you are not a user/admin, you should not be able to create new party on POST /api/v1/party', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send({ partyname: 'pdpUSER', hqAddress: '3, Wegbo Street, Lagos.', createat: 'NOW()' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('auth failed');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ partyname: '', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, party name is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ partyname: 'act', hqAddress: '' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, hqAddress is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ partyname: 'act' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, hqAddress is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ hqAddress: 'Andela Tower' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, party name is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v1/parties', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .set('Authorization', admin)
      .send({ partyname: 123, hqAddress: 'Yaba, Lagos' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry,party name must be a string');
        done();
      });
  });
});
