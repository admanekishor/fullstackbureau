import React from 'react'
import axios from 'axios';
import { Authcontext } from '../../../config/AppRoutes'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';


const initialAreaName = {
    key: "AreaName",
    value: "",
    error: false,
    touched: false,
    regex: /^[A-Za-z]/,
    required: true
};

const initialPincode = {
    key: "pincode",
    value: "",
    error: false,
    touched: false,
    regex: /(?=.{6})(?=.*[0-9]+)/g,
    required: true
};


export default function AddLocation({ getAreas, afterclose }) {

    const auth = useContext(Authcontext);
    // console.log("Auth", auth.state)
    const [AreaName, setAreaName] = useState(initialAreaName);
    const [pincode, setPincode] = useState(initialPincode);


    const [isSubmitting, setIsSubmitting] = useState(false);


    const validate = (obj) => {
        let error;
        if (!obj.value) {
            error = "Required";
        } else if (!obj.regex.test(obj.value)) {
            error = `Invalid ${obj.key}`;
        }
        return error;
    };


    const isError = obj => obj.error && obj.touched && obj.required;

    const notify = () => toast.success("Changes Done!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const submitData = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setAreaName({ ...AreaName, error: validate(AreaName), touched: true });
        setPincode({ ...pincode, error: validate(pincode), touched: true });




        if (!AreaName.error && !pincode.error) {
            const empData = {
                AreaName: AreaName.value,
                pincode: pincode.value
            }

            console.log("empData", empData);

            axios.post('http://www.muktainursesbureau.in/API/Insertarea.php', empData).then((res) => {
                // console.log("res", res);
                getAreas();
                notify()
                afterclose();
                return res
            }).catch((err) => {
                console.log("err", ...err)
            })

            setTimeout(() => {

                setAreaName(initialAreaName);
                setPincode(initialPincode);
                setIsSubmitting(false);
            }, 1000);
        } else {
            setIsSubmitting(false);
        }
    }


    //   useEffect(() => {
    //     getAreas();
    //   }, []);


    useEffect(() => {
        setAreaName({ ...AreaName, error: validate(AreaName) })
    }, [AreaName.value])

    useEffect(() => {
        setPincode({ ...pincode, error: validate(pincode) })
    }, [pincode.value])


    return (
        <form
            id="registrationForm"
            action="/"
            method="POST"
            onSubmit={(e) => submitData(e)}
        >
            <Container>
                <Row>
                    <ToastContainer />
                    <Col sm="6">

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                            <Col sm="12">
                                <Form.Label>Enter Area Name</Form.Label>

                                <Form.Control type="text"
                                    name="AreaName"
                                    value={AreaName.value}
                                    placeholder="Enter Name"
                                    onChange={(e) => setAreaName({ ...AreaName, value: e.target.value })}
                                    onBlur={() => setAreaName({ ...AreaName, touched: true })}
                                />

                                {isError(AreaName) && <p className='text-danger'>{AreaName.error}</p>}

                            </Col>
                        </Form.Group>
                    </Col>
                    <Col sm="6">
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                            <Col sm="12">
                                <Form.Label>Enter Pincode</Form.Label>
                                <Form.Control type="text"
                                    name="pincode"
                                    value={pincode.value}
                                    placeholder="Enter Address"
                                    onChange={(e) => setPincode({ ...pincode, value: e.target.value })}
                                    onBlur={() => setPincode({ ...pincode, touched: true })}
                                />
                                {isError(pincode) && <p className='text-danger'>{pincode.error}</p>}
                            </Col>
                        </Form.Group>
                    </Col>

                </Row>
            </Container>
            <hr />
            {/* <Button className='float-right'>Submit</Button> */}
            <Button className='float-end' type="submit" disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    )
}
