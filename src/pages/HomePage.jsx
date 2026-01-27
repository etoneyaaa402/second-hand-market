import React, { useMemo } from "react";
import { useGetProductsByCategoryQuery, useGetProductsQuery } from "../store/apiSlice";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterSection from '../components/FilterSection/FilterSection';

export default function HomePage(){
    const {selectedCategory, activeFilters, sortOrder} = useSelector((state)=> state.filters);
    const allProducts = useGetProductsQuery(30,{skip: !!selectedCategory});
    const categoryProducts = useGetProductsByCategoryQuery(selectedCategory, {skip: !selectedCategory});
    
    const {data, error, isLoading, isFetching} = selectedCategory ? categoryProducts : allProducts;
    
    if(error) return <div className="error">Произошла ошибка при загрузке</div>;
    
    const filteredProducts = useMemo(()=>{
        if (!data?.products) {
            return [];
        }
        let result = [...data.products];
        if (activeFilters.length>0) {
            result=result.filter(product=>{
                return activeFilters.every(filter => {
                    return product.brand 
                        ? product.brand.toLowerCase().includes(filter.label.toLowerCase())
                        : false;
                });
            });
        }
        result.sort((a,b)=>{
            return sortOrder === 'asc' ? a.price-b.price : b.price-a.price;
        });
        return result;
    }, [data,activeFilters,sortOrder]);

    if (isLoading || isFetching) return <div className="loader">Загрузка товарчика...</div>;

    return(
        <section className="catalog-section">
            <FilterSection />
            <div className="catalog-header">
                <h2>{selectedCategory ? selectedCategory.replace('-', ' ') : 'All Products'}</h2>
            </div>
            <div className="product-grid">
                {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="no-results">No products match your filters.</div>
            )}
        </section>
    );
}