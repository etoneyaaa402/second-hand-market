import React, { useMemo } from "react";
import { useGetProductsByCategoryQuery, useGetProductsQuery, useSearchProductsQuery } from "../store/apiSlice";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterSection from '../components/FilterSection/FilterSection';

export default function HomePage(){
    const {selectedCategory, activeFilters, sortOrder, searchQuery} = useSelector((state)=> state.filters);

    const searchResult = useSearchProductsQuery({ q: searchQuery, limit: 100 }, { skip: !searchQuery });
    const allProducts = useGetProductsQuery(100,{skip: !!selectedCategory});
    const categoryProducts = useGetProductsByCategoryQuery(selectedCategory, {skip: !selectedCategory});
    
    const {data, error, isLoading, isFetching} = searchQuery ? searchResult : (selectedCategory ? categoryProducts : allProducts);
    
    if(error) return <div className="error">Произошла ошибка при загрузке</div>;
    
    const filteredProducts = useMemo(()=>{
        if (!data?.products) {
            return [];
        }
        let result = [...data.products];

        if (activeFilters.length>0) {
            result=result.filter(product=>{
                return activeFilters.every(filter => {
                    const type = filter.type.toLowerCase();
                    const val = filter.label; 
                    if(type === 'rating'){
                        const productRating = Math.round(product.rating || 0);
                        return productRating === parseInt(val);
                    }
                    if(type === 'weight'){
                        const productWeight = Math.round(product.weight || 0);
                        return productWeight === parseInt(val);
                    }
                    if (type === 'brand') {
                        const productBrand = (product.brand || "").toLowerCase().trim();
                        const filterBrand = val.toLowerCase().trim();
                        return productBrand === filterBrand;
                    }
                    return true;
                });
            });
        }
        result.sort((a,b)=>{
            return sortOrder === 'asc' ? a.price-b.price : b.price-a.price;
        });
        return result;
    }, [data,activeFilters,sortOrder]);

    console.log(`Поиск/Категория выдали: ${data?.products?.length || 0}. После фильтров осталось: ${filteredProducts.length}`);

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