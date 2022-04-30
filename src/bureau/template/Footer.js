import React from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { FaPhoneAlt, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
// import bureu from '../../assets/css/Custom.module.css';
import '../../assets/css/layout.scss';
// import logourl from '../../assets/images/logo_white.png';
import ScrollTop from "./ScrollTop";

let Footer = () => {
    return (
        <div className="footer">
            <ScrollTop>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={3}>
                            <div>
                                <h4 className="heading_white">Muktai Nurses Bureu</h4>
                                <small>Health Care Services Right at Your Home</small>
                            </div>
                            <br />
                            {/* <div >
                            <img src={logourl} width="70%" />
                        </div> */}
                            <p className="textJustify">CareGiver is a WordPress theme to build Elderly People Care. It has good features and you will love.</p>
                        </Col>
                        <Col xs={12} md={6}>
                            <h4 className="textCenter">Quick Links</h4>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                                <div>
                                    <ul className="quickList">
                                        <li>
                                            <Link to="/typesofcare/elderly-care-service"> Elderly Care Service</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/personal-care"> Personal-Care</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/respite-care"> Respite Care</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/skilled-nursing"> Skilled Nursing</Link>
                                        </li>

                                    </ul>
                                </div>
                                <div>
                                    <ul className="quickList">
                                        <li>
                                            <Link to="/typesofcare/day-support"> 24/7 Day Support</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/hospital-discharge"> Hospital Discharge</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/companion-care"> Companion Care</Link>
                                        </li>


                                    </ul>
                                </div>
                                <div>
                                    <ul className="quickList">
                                        <li>
                                            <Link to="/typesofcare/cronical-condition-care"> Cronical Condition Care</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/after-surgery-care"> After Surgery Care</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/end-of-life-care"> End of Life Care</Link>
                                        </li>
                                        <li>
                                            <Link to="/typesofcare/special-need-care"> Special Need Care</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={3}>
                            <h4>Contact Info</h4>
                            <div>
                                <h6>
                                    {/* <FaPhoneAlt /> */}
                                    9834301398</h6>
                                <p>Dattawadi 999/129, <br /> Pune, Maharashtra, Pin Code: 411030</p>
                                <p>Email : <a href="mailto:shital@muktainursesbureau.in" style={{ textDecoration: 'none', color: '#fff' }} >shital@muktainursesbureau.in</a></p>
                                <ul className="quickList textCenter">

                                    {/* <Link ><FaWhatsapp fontSize="40px" /></Link>

                                    <Link ><FaInstagram fontSize="40px" /></Link>

                                    <Link ><FaFacebook fontSize="40px" /></Link> */}

                                </ul>
                            </div>
                        </Col>

                    </Row>
                    <hr />
                    <Row>
                        <Col className="textCenter"><span>© 2021 All Rights Reserved.</span></Col>
                    </Row>
                </Container>
            </ScrollTop>
        </div>
    )
}
export default React.memo(Footer);