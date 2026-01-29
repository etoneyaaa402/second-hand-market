import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import Layout from './components/Layout/Layout';

function App() {
    const {isAuthenticated} = useSelector((state)=>state.auth);
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to='/' />}/>
            <Route path='/' element={isAuthenticated? <Layout /> : <Navigate to='/login' />}>
                <Route index element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App;