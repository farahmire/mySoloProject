import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchStockData(action) {
    try {
      const response = yield axios.post('/api/stock/', action.payload);
      // const response = yield axios.get(`/api/stock?symbol=${action.payload}`);
      yield put({ 
        type: 'FETCH_STOCK_DATA_SUCCESS', 
        payload: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_STOCK_DATA_FAILURE', error });
      }
    }

function* stockSaga() {
  yield takeLatest('FETCH_STOCK_DATA', fetchStockData);
}

export default stockSaga;