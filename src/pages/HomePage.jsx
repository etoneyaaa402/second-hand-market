import React from "react";
import { useGetProductsQuery } from "../store/apiSlice";
import ProductCard from "../components/ProductCard/ProductCard";

export default function HomePage(){
    const {data, error, isLoading } = useGetProductsQuery();
    if (isLoading) return <div>Загрузка товарчика...</div>;
    if(error) return <div>Произошла ошибка при загрузке</div>;
    
    return(
        <section className="catalog-section">
            <div className="product-grid">
                {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}