import supertest from 'supertest';
import path from 'path';
import { expect } from 'chai';

const componentBasePath = path.join(__dirname, 'components');
const variationsBasePath = path.join(__dirname, 'variations');
const client = supertest.agent('http://localhost:8000');

describe('get', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('./server')];
    server = require('../server'); // eslint-disable-line global-require
    server.start(componentBasePath, variationsBasePath);
  });

  afterEach((done) => {
    server.stop(done);
  });

  it('should get all data for a valid component with variations data', (done) => {
    client
      .get('/ComponentA.js')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.error).to.be.false; // eslint-disable-line no-unused-expressions
        expect(res.body.data).to.have.keys(['firstState', 'secondState']);

        let firstState;
        eval(`firstState = ${res.body.data.firstState}`); // eslint-disable-line no-eval
        const expected = {
          props: {
            className: {
              value: 'component-a',
            },
            age: {
              value: 22,
              min: 0,
              max: 140,
            },
          },
          state: {
            focusedAge: {
              value: 19,
              min: 0,
              max: 140,
            },
          },
        };
        expect(firstState).to.deep.equal(expected); // eslint-disable-line no-undef

        let secondState;
        eval(`secondState = ${res.body.data.secondState}`); // eslint-disable-line no-eval
        const secondExpected = {
          props: {
            age: {
              value: null,
            },
          },
          state: {
            focusedAge: {
              value: 10,
            },
          },
        };
        expect(secondState).to.deep.equal(secondExpected); // eslint-disable-line no-undef
        done();
      });
  });

  it('should return an empty data object in case ', (done) => {
    client
      .get('/ComponentNotAvailable')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).to.deep.equal({});
        done();
      });
  });

  // DELETE (removes a variation)
  // verify that the component for the provided path exists
  // identify the variation based on the query parameter variation
  // verify that this variation exists and remove it

  // POST (acts as create or update of a variation)
  // verify that the component for the provided path exists
  // if the variation based on the parameter in the data doesn't exists create the file
  // write the provided data to the file
});
