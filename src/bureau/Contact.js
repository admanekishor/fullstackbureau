import Header from "./template/Header/Header";
// import bureu from '../assets/css/Custom.module.css';
import '../assets/css/layout.scss';
import { Card, Col, Container, Row } from "react-bootstrap";
// import { Button } from "./template/Header/NavbarElements";
import { useState } from "react";
import ContactForm from "./ContactForm";
import { Typography } from "@mui/material";
import Iframe from 'react-iframe'
import Footer from './template/Footer';
import { Helmet } from "react-helmet";
import logourl from '../assets/images/logo_white.png';

let Contact = () => {
    return (
        <div>
            <Helmet>
                <title>MuktaiNursesBureau | contact us</title>
                <meta name="description" content="Muktai Nurses Bureau, Contact Us" />
                <meta name="keywords" content="Muktai Nurses Bureau, Contact Us" />
                <meta itemProp="name" content="Muktai Nurses Bureau, Contact Us" />
                <meta itemProp="description" content="Deliver the best possible caregiving services to fit each client" />
                <meta itemProp="image" content={logourl} />
                <meta property="og:url" content="http://www.muktainursesbureau.in/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Muktai Nurses Bureau" />
                <meta property="og:description" content="Deliver the best possible caregiving services to fit each client" />
                <meta property="og:image" content={logourl} />
                <meta name="twitter:card" content="Muktai Nurses Bureau" />
                <meta name="twitter:title" content="Muktai Nurses Bureau" />
                <meta name="twitter:description" content="Deliver the best possible caregiving services to fit each client" />
                <meta name="twitter:image" content={logourl} />

            </Helmet>
            <Header />
            <div className="aboutsection">
                <Container className="aboutbreadCrumb">
                    <h1>Contact</h1>
                    <p>Home / Contact</p>
                </Container>
            </div>
            <div className="section2">
                <Container >
                    <Row>
                        <Col sm={12}>
                            <h2 className="headingcenter">Get In Touch</h2>
                            <p className="textCenter">Alternatively fill in the form and we will get back to you.</p>
                            <div>
                                <ContactForm />
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
            <div>

                <Iframe url="https://maps.google.com/maps?q=dattawadi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="block"
                    position="relative" />

            </div>
            <Footer />
        </div>
    )
}
export default Contact;