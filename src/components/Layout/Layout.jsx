import { Outlet } from 'react-router-dom';
import Header from './Header';
import CategoryNav from './CategoryNav';

export default function Layout(){
    return(
        <div>
            <Header />
            <CategoryNav />
            <main className='main-container'>
                <Outlet />
            </main>
        </div>
    )
}