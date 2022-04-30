import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../config/AppRoutes';

export default function Login() {
    const user = useContext(Authcontext);
    
    const { state, dispatch } = user;
    
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    
    const userdetails = {
        username: UserName,
        password: Password
    }
    
    // const navigate = useNavigate();
    async function submitHandler() {
         await axios.post('http://localhost:9000/api/login', userdetails).then((res) => {
                // console.log(userdetails.username)

                console.log("res login1",res.data.message)
                if (res.data.message.length > 0) {
                    console.log("res login2",res.data.message)

                    localStorage.setItem("user", JSON.stringify(res.data.message));

                    
                    dispatch({ type: 'SIGN_IN', payload: res.data.message });
                    // navigate('/');
                } else {
                    dispatch({ type: 'SIGN_OUT', payload: null });
                }
            
            // return res
        }).catch((err) => {
            console.log("err", ...err)
        })

    }
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh', backgroundColor: "#810050" }}>
            <Container>
                <Row>
                    <Col sm="8" md="6" lg="4" className='mx-auto'>
                        <Card bg="light" text="dark" className="text-center p-3">
                            <Card.Body className="blockquote mb-0 card-body">
                                <Card.Title className='font' as="h4">Login</Card.Title>
                                <Form.Group as={Row} className="mb-4" controlId="formPlaintextname">
                                    <Col sm="12">
                                        <Form.Control type="text" value={UserName} placeholder="Enter Name" onChange={(e) => setUserName(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-4" controlId="formPlaintextpassword">
                                    <Col sm="12">
                                        <Form.Control type="password" value={Password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                    </Col>
                                </Form.Group>

                                <Button variant="danger" size="md-block"  className='w-100' onClick={() => submitHandler()}>
                                    Login
                                </Button>
                                <Button variant="link" size="md-block"  className='w-100'>
                                    Forgot Password?
                                </Button>
                            </Card.Body>
                        </Card>


                    </Col>
                </Row>
            </Container>
        </div>
    )
}
