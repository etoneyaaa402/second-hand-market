import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(()=> import('./pages/LoginPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const Layout = React.lazy(()=>import('./components/Layout/Layout'));

function App() {
    const {isAuthenticated} = useSelector((state)=>state.auth);
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to='/' />}/>
                    <Route path='/' element={isAuthenticated? <Layout /> : <Navigate to='/login' />}>
                        <Route index element={<HomePage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/product/:id' element={<ProductPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;