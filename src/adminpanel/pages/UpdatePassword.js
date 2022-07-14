import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const initialUsername = {
    key: "Username",
    value: "",
    error: false,
    touched: false,
    regex: /^[A-Za-z0-9]/,
    required: true
};
const initialOldPassword = {
    key: "OldPassword",
    value: "",
    error: false,
    touched: false,
    regex: /^[A-Za-z0-9]/,
    required: true
};
const initialNewPassword = {
    key: "NewPassword",
    value: "",
    error: false,
    touched: false,
    regex: /^[A-Za-z0-9]/,
    required: true
};

export default function UpdatePassword({ getClientdata, props }) {

    // props.userInfo.map((details) => {
    //     return <>

    //     </>
    // })

    const [OldPassword, setOldPassword] = useState(initialOldPassword);
    const [Username, setUsername] = useState(initialUsername)
    const [NewPassword, setNewPassword] = useState(initialNewPassword)
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

    const submitData = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setUsername({ ...Username, error: validate(Username), touched: true });
        setOldPassword({ ...OldPassword, error: validate(OldPassword), touched: true });
        setNewPassword({ ...NewPassword, error: validate(NewPassword), touched: true });


        if (!OldPassword.error) {
            const empData = {
                username:Username.value,
                oldpassword: OldPassword.value,
                newpassword:NewPassword.value
            }

            // console.log("empData", empData);

            axios.post('http://www.muktainursesbureau.in/API/updatepassword.php', empData).then((res) => {
                // console.log("res", res);
                getClientdata();
                //   notify()
                return res
            }).catch((err) => {
                console.log("err", ...err)
            })

            setTimeout(() => {

                setOldPassword(initialOldPassword);
                setUsername(initialUsername);
                setIsSubmitting(false);

            }, 1000);
        } else {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        setUsername({...Username, error: validate(Username)})
        setOldPassword({ ...OldPassword, error: validate(OldPassword) })
    }, [OldPassword.value])

    return (
        <>
            <form
                id="registrationForm"
                action="/"
                method="POST"
                onSubmit={(e) => submitData(e)}
            >
                <Container>
                    <Row>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                            <Col sm="12">
                                <Form.Label>Enter Username</Form.Label>

                                <Form.Control type="text"
                                    name="username"
                                    value={Username.value}
                                    placeholder="Enter Username"
                                    onChange={(e) => setUsername({ ...Username, value: e.target.value })}
                                    onBlur={() => setUsername({ ...Username, touched: true })}
                                />

                                {isError(Username) && <p className='text-danger'>{Username.error}</p>}

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                            <Col sm="12">
                                <Form.Label>Enter Old Password</Form.Label>

                                <Form.Control type="text"
                                    name="oldpassword"
                                    value={OldPassword.value}
                                    placeholder="Enter Old Password"
                                    onChange={(e) => setOldPassword({ ...OldPassword, value: e.target.value })}
                                    onBlur={() => setOldPassword({ ...OldPassword, touched: true })}
                                />

                                {isError(OldPassword) && <p className='text-danger'>{OldPassword.error}</p>}

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                            <Col sm="12">
                                <Form.Label>Enter New Password</Form.Label>

                                <Form.Control type="text"
                                    name="newpassword"
                                    value={NewPassword.value}
                                    placeholder="Enter New Password"
                                    onChange={(e) => setNewPassword({ ...NewPassword, value: e.target.value })}
                                    onBlur={() => setNewPassword({ ...NewPassword, touched: true })}
                                />

                                {isError(NewPassword) && <p className='text-danger'>{NewPassword.error}</p>}

                            </Col>
                        </Form.Group>
                    </Row>
                </Container>
                <hr />
                <Button className='float-end' type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
            </form>
        </>
    )
}
