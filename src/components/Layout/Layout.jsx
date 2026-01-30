import { Outlet } from 'react-router-dom';
import Header from './Header';
import CategoryNav from './CategoryNav';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export default function Layout(){
    return(
        <div>
            <Header />
            <CategoryNav />
            <div className="main-wrapper">
                <Sidebar />
                <main className='main-container'>
                    <Outlet />
                </main>
            </div>
            <ScrollToTop/>
        </div>
    )
}