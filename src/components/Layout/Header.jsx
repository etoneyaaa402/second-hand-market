import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/filterSlice';
import './Header.css';

// Иконка поиска
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Иконка сердца (избранное)
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Иконка корзины/сумки
const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
    <path d="M3 6h18"></path>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

// Иконка пользователя
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function Header() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state=>state.filters.searchQuery);
  const handleSearch = (e)=>{
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
            <Link to="/" className="logo">
                <div className="logo-text">2ND<br/>HAND<br/>MARKET</div>
            </Link>

            <div className="search-container">
                <input type="text" className="search-input" value={searchQuery} onChange={handleSearch}/>
                <span className="search-icon">
                    <SearchIcon />
                </span>
            </div>
        </div>

        <div className="header-right">
            <nav className="header-nav">
                <a href="#">About us</a>
                <a href="#">All shops</a>
                <a href="#">Become a merchant</a>
            </nav>

            <div className="header-icons">
                <div className="icon-item">
                    <HeartIcon />
                    <span className="icon-count">0</span>
                </div>
                <div className="icon-item">
                    <BagIcon />
                    <span className="icon-count">0</span>
                </div>
                <div className="icon-item user-avatar">
                    <UserIcon />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}