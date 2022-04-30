import React, { Children, createContext, useEffect, useReducer } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../bureau/Home';
import Main from '../adminpanel/template/Main';
import About from '../bureau/About';
import Typesofcare from '../bureau/Typesofcare';
import Contact from '../bureau/Contact';
import Login from '../adminpanel/pages/Login';
import { Action } from 'history';

export const Authcontext = createContext();


const initialState = {
    isSignedIn: false,
    user: null,
};


function reducer(initialState, action) {
    switch (action.type) {
        case "SIGN_IN":
            console.log("Action", action)
            return {
                ...initialState,
                isSignedIn: true,
                user: action.payload,
            };
        case "SIGN_OUT":
            localStorage.clear();
            return {
                ...initialState,
                isSignedIn: false,
                user: null,
            };
        default:
            return initialState;
    }
}

const AppRoutes = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // let isLoggedin = true;

    useEffect(() => {
        getasyncdata()
    }, [])

    async function getasyncdata() {
        const user = await localStorage.getItem("user");
        if (user) {
            dispatch({ type: 'SIGN_IN', payload: JSON.parse(user) })
        } else {

        }
    }


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

                {/* <Route path='*' element={<h2>404 Page Not Found</h2>} /> */}
            </Routes>
            <Authcontext.Provider value={{ state: state, dispatch: dispatch }}>
                {
                    state.isSignedIn ? <Main /> : <Login />
                }
                {/* <Route path="/admin" element={isLoggedin ? <Main /> : <Navigate to="/login" replace />} /> */}
            </Authcontext.Provider>

        </>
    )
}

export default AppRoutes;