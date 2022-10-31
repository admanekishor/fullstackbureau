import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Authcontext } from '../../../config/AppRoutes'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectDropdown from '../../component/SelectDropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialName = {
  key: "clientName",
  value: "",
  error: false,
  touched: false,
  regex: /^[A-Za-z]/,
  required: true
};

const initialAddress = {
  key: "clientAddress",
  value: "",
  error: false,
  touched: false,
  regex: /^[A-Za-z0-9]/,
  required: true
};
// client area by select option regex
const initialclientArea = {
  key: "clientArea",
  value: "",
  error: false,
  touched: false,
  regex: /^(("\d{1,7}")(,"\d{1,7}")*)?/,
  required: true
};

const initialContact = {
  key: "clientContact",
  value: "",
  error: false,
  touched: false,
  regex: /(?=.{10})(?=.*[0-9]+)/g,
  required: true
};

const initialAltContact = {
  key: "clientAltContact",
  value: "",
  error: false,
  touched: false,
  regex: /(?=.{10})(?=.*[0-9]+)/g,
  required: true
};
const initialServiceHrs = {
  key: "clientAltContact",
  value: "",
  error: false,
  touched: false,
  regex: /(?=.{10})(?=.*[0-9]+)/g,
  required: true
};
// client bill amount by number
const initialclientAmount = {
  key: "clientAmount",
  value: "",
  error: false,
  touched: false,
  regex: /^[A-Za-z0-9]/,
  required: true
};


