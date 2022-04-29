import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { Outlet } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                    <Nav>
                        
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link href="/admin/login">
                        login
                        </Nav.Link>
                        {/* <Outlet /> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
