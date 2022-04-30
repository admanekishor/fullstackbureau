import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./template/Header/Header";
import HomeSlider from "./component/slider/HomeSlider";
// import bureau from '../assets/css/Custom.module.css';
import '../assets/css/layout.scss';
import MultiSlide from "./component/slider/MultiSlide";
import care1 from '../assets/images/services/care-1.jpg';
import care2 from '../assets/images/services/care-2.jpg';
import care3 from '../assets/images/services/care-3.jpg';
import Footer from "./template/Footer";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import Testimonial from "./component/slider/Testimonial";
// import { AuthContext } from './../auth/Auth';

let HomePage = () => {

    return (
        <div>
            <Header />
            <HomeSlider />
            <div className="section3">
                <Container >
                    <Row>
                        <Col sm={12} md={12} lg={7}>
                            <h2 className="headingleft">How Do Home Healthcare & Home Care Work Together?</h2>
                            <div>
                                <p className="textJustify">We often find ourselves working side-by-side with home healthcare providers in order to deliver the best possible caregiving services to fit each client’s needs. For example, the our agency may change your loved one’s prescription or recommend a therapy regimen. Our caregivers are there with your family member day in and day out to make sure they take those medicines and stick to their recommended routine safely and effectively.</p>
                                <p className="textJustify"><strong>If you or your loved one is in need of caregiving services, we encourage you to reach out for a complimentary evaluation so we can customize an appropriate plan of care. Contact us for more information.</strong></p>
                            </div>
                        </Col>
                        <Col sm={12} md={12} lg={5}>
                            <Col sm={12}>
                                <img src={care1} className="imgresponsive" />
                            </Col>

                            <Col sm={12} className="d-flex justify-content-center">
                                <img src={care2} alt="care2" className="imgresponsive care2" />
                                <img src={care3} alt="care3" className="imgresponsive care3" />
                            </Col>

                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={12} lg={6} className="always d-none d-md-block">
                            <Link to="#" className="ytubevideo">
                                <div className="playicon">
                                    <FaPlay />
                                </div>
                            </Link>
                        </Col>
                        <Col sm={12} md={12} lg={6} className="bgpattern" style={{ color: '#fff' }}>
                            <h2 className="heading" style={{ color: '#fff' }}>Here For You Always</h2>
                            <div>
                                <p className="textJustify">We know that it can be overwhelming to welcome a stranger into the home.
                                    Because of that, we train our professionals not just on high-quality care but on interpersonal relationships as well.</p>
                                <div>
                                    <ul className="bulletList">
                                        <li>Advanced age</li>
                                        <li>Dementia or Alzheimer's disease</li>
                                        <li>Degenerative disorders, such as MS or ALS</li>
                                        <li>Post-surgery, including cosmetic, joint replacement, or heart surgery</li>
                                        <li>Chronic conditions, such as diabetes, COPD, or cancer</li>
                                        <li>Backup care for children</li>
                                    </ul>
                                    <p className="textJustify">Let us help you care for your loved one living with dementia!</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className="section2">
                <Container >
                    <Row>
                        <div><h3 className="headingcenter">What Services We offer</h3>
                            <p className='textCenter'>A dependable, compassionate presence you can trust.
                            </p>
                        </div>
                        <Col>
                            <MultiSlide />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section4">
                {/* <div className={bureau.lavendercircle}></div> */}
                <Container fluid>
                    <div>
                        <h2 className="headingcenter">What Our Client Says</h2>
                    </div>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Testimonial />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}
export default HomePage;