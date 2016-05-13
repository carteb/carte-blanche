import supertest from 'supertest';
import path from 'path';
import { expect } from 'chai';
import fs from 'fs';
import rimraf from 'rimraf';

const port = 8000;
const projectBasePath = __dirname;
const variationsBasePath = path.join(__dirname, 'variations');
const request = supertest.agent(`http://localhost:${port}`);

describe('variations server', () => {
  let server;

  beforeEach(() => {
    delete require.cache[require.resolve('./server')];
    server = require('../server'); // eslint-disable-line global-require
    server.start(projectBasePath, variationsBasePath, port);
  });

  afterEach((done) => {
    server.stop(done);
  });

  describe('get', () => {
    it('should get all data for a valid component with variations data', (done) => {
      request
        .get('/components/ComponentA.js')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.error).to.be.false; // eslint-disable-line no-unused-expressions
          expect(res.body.data).to.include.keys(['firstVariation', 'secondVariation']);

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
      request
        .get('/components/ComponentNotAvailable.js')
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('delete', () => {
    it('should remove the variation', (done) => {
      const variationPath = path.join(variationsBasePath, 'ComponentA', 'toBeRemoved.js');
      fs.closeSync(fs.openSync(variationPath, 'w'));

      request
        .delete('/components/ComponentA.js?variation=toBeRemoved.js')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should fail in case the component does not exist', (done) => {
      request
        .delete('/components/ComponentNotAvailable.js')
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('should fail in case the variation does not exist', (done) => {
      request
        .delete('/components/ComponentA.js?variation=notAvailableVariation.js')
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('post', () => {
    describe('write new variation', () => {
      const variationComponentPath = path.join(variationsBasePath, 'ComponentB');
      const variationPath = path.join(variationComponentPath, 'newVariation.js');
      const code = `{
        props: {
          name: {
            value: 'Ada Lovelace',
          },
          onClick: {
            value: () => true,
          },
        },
      };`;

      afterEach((done) => {
        rimraf(variationComponentPath, done);
      });

      it('should create a new file with the provided data', (done) => {
        request
          .post('/components/ComponentB/index.js')
          .type('json')
          .send({
            variation: 'newVariation.js',
            code,
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            fs.readFile(variationPath, { encoding: 'utf8' }, (_, fileContent) => {
              expect(`module.exports = ${code}`).to.equal(fileContent);
              done();
            });
          });
      });
    });

    describe('overwrite existing variation', () => {
      const variationPath = path.join(variationsBasePath, 'ComponentA', 'existingVariation.js');
      const code = `{
        props: {
          name: {
            value: 'Marie Curie',
          },
          onSelect: {
            value: () => true,
          },
        },
      };`;

      afterEach((done) => {
        fs.unlink(variationPath, () => {
          done();
        });
      });

      it('should overwrite the existing file with the provided data', (done) => {
        fs.closeSync(fs.openSync(variationPath, 'w'));

        request
          .post('/components/ComponentA.js')
          .type('json')
          .send({
            variation: 'existingVariation.js',
            code,
          })
          .expect(200)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            fs.readFile(variationPath, { encoding: 'utf8' }, (_, fileContent) => {
              expect(`module.exports = ${code}`).to.equal(fileContent);
              done();
            });
          });
      });
    });

    it('should fail in case the component does not exist', (done) => {
      request
        .post('/components/ComponentNotAvailable.js')
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
