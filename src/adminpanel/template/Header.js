import React, { useContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../config/AppRoutes';
// import { Outlet } from 'react-router-dom';

export default function Header() {
    const { state, dispatch } = useContext(Authcontext);

    const { user } = state;

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
                            {/* <Nav className="ml-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> */}
                            <Nav className='ms-auto'>
                                {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                                <Nav.Link eventKey={2} href="#">
                                    {
                                        user.map((admin) => {
                                            // console.log("admin", admin.username)
                                            return admin.username
                                        })
                                    }

                                </Nav.Link>
                                <Button size='sm' variant="outline-danger" onClick={() => logout()}>logout</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
            </Container>
        </>
    )
}
