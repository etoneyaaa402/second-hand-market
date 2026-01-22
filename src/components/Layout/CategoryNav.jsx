import React, { useState } from 'react';
import './CategoryNav.css';

const categories = ['Women', 'Men', 'Unisex', 'Children', 'New'];
export default function CategoryNav(){
    const [activeCategory, setActiveCategory] = useState('Women');
    return(
        <div className="category-nav">
            <div className = "category-container">
                {categories.map((cat)=>(
                    <button key={cat} 
                    className={`category-item ${activeCategory === cat?'active':''}`}
                    onClick={()=>setActiveCategory(cat)}>
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}