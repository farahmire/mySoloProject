import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SearchComponent = ({ symbol }) => {
  const { stockData, loading, error } = useSelector((state) => state.stockData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_STOCK_DATA', symbol });
  }, [dispatch, symbol]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <p>Current price: {stockData.c}</p>
    </>
  );
};

export default SearchComponent;




