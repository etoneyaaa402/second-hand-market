import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import Layout from './components/Layout/Layout';

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App;