import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* setWatchListSaga(action) {
  try {
    const response = yield axios.get("/api/watchlist/", action.payload);
    yield put({
      type: "SET_WATCHLIST_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "SET_WATCHLIST_FAILURE", error });
  }
}

function* fetchWatchlistSaga(action) {
  // POST /api/watchlist {symbol: 'AAPL'}
  try {
    const response = yield axios.post("/api/watchlist/", action.payload);
    yield put({
      type: "FETCH_WATCHLIST_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "FETCH_WATCHLIST_FAILURE", error });
  }
}

function* watchListSaga() {
  yield takeEvery("SET_WATCHLIST", setWatchListSaga);
  yield takeEvery("FETCH_WATCHLIST", fetchWatchlistSaga);

}

export default watchListSaga;
