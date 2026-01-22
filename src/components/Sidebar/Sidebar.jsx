import React, {useState} from 'react';
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
    {id: 'shoes', title: 'Shoes',
        sub: [{id: 'insoles', title: 'Insoles'}]
    },
    {id: 'apparel', title: 'Apparel'},
    {
        id: 'accessories',
        title: 'Accessories',
        sub: [{id: 'belts', title: 'Belts',
            sub: [{id: 'leather-belts', title: 'Leather belts'}]
        }]
    },
    {id: 'sport', title: 'Sport'},
    {id: 'beauty', title: 'Beauty'}
];

export default function Sidebar(){
    const [openItems, setOpenItems] = useState(['accessories','belts']);
    const toggleItem=(id)=>{
        setOpenItems(prev => prev.includes(id)?prev.filter(item=> item!==id): [...prev,id]);
    };
    const renderMenuItems = (items, level = 0) => {
        return (
        <ul className={`sidebar-list ${level > 0 ? 'sidebar-list-nested' : ''}`}>
            {items.map(item => {
            const isOpen = openItems.includes(item.id);
            const isTopLevel = level === 0;
    
            return (
                <li key={item.id} className={`sidebar-item ${isTopLevel ? 'sidebar-item-main' : 'sidebar-item-sub'}`}>
                <div 
                    className="sidebar-title-container" 
                    onClick={() => item.sub && toggleItem(item.id)}
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
          {renderMenuItems(menuData)}
        </aside>
      );
}