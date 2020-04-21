import { fork } from 'redux-saga/effects';
import { createVariationWatcher } from './variations';

export default function* sagas() {
  yield fork(createVariationWatcher);
}
