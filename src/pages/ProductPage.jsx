import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../store/apiSlice";
import { addToCart } from "../store/cartSlice";
import './ProductPage.css';

const shippingOptions = [
    {country: 'Germany', price: 5.00},
    {country: 'France', price: 9.00},
    {country: 'Italy', price: 7.00},
    {country: 'Spain', price: 5.00},
    {country: 'USA', price: 15.00},
];

export default function ProductPage(){
    const {id}=useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {data: product,isLoading,error}=useGetProductByIdQuery(id);
    const isInCart = useSelector((state)=>state.cart.items.includes(Number(id)));
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
    if (isLoading) {
        return <div className="loader">Loading product...</div>
    }
    if (error) {
        return <div className="error">Product not found.</div>
    }

    return(
        <div className="product-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                &lt; Back to catalog
            </button>
            <div className="card-header">
                <div className="header-info-item">
                    <span className="info-label">Category</span>
                    <span className="info-value">{product.category}</span>
                </div>
                <div className="header-info-item">
                    <span className="info-label">Brand</span>
                    <span className="info-value">{product.brand || 'Second Hand'}</span>
                </div>
                <div className="header-info-item">
                    <span className="info-label">Availability</span>
                    <span className="info-value">In Stock</span>
                </div>
            </div>
            <div className="product-content">
                <div className="product-image-section">
                    <img src={product.thumbnail} alt={product.title}/>
                </div>
                
                <div className="product-info-section">
                    <h1 className="detail-title">{product.title}</h1>
                    
                    <p className="detail-description">
                    {product.description || 'No detailed description available for this unique item.'}
                    </p>

                    <div className="detail-grid">
                        <div className="grid-item">
                            <span className="label">Price:</span>
                            <span className="value price">{product.price.toLocaleString()} €</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Color:</span>
                            <span className="value">Mixed (Default)</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Size:</span>
                            <span className="value">Universal</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Delivery:</span>
                            <span className="value">1-5 working days</span>
                        </div>
                    </div>

                    <div className="shipping-selector">
                        <label>Shipping to:</label>
                        <select 
                            value={selectedShipping.country} 
                            onChange={(e) => setSelectedShipping(shippingOptions.find(opt => opt.country === e.target.value))}
                        >
                            {shippingOptions.map(opt => (
                            <option key={opt.country} value={opt.country}>{opt.country}</option>
                            ))}
                        </select>
                        <p className="shipping-cost">
                            Shipping cost from <strong>{selectedShipping.price.toFixed(2)} €</strong>
                        </p>
                    </div>

                    <div className="detail-actions">
                        <button className="buy-now-btn">Buy Now</button>
                        <button 
                            className={`add-to-cart-btn ${isInCart ? 'added' : ''}`}
                            onClick={() => dispatch(addToCart(product.id))}
                            disabled={isInCart}
                        >
                            {isInCart ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}