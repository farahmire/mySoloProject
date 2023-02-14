import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchChartData(action) {
    try {
      const response = yield axios.get('/api/charts', action.payload);
      // const response = yield axios.get(`/api/stock?symbol=${action.payload}`);
      yield put({ 
        type: 'FETCH_CHART_DATA_SUCCESS', 
        payload: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_CHART_DATA_FAILURE', error });
      }
    }

function* chartSaga() {
  yield takeEvery('FETCH_CHART_DATA', fetchChartData);
}

export default chartSaga;