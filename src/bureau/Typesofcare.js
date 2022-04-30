import React from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import Header from './template/Header/Header';
import 'react-tabs/style/react-tabs.css';
import bureu from '../assets/css/Custom.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import elderlyimg from '../assets/images/about/service-15.jpg';
import supportclient from '../assets/images/typeofcare/service-16.jpg';
import respite from '../assets/images/typeofcare/service-19.jpg';
import Footer from './template/Footer';
// import { Helmet } from 'react-helmet';
// import logourl from '../assets/images/logo_white.png';

function Typesofcare(props) {
    const parentPath = window.location.pathname.split("/");
    // const { category } = useParams();
    let customurl = parentPath[1];
    console.log("category", customurl);

    const tabsData = [
        {
            label: "Elderly Care Service",
            path: "/elderly-care-service",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={elderlyimg} alt={elderlyimg} width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>Elderly Care Service</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores,
                    errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own.
                    When your loved one requires assistance with bathing and dressing,
                    our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Our Elder Care Services Support You to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Elder Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
            defaultTab: true
        },
        {
            label: "Personal Care",
            path: "/personal-care",
            content: (<div className="tab-content col-12 col-md-8">
                <h4 className='pt-3 pb-0'>Personal Care Service</h4>
                <h5 className='pb-3'>Day-to-Day Care for Your Daily Needs</h5>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Our Personal Care Services Support You</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Personal Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "Respite Care",
            path: "/respite-care",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={respite} alt={respite} width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>Respite Care Service</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Our Respite Care Services Support You to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Respite Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "Skilled Nursing",
            path: "/skilled-nursing",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={respite} alt={respite} width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>Our Best Skilled Nursing</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Our Respite Care Services Support You to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Respite Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "24/7 Day Support",
            path: "/day-support",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={respite} alt={respite} width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>We Give 24/7 Day Support</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">24/7 Day Care Services Support You to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>24/7 Day Support for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "Hospital Discharge",
            path: "/hospital-discharge",
            content: (<div className="tab-content col-12 col-md-8">
                <h4 className='pb-0'>Hospital Discharge Service</h4>
                <h5 className='pb-2'>Day-to-Day Care for Your Daily Needs</h5>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Hospital Discharge Services Support for your elders</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Respite Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "Companion Care",
            path: "/companion-care",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={respite} alt="respite" width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>Companion Care</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Companion Care Services Support You to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Companion Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "Cronical Condition Care",
            path: "/cronical-condition-care",
            content: (<div className="tab-content col-12 col-md-8">
                <h4 className='pb-2'>Cronical Condition Care</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Cronical Condition Care Support for your elders</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Cronical Condition Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "After Surgery Care",
            path: "/after-surgery-care",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={respite} alt="respite" width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>After Surgery Care</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">After Surgery Care Services Support You to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>After Surgery Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "End Of Life Care",
            path: "/end-of-life-care",
            content: (<div className="tab-content col-12 col-md-8">
                <h4 className='pb-2'>End of Life Care Service</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">End of Life Care Support for your elders</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>End of Life Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        },
        {
            label: "Special Need Care",
            path: "/special-need-care",
            content: (<div className="tab-content col-12 col-md-8">
                <div>
                    <img src={respite} alt={respite} width="100%" />
                </div>
                <h4 className='pt-3 pb-2'>Special Need Care</h4>
                <p className="textjustify">Do you or a loved one need a little bit of extra help in your home? Chores, errands, and personal tasks can be difficult or unsafe for many individuals to perform on their own. When your loved one requires assistance with bathing and dressing, our personal care services are designed just for their needs.</p>
                <p className="textjustify">With our experienced and caring staff, your loved one can remain in their home and continue living independently for longer. Our customized care plans will match your loved one’s needs exactly, so they can enjoy care services that are uniquely tailored to them. Our compassionate caregivers are here to provide your loved one with exceptional support, while giving you the peace of mind you deserve.</p>
                <p className="textjustify">Let our experienced caregivers help your family</p>
                <div>

                    <Row>
                        <Col xs={3}><img src={supportclient} alt="supportclient" width="100%" /></Col>
                        <Col xs={9}>
                            <div><h4 className="textjustify">Special Need Care Services to our Clients</h4></div>
                            <p className="textjustify">Many seniors prefer to age in their own home, but this can grow more and more difficult as the years pass. Your loved one doesn’t need to give up on the familiarity and comfort of their home, simply because they cannot remain completely independent. Our personal care services are specially designed to provide additional assistance to enhance your loved one’s independence.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <h4 className="textjustify">Our personal caregivers offer assistance with activities such as:</h4>
                            </div>
                            <div className="textjustify">
                                <ul>
                                    <li>Personal grooming, bathing, toileting, and hygiene tasks</li>
                                    <li>Mobility and transfers</li>
                                    <li>Medication reminders and monitoring</li>
                                    <li>Companionship</li>
                                    <li>Light housekeeping, meal planning, and meal preparation</li>
                                    <li>Shopping and errands</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="textjustify">
                                <h4>Special Need Care for All Needs</h4>
                                <p>Our caregivers are ready to provide quality services to everyone in need of assistance, including elders, those who are living with a disability, and those who are in recovery from an injury or living with a chronic condition. We focus on your individual needs, regardless of the reason you need some extra help. Let us help your day-to-day life be simple, comfortable, and safe.</p>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>),
        }
    ]


    return (
        <div>


            <Header />
            <div className={bureu.aboutsection}>
                <Container className={bureu.aboutbreadCrumb}>
                    <h1>Type of Care</h1>
                    <p>Home / About</p>
                </Container>
            </div>
            <div className={bureu.section1}>
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <div className="tabs">
                                {tabsData.map((data, i) => {

                                    // console.log("data.path",data.path)
                                    return (

                                        <div className={bureu.sidetabs} key={i}>
                                            <NavLink

                                                to={`/${customurl}${data.path}`}
                                                // activeClassName={bureu.active}
                                                className={({ isActive }) => (isActive ? bureu.active : '') + " " + `${bureu.sidemenu}`}
                                                onClick={() =>
                                                    data.defaultTab
                                                        ? data.path
                                                        : data.path
                                                }
                                            >
                                                {data.label}
                                            </NavLink>
                                        </div>
                                    );
                                })}

                            </div>
                        </Col>
                        {/* <Col xs={12} md={8}> */}
                        <Routes>

                            {tabsData.map((data, index) => {
                                return (

                                    <Route
                                        key={index.toString()}
                                        element={data.content}
                                        exact path={data.path}
                                    />

                                );
                            })}
                        </Routes>
                        {/* </Col> */}

                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default Typesofcare;