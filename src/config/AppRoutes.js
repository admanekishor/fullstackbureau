import React, { Children, createContext, useEffect, useReducer } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../bureau/Home';
import Main from '../adminpanel/template/Main';
import About from '../bureau/About';
import Typesofcare from '../bureau/Typesofcare';
import Contact from '../bureau/Contact';
import Login from '../adminpanel/pages/Login';
import NotFoundPage from '../bureau/NotFoundPage';

export const Authcontext = createContext();


const initialState = {
    isSignedIn: false,
    user: null,
};


function reducer(initialState, action) {
    switch (action.type) {
        case "SIGN_IN":
            // console.log("Action", action)

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
    const navigate = useNavigate();

    const parentPath = window.location.pathname.split("/");
    // const { category } = useParams();
    let path = parentPath[1];
    // console.log("path", path);


    useEffect(() => {
        getasyncdata()
    }, [])

    async function getasyncdata() {
        const user = await localStorage.getItem("user");
        if (user) {

            dispatch({ type: 'SIGN_IN', payload: JSON.parse(user) })

            if (path == 'admin' || path == 'login') {
                navigate('/admin')
            }
        } else {
            
        }
    }


    return (
        <>
            <Authcontext.Provider value={{ state: state, dispatch: dispatch }}>

                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/typesofcare/*" element={<Typesofcare />}>
                        <Route exact path=":category" element={<Typesofcare />} />
                    </Route>
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/*" element={state.isSignedIn ? <Main /> : <Navigate to="/login" replace />} />

                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </Authcontext.Provider>


            {/* <Authcontext.Provider value={{ state: state, dispatch: dispatch }}>
                {
                    state.isSignedIn ? <Main /> : <Login />
                }
            </Authcontext.Provider> */}


            {/* <Route path="/admin" element={isLoggedin ? <Main /> : <Navigate to="/login" replace />} /> */}

        </>
    )
    
}

export default AppRoutes;