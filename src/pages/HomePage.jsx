import React from "react";
import { useGetProductsByCategoryQuery, useGetProductsQuery } from "../store/apiSlice";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";

export default function HomePage(){
    const selectedCategory = useSelector((state)=> state.filters.selectedCategory);
    const allProducts = useGetProductsQuery(7,{skip: !!selectedCategory});
    const categoryProducts = useGetProductsByCategoryQuery(selectedCategory, {skip: !selectedCategory});
    
    const {data, error, isLoading, isFetching} = selectedCategory ? categoryProducts : allProducts;
    console.log('Current category:', selectedCategory);
    console.log('Fetched data:', data);
    
    if (isLoading || isFetching) return <div className="loader">Загрузка товарчика...</div>;
    if(error) return <div className="error">Произошла ошибка при загрузке</div>;
    
    const products = data?.products || [];
    return(
        <section className="catalog-section">
            <div className="catalog-header">
                <h2>{selectedCategory ? selectedCategory.replace('-', ' ') : 'All Products'}</h2>
            </div>
            {products.length > 0 ? (
                <div className="product-grid">
                    {data?.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="empty-message">Нет товаров в этой категории</div>
            )}
        </section>
    );
}