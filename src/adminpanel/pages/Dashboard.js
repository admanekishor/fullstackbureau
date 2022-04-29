import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Custom_BarChart from '../components/Custom_Barchart';
import BarChart from '../components/Custom_Barchart';
import Custom_Card from '../components/Custom_Card';
// import { Authcontext } from '../../Auth/Auth';
// import axios from 'axios';
// import EmployeeTable from './staff/EmployeeTable';
import InfoCards from './InfoCards';
// import Clientvisits from './Clientvisits';

export default function Dashboard() {


  // const [EmployeeList, setEmployeeList] = useState();
  return <>
    <div style={{ padding: 15 }}>
      {/* <Custom_Card /> */}
      {/* <InfoCards /> */}
      <br />
      {/* <Container fluid> */}
        <Row>
          <Col md={6}>
            <Custom_BarChart />
          </Col>
          <Col md={6}>
            <Custom_BarChart />
          </Col>
        </Row>
      {/* </Container> */}
      <br />
      {/* <EmployeeTable /> */}
      {/* <Clientvisits /> */}
    </div>
  </>;
}
