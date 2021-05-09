import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Cart from "../components/Cart";
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectProducts, 
    selectCart, 
    removeFromCart, 
    updateCartQuantity, 
    addToCart, 
    updateProducts 
} from '../redux/slices/rootSlice'; // redux based actions and selectors
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'

function Detail() {
    const products = useSelector(selectProducts);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();    
    const { id } = useParams();
    const [currentProduct, setCurrentProduct] = useState({});
    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        // already in global store
        if (products.length) {
            setCurrentProduct(products.find(product => product._id === id));
        }
        // retrieved from server
        else if (data) {
            dispatch(updateProducts(data.products));

            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch(updateProducts(indexedProducts));
            });
        }
    }, [products, data, loading, dispatch, id]);

    const addItemToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch(updateCartQuantity({
                _id: id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            }));
            
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }));
            
            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        }
    }

    const removeItemFromCart = () => {
        dispatch(removeFromCart(currentProduct._id));

        idbPromise('cart', 'delete', { ...currentProduct });
    };

    return (
        <>
            {currentProduct && cart ? (
                <div className="container my-1">
                    <Link to="/">
                        ← Back to Products
                    </Link>

                    <h2>{currentProduct.name}</h2>
                    <p>{currentProduct.description}</p>
                    <p>
                        <strong>Price:</strong>
                        ${currentProduct.price}
                        {" "}
                        <button onClick={addItemToCart}>
                            Add to Cart
                        </button>
                        <button
                            disabled={!cart.find(p => p._id === currentProduct._id)}
                            onClick={removeItemFromCart}
                        >
                            Remove from Cart
                        </button>
                    </p>
                    <img
                        src={`/images/${currentProduct.image}`}
                        alt={currentProduct.name}
                    />
                </div>
            ) : null}
            {
                loading ? <img src={spinner} alt="loading" /> : null
            }
            <Cart />
        </>
    );
};

export default Detail;
