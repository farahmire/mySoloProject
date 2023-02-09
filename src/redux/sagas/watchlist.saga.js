import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* setWatchListSaga(action) {
  try {
    console.log("THIS IS THE SET WATCHLIST SAGA PAYLOAD", action.payload)
    const response = yield axios.post("/api/watchlist/", {symbol: action.payload});
    console.log('RESPONSE for SET WATCHLIST SAGA', response.data)
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
    console.log("THIS IS THE FETCH SAGA PAYLOAD", action.payload)

    const response = yield axios.get("/api/watchlist/", {symbol: action.payload});
    yield put({
      type: "FETCH_WATCHLIST_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "FETCH_WATCHLIST_FAILURE", error });
  }
}

function* watchListSaga() {
  yield takeLatest("SET_WATCHLIST", setWatchListSaga);
  yield takeLatest("FETCH_WATCHLIST", fetchWatchlistSaga);

}

export default watchListSaga;
