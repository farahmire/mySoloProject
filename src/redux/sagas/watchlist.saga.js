import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchWatchListSaga(action) {
  try {
    const response = yield axios.post("/api/watchlist/", action.payload);
    yield put({
      type: "FETCH_STOCK_DATA_SUCCESS",
      payload: {
        symbol: action.payload.symbol,
        name: response.data.name,
        currentPrice: response.data.currentPrice,
      },
    });
  } catch (error) {
    yield put({ type: "FETCH_STOCK_DATA_FAILURE", error });
  }
}

function* watchListSaga() {
  yield takeLatest("FETCH_WATCHLIST", fetchWatchListSaga);
}

export default watchListSaga;
