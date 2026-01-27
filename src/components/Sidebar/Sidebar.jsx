import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/filterSlice';
import './Sidebar.css';

const ChevronIcon = ({ isOpen })=>(
    <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`chevron ${isOpen ? 'open' : ''}`}
    >
        <polyline points='6 9 12 15 18 9'></polyline>
    </svg>
);
const menuData = [
    {id: 'shoes', title: 'Shoes', slug: 'mens-shoes',
        sub: [{id: 'insoles', title: 'Insoles', slug: 'mens-shoes'}]
    },
    {id: 'apparel', title: 'Apparel', slug: 'womens-dresses'},
    {
        id: 'accessories',
        title: 'Accessories',
        slug: 'womens-jewellery',
        sub: [{id: 'belts', title: 'Belts', slug: 'womens-watches',
            sub: [{id: 'leather-belts', title: 'Leather belts', slug: 'womens-watches'}]
        }]
    },
    {id: 'sport', title: 'Sport', slug: 'sports-accessories'},
    {id: 'beauty', title: 'Beauty', slug: 'beauty'}
];

export default function Sidebar(){
    const dispatch = useDispatch();
    const currentCategory = useSelector((state)=> state.filters.selectedCategory);
    const [openItems, setOpenItems] = useState(['accessories','belts']);
    const toggleItem=(id)=>{
        setOpenItems(prev => prev.includes(id)?prev.filter(item=> item!==id): [...prev,id]);
    };
    const handleClick = (item) =>{
        if (item.sub) {
            toggleItem(item.id);
        }
        if (item.slug) {
            dispatch(setCategory(item.slug));
        }
    };
    const renderMenuItems = (items, level = 0) => {
        return (
        <ul className={`sidebar-list ${level > 0 ? 'sidebar-list-nested' : ''}`}>
            {items.map(item => {
            const isOpen = openItems.includes(item.id);
            const isTopLevel = level === 0;
            const isSelected = currentCategory === item.slug;
    
            return (
                <li key={item.id} className={`sidebar-item ${isTopLevel ? 'sidebar-item-main' : 'sidebar-item-sub'}`}>
                <div 
                    className={`sidebar-title-container ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleClick(item)}
                >
                    <span className="sidebar-title">
                    {item.title}
                    </span>
                    {item.sub && <ChevronIcon isOpen={isOpen} />}
                </div>
                
                {item.sub && isOpen && (
                    <div className="sidebar-sub-container">
                    {renderMenuItems(item.sub, level + 1)}
                    </div>
                )}
                </li>
            );
            })}
        </ul>
        );
    };
    
      return (
        <aside className="sidebar">
          <h3 className="sidebar-header">Categories</h3>
          <div 
            className={`sidebar-title-container ${!currentCategory ? 'selected' : ''}`}
            onClick={() => dispatch(setCategory(null))}
            style={{paddingLeft: '20px', marginBottom: '10px', cursor: 'pointer'}}
          ></div>
          {renderMenuItems(menuData)}
        </aside>
      );
}