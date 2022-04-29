import React from 'react'
import { Breadcrumb, Col, Container, Row, Tab } from 'react-bootstrap'
import Clients from '../pages/Clients'
import Dashboard from '../pages/Dashboard'
import Employees from '../pages/Employees'
import StaffDetails from '../pages/staff/StaffDetails'
import BreacdCrumb from './BreadCrumb'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Main() {
    return (
        <>
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
                            <Tab.Content style={{overflowY:'scroll', height:'90vh'}}>
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
                                    {/* <Employees /> */}
                                    <StaffDetails />
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
