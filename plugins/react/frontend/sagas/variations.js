import { takeLatest } from 'redux-saga';
import { CREATE_VARIATION } from '../actions/variations';

function createVariationWorker() {
  // whatever we need to do to create variation
}

export function* createVariationWatcher() {
  yield takeLatest(CREATE_VARIATION, createVariationWorker);
}
