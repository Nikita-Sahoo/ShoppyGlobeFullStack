import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setLoading, setError } from '../redux/productSlice';

const useFetchProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    fetchProducts();
  }, [dispatch]);
};

export default useFetchProducts;