import { all, fork } from 'redux-saga/effects';
import todoSaga from './todoSaga'; // We will create this file later

export default function* rootSaga() {
    yield all([
        fork(todoSaga),
    ]);
}