import Header from "./template/Header/Header";
// import bureu from '../assets/css/Custom.module.css';
import '../assets/css/layout.scss';
import { Card, Col, Container, Row } from "react-bootstrap";
import aboutimg from '../assets/images/about/bg-6.jpg';
import { FaWheelchair, FaNotesMedical, FaBaby, FaUserNurse, FaHandsHelping } from 'react-icons/fa';
import Footer from "./template/Footer";
import team1 from '../assets/images/about/team-1.jpg';
import { Helmet } from "react-helmet";
import logourl from '../assets/images/logo_white.png';

let About = () => {
    return (
        <div>
            <Helmet>
                <title>Muktai Nurses Bureau | about</title>
                <link rel="canonical" href="https://muktainursesbureau.in/about" />
                <meta name="description" content="Muktai Nurses Bureau is Provide Carying Services, to survive criticle condition patients, like senior citizen, cancer, Paralize, etc Patients." />
                <meta name="keywords" content="Muktai Nurses Bureau, about us, our services, our team" />
                <meta itemProp="name" content="Muktai Nurses Bureau and Carying Services" />
                <meta itemProp="description" content="Nurses Bureau is Provide Carying Services, to survive criticle condition patients, like senior citizen, cancer, Paralize, etc Patients" />
                <meta itemProp="image" content={logourl} />
                <meta property="og:url" content="https://muktainursesbureau.in/about" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Muktai Nurses Bureau" />
                <meta property="og:description" content="Muktai Nurses Bureau is Provide Carying Services, to survive criticle condition patients, like senior citizen, cancer, Paralize, etc Patients" />
                <meta property="og:image" content={logourl} />
                <meta name="twitter:card" content="Muktai Nurses Bureau and Carying Services" />
                <meta name="twitter:title" content="Muktai Nurses Bureau and Carying Services" />
                <meta name="twitter:description" content="Muktai Nurses Bureau is Provide Carying Services, to survive criticle condition patients, like senior citizen, cancer, Paralize, etc Patients" />
                <meta name="twitter:image" content={logourl} />

            </Helmet>
            <Header />
            <div className="aboutsection">
                <Container className="aboutbreadCrumb">
                    <h1>About Us</h1>
                    <p>Home / About</p>
                </Container>
            </div>
            <div className="section1">
                <Container >
                    <Row>
                        <Col sm={6}>
                            <h2 className="headingleft">About Us</h2>
                            <div>
                                <p className="textJustify">Since 2006 the service was started by Shrimati Mukta Vishnu Admane. The Lady was taking care of senior citizen, baby sitter on its responsibility. without any company registration she start working and peoples was also happy with the worked.</p>
                                <p className="textJustify">By inspired of this The Daughter of Lady was starts it's organization with the name of Muktai Nurses Bureau. now there are 100+ ladies workers work as Nurses, Aaya, Baby sitter, and also Man work as Ward boy.</p>
                                <p className="textJustify">Nurses Bureau is Provide Carying Services, to survive criticle condition patients, like senior citizen, cancer, Paralize, etc Patients. We Provide service in all over Pune. The workers are Well Educated and with minimum 5+ years of experinced. company is registered in year of 2021.</p>
                            </div>
                        </Col>
                        <Col sm={6}>
                            {/* <h2 style={{ fontSize: '2em', fontWeight: 700 }}>About Us</h2>
                            <div>
                                <p className="textJustify">Through more than 20 years of providing innovative solutions that improve health and quality of life for those in need of in-home health services, Saveo has established itself as one of the most experienced homecare companies in the industry. Our approach to quality care focuses on a commitment to providing a level of expertise, training, patient service, and monitoring that is difficult to match in our industry. Nulla tincidunt, ante eget aliquet mattis, justo arcu efficitur risus, non imperdiet velit odio ut magna. magna.</p>
                                <p className="textJustify">Quisque nec sodales eros, at rhoncus lectus. Integer blandit volutpat justo ac sollicitudin. Vivamus fermentum, ante quis viverra lobortis, nisl felis scelerisque dui, et tristique quam ligula at ex. Donec maximus quis ligula non rutrum. Curabitur laoreet vel elit nec convallis.</p>
                            </div> */}
                            <div>
                                <img src={aboutimg} width="100%" />
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className="section2">
                <h2 className="headingcenter">Our Services</h2>
                <br />
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col sm={2}>
                            <div className='d-flex flex-column align-items-center py-3 box'>
                                <div className="servicebadge">
                                    <FaWheelchair size={30} />
                                </div>
                                <div className="textCenter">
                                    <h6 className="m-0 mt-2 text-uppercase"><strong>Long Term Waiver</strong></h6>
                                    <p>Patients who need an extra level of care.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className='d-flex flex-column align-items-center py-3 box'>
                                <div className="servicebadge">
                                    <FaNotesMedical size={30} />
                                </div>
                                <div className="textCenter">
                                    <h6 className="m-0 mt-2 text-uppercase"><strong>Skill Services</strong></h6>
                                    <p>Our agency offers a broad range of services.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className='d-flex flex-column align-items-center py-3 box'>
                                <div className="servicebadge">
                                    <FaBaby size={30} />
                                </div>
                                <div className="textCenter">
                                    <h6 className="m-0 mt-2 text-uppercase"><strong>Padiatric Services</strong></h6>
                                    <p>Our specialists have additional training and skills.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className='d-flex flex-column align-items-center py-3 box'>
                                <div className="servicebadge">
                                    <FaUserNurse size={30} />
                                </div>
                                <div className="textCenter">
                                    <h6 className="m-0 mt-2 text-uppercase"><strong>Mental Health</strong></h6>
                                    <p>We provide services tailored to meet your needs.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className='d-flex flex-column align-items-center py-3 box'>
                                <div className="servicebadge">
                                    <FaHandsHelping size={30} />
                                </div>
                                <div className="textCenter">
                                    <h6 className="m-0 mt-2 text-uppercase"><strong>Stroke Recovery</strong></h6>
                                    <p>Stroke recovery can be a lengthy process.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div className="section3">
                <h2 className="text-center" style={{ fontSize: '2em', fontWeight: 700, color: '#810050' }}>Our Team</h2>
                <br />
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={2}>
                            <div className="position-relative">
                                <div className="photo">
                                    <img src={team1} className="w-100" />
                                </div>
                                <div className="position-absolute overlay">
                                    <h5 className="text-center">Shital Admane</h5>
                                </div>
                            </div>
                        </Col>

                    </Row>
                   

                </Container>
            </div>
            <Footer />
        </div>
    )
}
export default About;