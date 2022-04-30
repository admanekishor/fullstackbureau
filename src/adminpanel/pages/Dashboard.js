import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Custom_BarChart from '../component/Custom_Barchart';
import BarChart from '../component/Custom_Barchart';
import Custom_Card from '../component/Custom_Card';
import Clientvisits from './Clients/Clientvisits';
// import { Authcontext } from '../../Auth/Auth';
// import axios from 'axios';
// import EmployeeTable from './staff/EmployeeTable';
import InfoCards from './InfoCards';
// import Clientvisits from './Clientvisits';

export default function Dashboard() {


  // const [EmployeeList, setEmployeeList] = useState();
  return <>
    <div style={{ padding: 15 }}>
      <InfoCards />
      <br/>
      <Clientvisits />
    </div>
  </>;
}
