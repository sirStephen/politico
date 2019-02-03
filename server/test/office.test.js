import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../server';
import { admin, user } from './testToken';

const should = chai.should();
chai.use(chaiHttp);

describe('OFFICE', () => {
  it('admin should be able to create new office on POST /api/v2/office', (done) => {
    chai.request(app)
      .post('/api/v2/office')
      .set('Authorization', admin)
      .send({ officename: 'president', type: 'federal', createat: 'NOW()' })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('201');
        response.body.should.have.property('data').which.is.an('object').and.has.property('type');
        response.body.should.have.property('data').which.is.an('object').and.has.property('officename');
        done();
      });
  });

  it('user/admin should be able to fetch all office on GET /api/v2/office', (done) => {
    chai.request(app)
      .get('/api/v2/office')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eql('200');
        done();
      });
  });

  it('user/admin should be able to fetch all office on GET /api/v2/office', (done) => {
    chai.request(app)
      .get('/api/v2/offic')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.a('object');
        done();
      });
  });
});
