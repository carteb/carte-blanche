import { takeLatest } from 'redux-saga';
import { CREATE_VARIATION } from '../actions/variations';

function createVariationWorker() {
  console.log('ici');
}

export function* createVariationWatcher() {
  yield takeLatest(CREATE_VARIATION, createVariationWorker);
}
