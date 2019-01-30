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

  it('user/admin should be able to fetch a particular party on GET /api/v1/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v1/parties/2')
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('data').which.is.an('object').and.has.property('partyName');
        response.body.should.have.property('data').which.is.an('object').and.has.property('hqAddress');
        response.body.should.have.property('data').which.is.an('object').and.has.property('id');
        response.body.should.have.property('data');
        done();
      });
  });

  it('user/admin try to fetch a particular party with an invalid id on GET /api/v1/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v1/parties/1000')
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Sorry, the party id was not found');
        done();
      });
  });

  it('user/admin try to fetch a particular party with an invalid id that is not a number on GET /api/v1/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v1/parties/a')
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Sorry, the party id must be an integer');
        done();
      });
  });

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

  it('admin/user should not be able to get a party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .get('/api/v1/parties/a')
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eql('Sorry, the party id must be an integer');
        done();
      });
  });

  it('admin should be able to delete parties DELETE /api/v1/parties/:id', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set('Authorization', admin)
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        response.body.should.have.property('data').eql('The party was deleted successfully');
        done();
      });
  });

  it('user should not be able to delete parties DELETE /api/v1/parties/:id', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .set('Authorization', user)
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('admin should be able to delete parties DELETE /api/v1/parties/:id', (done) => {
    chai.request(app)
      .delete('/api/v1/parties/1a')
      .set('Authorization', admin)
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id must be an integer');
        done();
      });
  });

  it('admin should be able to update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v1/parties/4')
      .set('Authorization', admin)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        response.body.should.have.property('data').which.is.an('object').and.has.property('partyName');
        response.body.should.have.property('data').which.is.an('object').and.has.property('hqAddress');
        response.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v1/parties/4')
      .set('Authorization', user)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('admin should not be able to update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v1/parties/1000')
      .set('Authorization', admin)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id was not found');
        done();
      });
  });

  it('missing fields in update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v1/parties/1000')
      .set('Authorization', admin)
      .send({ partyName: '', hqAddress: '3, Wegbo Street, Lagos.' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, party name is required');
        done();
      });
  });

  it('missing fields in update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v1/parties/1000')
      .set('Authorization', admin)
      .send({ partyName: 'pdp', hqAddress: '' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, hqAddress is required');
        done();
      });
  });

  it('id must be an integer in update party /api/v1/parties/:id', (done) => {
    chai.request(app)
      .put('/api/v1/parties/as')
      .set('Authorization', admin)
      .send({ partyName: 'pdp', hqAddress: '3, Wegbo Street' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(404);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('404');
        response.body.should.have.property('message').eql('Sorry, the party id must be an integer');
        done();
      });
  });
});

describe('OFFICE', () => {
  it('admin should be able to create new office on POST /api/v1/office', (done) => {
    chai.request(app)
      .post('/api/v1/office')
      .set('Authorization', admin)
      .send({ type: 'federal', officeName: 'president' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('data').which.is.an('object').and.has.property('type');
        response.body.should.have.property('data').which.is.an('object').and.has.property('officeName');
        response.body.should.have.property('data').which.is.an('object').and.has.property('id');
        done();
      });
  });

  it('user should not be able to create new office on POST /api/v1/office', (done) => {
    chai.request(app)
      .post('/api/v1/office')
      .set('Authorization', user)
      .send({ type: 'federal', officeName: 'president' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('401');
        response.body.should.have.property('message').eql('you are not authorized');
        done();
      });
  });

  it('validation for create new office on POST /api/v1/office', (done) => {
    chai.request(app)
      .post('/api/v1/office')
      .set('Authorization', admin)
      .send({ type: '', officeName: 'president' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, type is required');
        done();
      });
  });

  it('validation for create new office on POST /api/v1/office', (done) => {
    chai.request(app)
      .post('/api/v1/office')
      .set('Authorization', admin)
      .send({ type: 'federal', officeName: '' })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('400');
        response.body.should.have.property('message').eql('Sorry, office name is required');
        done();
      });
  });
})
