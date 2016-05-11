import supertest from 'supertest';
import { expect } from 'chai';
import server from '../server';

const client = supertest.agent('http://localhost:8000');

describe('get', () => {
  before(() => {
    server.start();
  });

  after(() => {
    server.stop();
  });

  it('should get all data for one component ', (done) => {
    client
      .get('/path-to-component')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.error).to.be.false; // eslint-disable-line no-unused-expressions
        done();
      });
  });
});
