import supertest from 'supertest';
import path from 'path';
import { expect } from 'chai';
import fs from 'fs';

const port = 8000;
const componentBasePath = path.join(__dirname, 'components');
const variationsBasePath = path.join(__dirname, 'variations');
const client = supertest.agent(`http://localhost:${port}`);

describe('variations server', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('./server')];
    server = require('../server'); // eslint-disable-line global-require
    server.start(componentBasePath, variationsBasePath, port);
  });

  afterEach((done) => {
    server.stop(done);
  });

  describe('get', () => {
    it('should get all data for a valid component with variations data', (done) => {
      client
        .get('/ComponentA.js')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.error).to.be.false; // eslint-disable-line no-unused-expressions
          expect(res.body.data).to.have.keys(['firstVariation', 'secondVariation']);

          let firstVariation;
          eval(`firstVariation = ${res.body.data.firstVariation}`); // eslint-disable-line no-eval
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
          expect(firstVariation).to.deep.equal(expected); // eslint-disable-line no-undef

          let secondVariation;
          eval(`secondVariation = ${res.body.data.secondVariation}`); // eslint-disable-line no-eval
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
          expect(secondVariation).to.deep.equal(secondExpected); // eslint-disable-line no-undef
          done();
        });
    });

    it('should return an empty data object in case the component does not exist', (done) => {
      client
        .get('/ComponentNotAvailable.js')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.deep.equal({});
          done();
        });
    });
  });

  describe('delete', () => {
    it('should remove the variation', (done) => {
      const variationPath = path.join(variationsBasePath, 'ComponentA', 'toBeRemoved.js');
      fs.closeSync(fs.openSync(variationPath, 'w'));

      client
        .delete('/ComponentA.js?variation=toBeRemoved.js')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should fail in case the component does not exist', (done) => {
      client
        .delete('/ComponentNotAvailable.js')
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should fail in case the variation does not exist', (done) => {
      client
        .delete('/ComponentA.js?variation=notAvailableVariation.js')
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  // POST (acts as create or update of a variation)
  // verify that the component for the provided path exists
  // if the variation based on the parameter in the data doesn't exists create the file
  // write the provided data to the file
});
