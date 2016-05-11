import supertest from 'supertest';
import { expect } from 'chai';

const client = supertest.agent('http://localhost:8000');

describe('get', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('./server')];
    server = require('../server'); // eslint-disable-line global-require
    server.start();
  });

  afterEach((done) => {
    server.stop(done);
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
