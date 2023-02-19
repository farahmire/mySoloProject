import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchChartData(action) {
    const symbol = action.payload;
    console.log("THIS IS CHART ACTION PAYLOAD", action.payload);
    try {
        
      const response = yield axios.post('/api/charts', {symbol: symbol});
      // const response = yield axios.get(`/api/stock?symbol=${action.payload}`);
    console.log("THIS IS CHART response.data",response);

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