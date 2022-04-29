// import logo from './logo.svg';
// import '../App.css';
import React, { useState, useContext } from 'react';
// import { Button } from 'bootstrap';
import axios from 'axios';
// import { Authcontext } from '../Auth/Auth'
import Speciality from './Speciality/Speciality.js';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';




const AddNew = () => {
//   const auth = useContext(Authcontext);
  // console.log("Auth", auth.state)

  const [empName, setempName] = useState('');
  const [empAddress, setempAddress] = useState('');
  const [empAge, setempAge] = useState('');
  const [empGender, setempGender] = useState('');
  const [empContact, setempContact] = useState('');
  const [empService, setempService] = useState('');
  const [empProofs, setempProofs] = useState('');
  const [empPhoto, setempPhoto] = useState('');
  const [empJoinDate, setempJoinDate] = useState('');
  const [empLastDate, setempLastDate] = useState('');
  const [empClient, setempClient] = useState('');
  const [empworkingHour, setempworkingHour] = useState('');
  const [empPayment, setempPayment] = useState('');
  // callApi() {
  //   fetch('http://localhost:9000/api/InsertData')
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }))
  // }
  // componentDidMount() {
  //   this.callApi();
  // }
  const empData = {
    empName: empName,
    empAddress: empAddress,
    empAge: empAge,
    empGender: empGender,
    empContact: empContact,
    empService: empService,
    empProofs: empProofs,
    empPhoto: empPhoto,
    empJoinDate: empJoinDate,
    empLastDate: empLastDate,
    empClient: empClient,
    empworkingHour: empworkingHour,
    empPayment: empPayment,
  }
  
  function submitData() {
    // console.log(params);
    axios.post('http://localhost:9000/api/insert', empData).then((res) => {
      return res
    }).catch((err)=>{
      console.log("err", ...err)
    })
    // console.log("empData", empData);
  }


  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" defaultValue="Enter Name" onChange={(e) => setempName(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setempAddress(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextage">
              <Form.Label column sm="2">
                Age
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Age" onChange={(e) => setempAge(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextgender">
              <Form.Label column sm="2">
                Gender
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Gender" onChange={(e) => setempGender(e.target.value)} />
              </Col>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextcontact">
              <Form.Label column sm="2">
                Contact
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" defaultValue="Enter Contact" onChange={(e) => setempContact(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
              <Form.Label column sm="2">
                Service
              </Form.Label>
              <Col sm="10">
                <Speciality
                  onChange={(e) => setempService(e.target.value)}
                />
                {/* <Form.Control type="text" placeholder="Enter Address" /> */}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextage">
              <Form.Label column sm="2">
                Age
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Age" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextage">
              <Form.Label column sm="2">
                Gender
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Gender" />
              </Col>
            </Form.Group>
            
          </Col>
        </Row>
      </Container>
      <hr/>
                <Button className='float-right' onClick={() => submitData()}>Submit</Button>
      
    </>
  );

}

export default AddNew;


const formstyle = {
  border: '1px solid',
  // width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '30vw',
  margin: '0 auto',
}
const forminputfield = {
  margin: '10px'
}
