import React from "react";
import './ProductCard.css';
import { addToCart } from "../../store/cartSlice";
import { toggleWishlist } from "../../store/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const HeartIcon = ({isLiked}) => (
    <svg width="20" height="20" viewBox="0 0 24 24" 
    fill={isLiked ? "red" : "black"} stroke={isLiked ? "red" : "black"} strokeWidth="2"
    style={{transition: 'all 0.3s ease'}}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

export default function ProductCard({product}){
    const dispatch = useDispatch();
    const isNew = product.id % 2 === 0;
    const isReserved = product.id % 3 === 0;
    const isInCart = useSelector((state)=>state.cart.items.includes(product.id));
    const isLiked = useSelector((state) => state.wishlist.items.includes(product.id));

    const handleCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product.id));
    };

    const handleHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product.id));
    };

    return(
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-main-link">
                <div className="product-image-wrapper">
                    <img src={product.thumbnail} alt={product.title} className="product-image" />
                    <button className="heart-button" onClick={handleHeartClick}>
                        <HeartIcon isLiked={isLiked}/>
                    </button>
                    <div className="badges-container">
                        {isNew && <span className="badge badge-new">New</span>}
                        {isReserved && <span className="badge badge-reserved">Reserved</span>}
                    </div>
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.title}-{product.brand}</h3>
                    <div className="product-footer">
                        <span className="product-price">{product.price.toLocaleString('de-DE')}$</span>
                        <button className={`cart-button ${isInCart ? 'added' : ''}`}
                        onClick={handleCartClick}
                        disabled={isInCart}
                        >
                            {isInCart ? <span className="added-text">Added</span> : <CartIcon/>}    
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}