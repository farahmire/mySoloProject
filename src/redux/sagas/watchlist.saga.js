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

    const response = yield axios.get("/api/watchlist/");
    console.log("THIS IS THE FETCH RESPONSE", response.data)
    yield put({
      type: "FETCH_WATCHLIST_SUCCESS",
      payload: response.data
    });
  } catch (error) {
    yield put({ type: "FETCH_WATCHLIST_FAILURE", error });
  }
}

function* deleteStockSaga(action) {
  try {
    const id = action.payload.id;
    console.log('THIS IS THE DELETE SAGA id', action.payload.id)
    const response = yield axios.delete ( `/api/watchlist/${id}`);
    yield put({ 
      type: "DELETE_STOCK_SUCCESS", 
      payload: response.data.id });
  } catch (error) {
    console.error(error);
    yield put({ type: "DELETE_STOCK_ERROR", error });
  }
}

function* updateStockSaga(action) {
  try {
    const id = action.payload.id;
    console.log('THIS IS THE UPDATE SAGA id', action.payload.id)
    const response = yield axios.put ( `/api/watchlist/${id}`);
    yield put({ 
      type: "UPDATE_STOCK_SUCCESS", 
      payload: response.data.id });
  } catch (error) {
    console.error(error);
    yield put({ type: "UPDATE_STOCK_ERROR", error });
  }
}

function* watchListSaga() {
  yield takeEvery("SET_WATCHLIST", setWatchListSaga);
  yield takeEvery("FETCH_WATCHLIST", fetchWatchlistSaga);
  yield takeEvery("DELETE_STOCK_FROM_WATCHLIST", deleteStockSaga);
  yield takeEvery("UPDATE_STOCK_FROM_WATCHLIST", updateStockSaga);
}

export default watchListSaga;
