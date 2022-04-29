import React, { Children } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../bureau/Home';
import Main from '../adminpanel/template/Main';
import About from '../bureau/About';
import Typesofcare from '../bureau/Typesofcare';
import Contact from '../bureau/Contact';
import Login from '../adminpanel/pages/Login';

const AppRoutes = () => {
    let isLoggedin = false;
    return (
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route path="/typesofcare/*" element={<Typesofcare />}>
                    <Route exact path=":category" element={<Typesofcare />} />
                </Route>
                <Route exact path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={isLoggedin ? <Main /> : <Navigate to="/login" replace />} />
                {/* <Route path='*' element={<h2>404 Page Not Found</h2>} /> */}
            </Routes>


        </>
    )
}

export default AppRoutes;