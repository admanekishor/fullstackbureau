import React, { useState, useContext, useEffect } from 'react';
// import { Button } from 'bootstrap';
import axios from 'axios';
import { Authcontext } from '../../../config/AppRoutes'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectDropdown from '../../component/SelectDropdown';



const initialName = {
  key: "empName",
  value: "",
  error: false,
  touched: false,
  regex: /^[A-Za-z]/,
  required: true
};

const initialAddress = {
  key: "empAddress",
  value: "",
  error: false,
  touched: false,
  regex: /^[A-Za-z0-9]/,
  required: true
};

const initialAge = {
  key: "empAge",
  value: "",
  error: false,
  touched: false,
  regex: /^[0-9]/,
  required: true
};

const initialGender = {
  key: "empGender",
  value: "",
  error: false,
  touched: false,
  regex: /^(("\d{1,7}")(,"\d{1,7}")*)?/,
  required: true
};
const initialContact = {
  key: "empContact",
  value: "",
  error: false,
  touched: false,
  regex: /(?=.{10})(?=.*[0-9]+)/g,
  required: true
};
const initialService = {
  key: "empService",
  value: "",
  error: false,
  touched: false,
  regex: /^(("\d{1,7}")(,"\d{1,7}")*)?/,
  required: true
};


const AddNewEmp = ({ getemployeedata }) => {

  const auth = useContext(Authcontext);
  // console.log("Auth", auth.state)
  const [empName, setempName] = useState(initialName);
  const [empAddress, setempAddress] = useState(initialAddress);
  const [empAge, setempAge] = useState(initialAge);
  const [empGender, setempGender] = useState(initialGender);
  const [empContact, setempContact] = useState(initialContact);
  const [empService, setempService] = useState(initialService);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [specialityoption, setSpecialityoption] = useState(null)

  useEffect(() => {
    getspeciality();
  }, []);

  async function getspeciality() {
    // await axios.get('http://localhost:9000/speciality').then((res) => {
    await axios.get('http://www.muktainursesbureau.in/API/speciality.php').then((res) => {
      var arr = [];
      res.data.result.map((item) => {
        arr.push(
          {
            value: item.id,
            label: item.name,
          });
      });
      setSpecialityoption(arr)
    })

  }

  const Genderoption = [{ value: "male", label: "Male" },
  { value: "female", label: "FeMale" },
  { value: "other", label: "Other" }
  ];

  const handleChange = (e) => {
    setempGender({ ...empGender, value: e })
  }


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

    setempName({ ...empName, error: validate(empName), touched: true });
    setempAddress({ ...empAddress, error: validate(empAddress), touched: true });
    setempAge({ ...empAge, error: validate(empAge), touched: true });
    setempGender({ ...empGender, error: validate(empGender), touched: true });
    setempContact({ ...empContact, error: validate(empContact), touched: true });
    setempService({ ...empService, error: validate(empService), touched: true });


    if (!empName.error && !empAddress.error && !empAddress.error && !empAge.error && !empGender.error && !empContact.error && !empService.error) {
      const empData = {
        empName: empName.value,
        empAddress: empAddress.value,
        empAge: empAge.value,
        empGender: empGender.value.value,
        empContact: empContact.value,
        empService: empService.value.map((spId) => spId.value),
      }
      // console.log("empdata", empData)
      axios.post('http://www.muktainursesbureau.in/API/insertstaff.php', empData).then((res) => {
        console.log("inserted id", res)
        getemployeedata()
        return res
      }).catch((err) => {
        console.log("err", ...err)
      })

      setTimeout(() => {
        setempName(initialName);
        setempAddress(initialAddress);
        setempAge(initialAge);
        setempGender(initialGender);
        setempContact(initialContact);
        setempService(initialService);

        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setempName({ ...empName, error: validate(empName) })
  }, [empName.value])
  useEffect(() => {
    setempAddress({ ...empAddress, error: validate(empAddress) })
  }, [empAddress.value])
  useEffect(() => {
    setempAge({ ...empAge, error: validate(empAge) })
  }, [empAge.value])
  useEffect(() => {
    setempGender({ ...empGender, error: validate(empGender) })
  }, [empGender.value])
  useEffect(() => {
    setempContact({ ...empContact, error: validate(empContact) })
  }, [empContact.value])
  useEffect(() => {
    setempService({ ...empService, error: validate(empService) })
  }, [empService.value])

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
            <Col sm="6">

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                <Col sm="12">
                  <Form.Control type="text"
                    name="empName"
                    value={empName.value}
                    placeholder="Enter Name"
                    onChange={(e) => setempName({ ...empName, value: e.target.value })}
                    onBlur={() => setempName({ ...empName, touched: true })}
                  />

                  {isError(empName) && <p className='text-danger'>{empName.error}</p>}

                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">
                  <Form.Control type="text"
                    name="empAddress"
                    value={empAddress.value}
                    placeholder="Enter Address"
                    onChange={(e) => setempAddress({ ...empAddress, value: e.target.value })}
                    onBlur={() => setempAddress({ ...empAddress, touched: true })}
                  />
                  {isError(empAddress) && <p className='text-danger'>{empAddress.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextage">
                <Col sm="12">
                  <Form.Control type="text"
                    name="empAge"
                    value={empAge.value}
                    placeholder="Enter Age"
                    onChange={(e) => setempAge({ ...empAge, value: e.target.value })}
                    onBlur={() => setempAge({ ...empAge, touched: true })}
                  />
                  {isError(empAge) && <p className='text-danger'>{empAge.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextage">
                <Col sm="12">
                  <img url="" />
                </Col>
                <Col sm="12">
                  <Form.Control type="file"
                    name="empAge"
                  />
                  <br/>
                  <Button className='float-start btn-sm' variant="danger" type="submit" disabled={isSubmitting}>
                    Upload!
                  </Button>
                  {/* {isError(empAge) && <p className='text-danger'>{empAge.error}</p>} */}
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextgender">
                <Col sm="12">

                  <SelectDropdown
                    name="empGender"
                    value={empGender.value}
                    data={{ list: Genderoption }}
                    isMulti={false}
                    isSearchable={false}
                    onChange={handleChange}
                  />

                  {isError(empGender) && <p className='text-danger'>{empGender.error}</p>}
                </Col>



              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextcontact">
                <Col sm="12">
                  <Form.Control type="text"
                    name="empContact"
                    value={empContact.value}
                    placeholder="Enter Contact"
                    onChange={(e) => setempContact({ ...empContact, value: e.target.value })}
                    onBlur={() => setempContact({ ...empContact, touched: true })}
                  />
                  {isError(empContact) && <p className='text-danger'>{empContact.error}</p>}
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">

                  <SelectDropdown
                    name="empService"
                    value={empService.value}
                    data={{ list: specialityoption }}
                    isMulti={true}
                    isSearchable={false}
                    onChange={(e) => {
                      setempService({ ...empService, value: e })
                    }}
                  />

                  {isError(empService) && <p className='text-danger'>{empService.error}</p>}
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

export default AddNewEmp;


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
