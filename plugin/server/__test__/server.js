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

  // GET
  // verify that the component for the provided path exists
  // find the relevant data for the specific component
  // if the component exists
  //    take all the variations from he different file and combine them into one response as array
  // if provide an empty array

  // DELETE (removes a variation)
  // verify that the component for the provided path exists
  // identify the variation based on the query parameter variation
  // verify that this variation exists and remove it

  // POST (acts as create or update of a variation)
  // verify that the component for the provided path exists
  // if the variation based on the parameter in the data doesn't exists create the file
  // write the provided data to the file
});
