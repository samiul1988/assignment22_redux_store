import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectCurrentCategory, updateProducts } from '../../redux/slices/rootSlice'; // redux based actions and selectors
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif"

function ProductList() {
    const products = useSelector(selectProducts);
    const currentCategory = useSelector(selectCurrentCategory);
    const dispatch = useDispatch();
    const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if there's data to be stored
    if(data) {
        // let's store it in the redux store
        dispatch(updateProducts(data.products));
        // but let's also take each product and save it to IndexedDB using the helper function 
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
    // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) { // Without internet connection
        // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set redux store for offline browsing
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
        return products;
    }

    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
