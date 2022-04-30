import React, { useState } from "react";
import logo from '../../../assets/images/logo_white.png';
import { Link, NavLink } from "react-router-dom";
// import bureau from '../../../assets/css/Custom.module.css';
import  '../../../assets/css/layout.scss';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import EcardPopup from '../../component/popup/ecard/EcardPopup'

const Header = (props) => {
    
    const [showPopup, setShowPopup] = useState(false);
    return (
        <React.Fragment>

            <Navbar className="navbg py-0" collapseOnSelect expand="lg" variant="dark" sticky="top" >
                <Container fluid>
                    <Navbar.Brand to="#home">
                        <Link to="/"> <img src={logo} alt="Muktai Nurses Bureau" className="logo" /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto me-3">
                            <NavLink to="/" className="nav-link px-4">Home</NavLink>
                            <NavLink to="/about" className="nav-link px-4">About</NavLink>

                            <NavDropdown title="Types Of Care" id="collasible-nav-dropdown">
                                <NavLink to="/typesofcare/elderly-care-service" className="dropdown-item">Elderly Care Service</NavLink>
                                <NavLink to="/typesofcare/personal-care" className="dropdown-item">Personal Care</NavLink>
                                <NavLink to="/typesofcare/respite-care" className="dropdown-item">Respite Care</NavLink>
                                <NavLink to="/typesofcare/skilled-nursing" className="dropdown-item">Skilled Nursing</NavLink>
                                <NavLink to="/typesofcare/day-support" className="dropdown-item">Day Support</NavLink>
                                <NavLink to="/typesofcare/hospital-discharge" className="dropdown-item">Hospital Discharge</NavLink>
                                <NavLink to="/typesofcare/companion-care" className="dropdown-item">Companion Care</NavLink>
                                <NavLink to="/typesofcare/cronical-condition-care" className="dropdown-item">Cronical Condition Care</NavLink>
                                <NavLink to="/typesofcare/after-surgery-care" className="dropdown-item">After Surgery Care</NavLink>
                                <NavLink to="/typesofcare/end-of-life-care" className="dropdown-item">End of Life Care</NavLink>
                                <NavLink to="/typesofcare/special-need-care" className="dropdown-item">Special Need Care</NavLink>


                            </NavDropdown>
                            <NavLink to="/contact" className="nav-link px-4">Contact</NavLink>
                            <Button className="px-4" size="sm" variant="outline-light" onClick={() => { setShowPopup(!showPopup) }}> Get E-Card</Button>
                            <EcardPopup showPopup={showPopup} setShowPopup={setShowPopup} />
                        </Nav>
                        {/* <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}
export default React.memo(Header);