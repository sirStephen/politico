import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../server';
import { admin, user } from './testToken';

const should = chai.should();
chai.use(chaiHttp);

describe('PARTY', () => {
  it('user/admin should be able to fetch all parties on GET /api/v2/parties', (done) => {
    chai.request(app)
      .get('/api/v2/parties')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        done();
      });
  });

  it('user/admin should be able to fetch all parties on GET /api/v2/parties', (done) => {
    chai.request(app)
      .get('/api/v2/partie')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        done();
      });
  });

  it('admin should be able to create new parties POST /api/v2/parties', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', admin)
      .send({ partyname: 'pdp', hqAddress: '3, Wegbo Street, Lagos.', createat: 'NOW()' })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('201');
        response.body.should.have.property('data').which.is.an('object').and.has.property('partyname');
        response.body.should.have.property('data').which.is.an('object').and.has.property('hqAddress');
        done();
      });
  });

  it('user should not be able to create new party on POST /api/v2/party', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', user)
      .send({ partyname: 'pdpUSER', hqAddress: '3, Wegbo Street, Lagos.', createat: 'NOW()' })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('when you are not a user/admin, you should not be able to create new party on POST /api/v2/party', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .send({ partyname: 'pdpUSER', hqAddress: '3, Wegbo Street, Lagos.', createat: 'NOW()' })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('auth failed');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v2/parties', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', admin)
      .send({ partyname: '', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, party name is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v2/parties', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', admin)
      .send({ partyname: 'act', hqAddress: '' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, hqAddress is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v2/parties', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', admin)
      .send({ partyname: 'act' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, hqAddress is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v2/parties', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', admin)
      .send({ hqAddress: 'Andela Tower' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, party name is required');
        done();
      });
  });

  it('missing fields in creating a party POST /api/v2/parties', (done) => {
    chai.request(app)
      .post('/api/v2/parties')
      .set('Authorization', admin)
      .send({ partyname: 123, hqAddress: 'Yaba, Lagos' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry,party name must be a string');
        done();
      });
  });

  it('user/admin should be able to fetch a particular party on GET /api/v2/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v2/parties/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        done();
      });
  });

  it('when the endpoint is an integer GET /api/v2/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v2/parties/2a')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id must be an integer');
        done();
      });
  });

  it('when the endpoint is invalid GET /api/v2/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v2/parties/1000')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id was not found');
        done();
      });
  });

  it('admin should be able to update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/4')
      .set('Authorization', admin)
      .send({ partyname: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        response.body.should.have.property('data').which.is.an('object').and.has.property('partyname');
        response.body.should.have.property('data').which.is.an('object').and.has.property('hqAddress');
        response.body.should.have.property('data');
        response.body.should.have.property('data').which.is.an('object').and.has.property('id');
        response.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to update party PUT /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/4')
      .set('Authorization', user)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('when it is not a user/admin to update party PUT /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/4')
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('auth failed');
        done();
      });
  });

  it('admin should not be able to update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/1000')
      .set('Authorization', admin)
      .send({ partyname: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id was not found');
        done();
      });
  });

  it('missing fields in update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/1000')
      .set('Authorization', admin)
      .send({ partyname: '', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, party name is required');
        done();
      });
  });

  it('missing fields in update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/1000')
      .set('Authorization', admin)
      .send({ partyname: 'pdp', hqAddress: '' })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, hqAddress is required');
        done();
      });
  });

  it('id must be an integer in update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v2/parties/as')
      .set('Authorization', admin)
      .send({ partyname: 'pdp', hqAddress: '3, Wegbo Street' })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id must be an integer');
        done();
      });
  });
});
