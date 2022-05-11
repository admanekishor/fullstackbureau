import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../config/AppRoutes';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Helmet from 'react-helmet';
export default function Login() {

    const user = useContext(Authcontext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onError = (errors, e) => {
        return errors;
        // console.log(errors)
    };
    const [Response, setResponse] = useState("")
    const { state, dispatch } = user;

    const navigate = useNavigate();
    async function submitHandler(data) {
        //  await axios.post('http://www.muktainursesbureau.in/API//api/login', userdetails).then((res) => {
        await axios.post('http://www.muktainursesbureau.in/API/login.php', data).then((res) => {

            console.log("res login1", res.data);

            if (res.data.response.status == "200") {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                dispatch({ type: 'SIGN_IN', payload: res.data.message });
                navigate('/admin');

            } else if (res.data.response.status === '401') {
                setResponse("username and password incorrect");
            } else {

                dispatch({ type: 'SIGN_OUT', payload: null });
            }

            return res
        }).catch((err) => {
            console.log("err", { ...err })
        })

    }


    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh', backgroundColor: "#810050" }}>
            <Helmet>
                <title>Login</title>

            </Helmet>
            <Container>
                <Row>
                    <Col sm="8" md="6" lg="4" className='mx-auto'>
                        <Card bg="light" text="dark" className="text-center p-3">
                            <Card.Title className='font' as="h4">Login</Card.Title>
                            <Card.Body className="blockquote mb-0 card-body">
                                <Grid item xs={12}>
                                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={12}>
                                            {Response ? <p className='text-danger'>{Response}</p> : ""}
                                            <div>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    id="outlined-basic"
                                                    label="Enter Username"
                                                    error={errors.UserName ? true : false}
                                                    variant="outlined"
                                                    {...register('UserName', { required: true })}
                                                />
                                                {errors.UserName && errors.UserName.type === "required" && (
                                                    <p style={{ color: 'red', textAlign: 'left' }}><small>required*</small></p>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <TextField
                                                    id="outlined-password"
                                                    label="Enter Password"
                                                    fullWidth
                                                    size="small"
                                                    type="password"
                                                    error={errors.Password ? true : false}
                                                    variant="outlined"
                                                    {...register('Password', { required: true })}
                                                />

                                                {errors.Password && errors.Password.type === "required" && (
                                                    <p style={{ color: 'red', textAlign: 'left' }}><small>required*</small></p>
                                                )}

                                            </div>
                                        </Grid>


                                        <Grid item xs={12} justifyContent="flex-end" display="flex">
                                            <Button variant="danger" className="buttontheme w-100" size="medium" onClick={handleSubmit(submitHandler, onError)}>Submit</Button>
                                        </Grid>
                                        <Grid item xs={12} justifyContent="flex-end" display="flex">
                                            <Button variant="link" size="md-block" className='w-100'>
                                                Forgot Password?
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>


                            </Card.Body>
                        </Card>


                    </Col>
                </Row>
            </Container>
        </div>
    )
}
