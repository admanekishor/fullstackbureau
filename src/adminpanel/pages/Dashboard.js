import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Custom_BarChart from '../component/Custom_Barchart';
import BarChart from '../component/Custom_Barchart';
import Custom_Card from '../component/Custom_Card';
import Clientvisits from './Clients/Clientvisits';
import InfoCards from './InfoCards';


export default function Dashboard() {

  return <>
    <div style={{ padding: 15 }}>
      <InfoCards />
      <br/>
      <Clientvisits />
    </div>
  </>;
}