const AddClients = ({ getClientdata, afterclose }) => {


  const auth = useContext(Authcontext);
  // console.log("Auth", auth.state)
  const [clientName, setclientName] = useState(initialName);
  const [clientAddress, setclientAddress] = useState(initialAddress);
  const [clientArea, setclientArea] = useState(initialclientArea);
  const [clientContact, setclientContact] = useState(initialContact);
  const [clientAltContact, setclientAltContact] = useState(initialAltContact);
  const [serviceHrs, setserviceHrs] = useState(initialServiceHrs)
  const [clientAmount, setclientAmount] = useState(initialclientAmount);
  const [areaOptions, setAreaOptions] = useState(null)

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

  async function getAreas() {
    await axios.get('http://www.muktainursesbureau.in/API/areas.php').then((res) => {

      var localareas = [];
      res.data.result.map((item) => {
        localareas.push(
          {
            value: item.id,
            label: item.areaname,
          });
      });
      setAreaOptions(localareas)
    })

  }

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

    setclientName({ ...clientName, error: validate(clientName), touched: true });
    setclientAddress({ ...clientAddress, error: validate(clientAddress), touched: true });
    setclientArea({ ...clientArea, error: validate(clientArea), touched: true });
    setclientContact({ ...clientContact, error: validate(clientContact), touched: true });
    setclientAltContact({ ...clientAltContact, error: validate(clientAltContact), touched: true });
    setserviceHrs({ ...serviceHrs, error: validate(serviceHrs), touched: true });
    setclientAmount({ ...clientAmount, error: validate(clientAmount), touched: true });



    if (!clientName.error && !clientAddress.error && !clientArea.error && !clientContact.error && !clientAltContact.error && !clientAmount.error) {
      const empData = {
        clientName: clientName.value,
        clientAddress: clientAddress.value,
        clientArea: clientArea.value.value,
        clientContact: clientContact.value,
        clientAltContact: clientAltContact.value,
        serviceHrs: serviceHrs.value,
        clientAmount: clientAmount.value
      }

      // console.log("empData", empData);

      axios.post('http://www.muktainursesbureau.in/API/insertclient.php', empData).then((res) => {
        // console.log("res", res);
        getClientdata();
        notify()
        afterclose();
        return res
      }).catch((err) => {
        console.log("err", ...err)
      })

      setTimeout(() => {

        setclientName(initialName);
        setclientAddress(initialAddress);
        setclientArea(initialclientArea)
        setclientContact(initialContact);
        setclientAltContact(initialAltContact);
        setserviceHrs(initialServiceHrs);
        setclientAmount(initialclientAmount);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  }


  useEffect(() => {
    getAreas();
  }, []);


  useEffect(() => {
    setclientName({ ...clientName, error: validate(clientName) })
  }, [clientName.value])

  useEffect(() => {
    setclientAddress({ ...clientAddress, error: validate(clientAddress) })
  }, [clientAddress.value])

  useEffect(() => {
    setclientArea({ ...clientArea, error: validate(clientArea) })
  }, [clientArea.value])

  useEffect(() => {
    setclientContact({ ...clientContact, error: validate(clientContact) })
  }, [clientContact.value])

  useEffect(() => {
    setclientAltContact({ ...clientAltContact, error: validate(clientAltContact) })
  }, [clientAltContact.value])

  useEffect(() => {
    setserviceHrs({ ...serviceHrs, error: validate(serviceHrs) })
  }, [serviceHrs.value])

  useEffect(() => {
    setclientAmount({ ...clientAmount, error: validate(clientAmount) })
  }, [clientAmount.value])



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
            <ToastContainer />
            <Col sm="6">

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                <Col sm="12">
                  <Form.Label>Enter Name</Form.Label>

                  <Form.Control type="text"
                    name="clientName"
                    value={clientName.value}
                    placeholder="Enter Name"
                    onChange={(e) => setclientName({ ...clientName, value: e.target.value })}
                    onBlur={() => setclientName({ ...clientName, touched: true })}
                  />

                  {isError(clientName) && <p className='text-danger'>{clientName.error}</p>}

                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">
                  <Form.Label>Select Client Area</Form.Label>
                  <SelectDropdown
                    name="clientArea"
                    value={clientArea.value}
                    data={{ list: areaOptions }}
                    isMulti={false}
                    isSearchable={true}
                    onChange={(e) => {
                      setclientArea({ ...clientArea, value: e })
                    }}
                  />
                  {isError(clientArea) && <p className='text-danger'>{clientArea.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">
                  <Form.Label>Enter Client Address</Form.Label>
                  <Form.Control type="text"
                    name="clientAddress"
                    value={clientAddress.value}
                    placeholder="Enter Address"
                    onChange={(e) => setclientAddress({ ...clientAddress, value: e.target.value })}
                    onBlur={() => setclientAddress({ ...clientAddress, touched: true })}
                  />
                  {isError(clientAddress) && <p className='text-danger'>{clientAddress.error}</p>}
                </Col>
              </Form.Group>


            </Col>
            <Col sm="6">
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextcontact">
                <Col sm="12">
                  <Form.Label>Enter Client Contact</Form.Label>
                  <Form.Control type="text"
                    name="clientContact"
                    value={clientContact.value}
                    placeholder="Enter Contact"
                    onChange={(e) => setclientContact({ ...clientContact, value: e.target.value })}
                    onBlur={() => setclientContact({ ...clientContact, touched: true })}
                  />
                  {isError(clientContact) && <p className='text-danger'>{clientContact.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextcontact">
                <Col sm="12">
                  <Form.Label>Enter Client Alt. Contact</Form.Label>
                  <Form.Control type="text"
                    name="clientAltContact"
                    value={clientAltContact.value}
                    placeholder="Enter Alternate Contact"
                    onChange={(e) => setclientAltContact({ ...clientAltContact, value: e.target.value })}
                    onBlur={() => setclientAltContact({ ...clientAltContact, touched: true })}
                  />
                  {isError(clientAltContact) && <p className='text-danger'>{clientAltContact.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextcontact">
                <Col sm="12">
                  <Form.Label>Enter Service Hours</Form.Label>
                  <SelectDropdown
                    name="clientArea"
                    value={clientArea.value}
                    data={{ list: areaOptions }}
                    isMulti={false}
                    isSearchable={true}
                    onChange={(e) => {
                      setclientArea({ ...clientArea, value: e })
                    }}
                  />
                  {isError(clientAltContact) && <p className='text-danger'>{clientAltContact.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextcontact">
                <Col sm="12">
                  <Form.Label>Enter Client Discuss Amount</Form.Label>
                  <Form.Control type="text"
                    name="initialclientAmount"
                    value={clientAmount.value}
                    placeholder="Enter Discuss Amount"
                    onChange={(e) => setclientAmount({ ...clientAmount, value: e.target.value })}
                    onBlur={() => setclientAmount({ ...clientAmount, touched: true })}
                  />
                  {isError(clientAmount) && <p className='text-danger'>{clientAmount.error}</p>}
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
    </>
  );

}

export default AddClients;


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
