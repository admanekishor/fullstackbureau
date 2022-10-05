import React from 'react'
import { Breadcrumb, Col, Container, Row, Tab } from 'react-bootstrap'
import Helmet from 'react-helmet'
import Areas from '../pages/Areas'
import Clients from '../pages/Clients'
import ClientsBilling from '../pages/Clients/ClientsBilling'
import Dashboard from '../pages/Dashboard'
import Employees from '../pages/Employees'
// import StaffDetails from '../pages/staff/StaffDetails'
// import BreacdCrumb from './BreadCrumb'
import Header from './Header'
import Sidebar from './Sidebar'
// import logourl from '../../assets/images/logo_white.png'
export default function Main() {
    
    return (
        <>
            <Helmet>
                <title>Admin</title>

            </Helmet>
            <Header />
            <Container fluid>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={2} className="p-0">
                            <Sidebar />
                        </Col>
                        <Col sm={10}>
                            {/* <Row>
                                <Col className='p-0'>
                                    <BreacdCrumb />
                                </Col>
                            </Row> */}
                            <Tab.Content style={{ overflowY: 'scroll', height: '90vh' }}>
                                <Tab.Pane eventKey="#link1">
                                    <Dashboard />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                    <Clients />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link3">
                                    <Employees />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link4">
                                   <Areas />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link5">
                                    {/* <Employees /> */}
                                    {/* <StaffDetails /> */}
                                    <ClientsBilling />
                                </Tab.Pane>
                            </Tab.Content>

                        </Col>
                    </Row>
                    {/* <Navigate /> */}
                </Tab.Container>
            </Container>
        </>
    )
}
