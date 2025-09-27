import React from 'react'
import { Breadcrumb, Col, Container, Row, Tab } from 'react-bootstrap'
import Helmet from 'react-helmet'
import Areas from '../pages/Locations/Areas'
import Clients from '../pages/Clients'
import ClientsBilling from '../pages/Clients/ClientsBilling'
import Dashboard from '../pages/Dashboard'
import Employees from '../pages/Employees'
import Header from './Header'
import Sidebar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import ClientVisits from '../pages/Clients/Clientvisits'



const routes = [
    {
        path: "",
        name: "Dashboard",
        element: <Dashboard />,
    },
    {
        path: "clientvisits",
        name: "Client Visits",
        element: <ClientVisits />,
    },
    {
        path: "clients",
        name: "Clients",
        element: <Clients />,
    },
    {
        path: "employees",
        name: "Employees",
        element: <Employees />,
    },
    {
        path: "cities",
        name: "Local Areas",
        element: <Areas />,
    },
    {
        path: "billings",
        name: "Billings",
        element: <ClientsBilling />,
    },

    // { path: "/admin", name: "Admin", element: "" },
];

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
                            <Routes>
                                {routes.map((route, idx) => {
                                    return (
                                        route.element && (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                element={route.element}
                                            />
                                        )
                                    );
                                })}
                            </Routes>

                        </Col>
                    </Row>
                    {/* <Navigate /> */}
                </Tab.Container>
            </Container>
        </>
    )
}
