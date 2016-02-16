import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

process.env.NODE_ENV = 'test';

chai.use(dirtyChai);
chai.use(sinonChai);
