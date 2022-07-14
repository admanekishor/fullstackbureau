import React, { useContext, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../config/AppRoutes';
import CustomModal from '../component/CustomModal';
import UpdatePassword from '../pages/UpdatePassword';
// import { Outlet } from 'react-router-dom';

export default function Header() {
    const { state, dispatch } = useContext(Authcontext);
    const { user } = state;
    const [userInfo, setUserInfo] = useState("");
    const [PasswordModal, setPasswordModal] = useState(false);
    useEffect(() => {
        setUserInfo(user)
    }, [])
    // console.log("userInfo", userInfo)
    // const navigate = useNavigate();
    function logout() {
        localStorage.clear()
        dispatch({ type: 'SIGN_OUT' })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">Muktai Nurses Bureau</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className='ms-auto'>
                                {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                                <Nav className="ml-auto">

                                    <NavDropdown title={userInfo ? userInfo[0].username : "user not found"}
                                        id="collasible-nav-dropdown" align="end" className='text-capitalize'>

                                        <NavDropdown.Item href="#" onClick={()=>{
                                            setPasswordModal(true)
                                        }}>change password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#">
                                            <Button size='sm' variant="outline-danger" onClick={() => logout()}>logout</Button>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* <Nav.Link eventKey={2} href="#">
                                    {
                                        user.map((admin) => {
                                            console.log("admin", admin.username)
                                            return admin.username
                                        })
                                    }

                                </Nav.Link> */}
                                {/* <Button size='sm' variant="outline-danger" onClick={() => logout()}>logout</Button> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
            </Container>
            <CustomModal
                data={{ title: "Change Password", component: <UpdatePassword userInfo={userInfo} /> }}
                show={PasswordModal}
                onHide={() => setPasswordModal(false)}
            />
        </>
    )
}
