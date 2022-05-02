// import logo from './logo.svg';
// import '../../App.css';
import React, { useState, useContext, useEffect } from 'react';
// import { Button } from 'bootstrap';
import axios from 'axios';
import { Authcontext } from '../../../config/AppRoutes'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectDropdown from '../../component/SelectDropdown';
import StaffSelect from '../staff/StaffSelect';
// import DatePicker from 'react-date-picker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialService = {
  key: "empService",
  value: "",
  error: false,
  touched: false,
  regex: /^(("\d{1,7}")(,"\d{1,7}")*)?/,
  required: true
};

const initialClientvisitor = {
  key: "clientVisitor",
  value: "",
  error: false,
  touched: false,
  regex: /^(("\d{1,7}")(,"\d{1,7}")*)?/,
  required: true
};


const AddService = ({ clientUpdate, getClientdata }) => {
  const auth = useContext(Authcontext);

  const [clientVisitor, setclientVisitor] = useState(initialClientvisitor);
  const [empService, setempService] = useState(initialService)
  const [startDate, setstartDate] = useState(new Date())

  const [specialityoption, setSpecialityoption] = useState(null)
  const [availableStaff, setavailableStaff] = useState([]);
  // const [availablestaffII, setavailablestaffII] = useState([])
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

    setempService({ ...empService, error: validate(empService), touched: true });
    setclientVisitor({ ...clientVisitor, error: validate(clientVisitor), touched: true });



    if (!clientVisitor.error && !empService.error) {


      const empData = {

        clientVisitor: clientVisitor.value,
        empService: empService.value,
        clientId: clientUpdate.id,
        startDate: startDate
      }
      // console.log("empData", empData)
      // setValidated(true)
      // console.log("first", Validated);
      console.log("empData", empData);
      axios.post('http://www.muktainursesbureau.in/API/insertclientvisit.php', empData).then((res) => {
        console.log(res.data)
        getClientdata()
        notify()
        return res
      }).catch((err) => {
        console.log("err", ...err)
      })

      setTimeout(() => {

        setempService(initialService);
        setclientVisitor(initialClientvisitor);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }

  }


  useEffect(() => {
    getspeciality();
  }, []);


  async function getspeciality() {
    await axios.get('http://www.muktainursesbureau.in/API/speciality.php').then((res) => {
      var arr = [];
      res.data.map((item) => {
        arr.push(
          {
            value: item.id,
            label: item.name,
          });
      });
      setSpecialityoption(arr)
    })

  }

  async function getstaff(e) {
    const specialitydata = { specialityId: e.value }

    console.log("specialitydata", specialitydata);

    axios.post('http://www.muktainursesbureau.in/API/getstaffbyspeciality.php', specialitydata).then((res) => {
      var staffs = [];
      res.data.map((option) => {
        staffs.push({
          value: option.id,
          label: option.name,
        });

      });
      setavailableStaff(staffs)
    })
  }

  useEffect(() => {
    setempService({ ...empService, error: validate(empService) })
  }, [empService.value])

  useEffect(() => {
    setclientVisitor({ ...clientVisitor, error: validate(clientVisitor) })
  }, [clientVisitor.value])



  return (
    <>

      <form
        id="registrationForm"
        action="/"
        method="POST"
        onSubmit={(e) => submitData(e)}
      >
        <Container>
          <ToastContainer />
          <Row>
            <Col sm="12">

              <Form.Group as={Row} className="mb-3" controlId="formPlaintextname">
                <Col sm="12">
                  <p><strong>Client Name :</strong> {clientUpdate.name}</p>
                  <p><strong>Address :</strong> {clientUpdate.address}</p>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">
                  <Form.Label>Select Require Service</Form.Label>
                  <SelectDropdown
                    data={{ list: specialityoption }}
                    isMulti={false}
                    isSearchable={false}
                    onChange={(e) => {
                      console.log("getstaff", e)
                      setempService({ ...empService, value: e.value })
                      getstaff(e)
                    }}
                  />
                  {isError(empService) && <p className='text-danger'>{empService.error}</p>}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">
                  <Form.Label>Select Staff</Form.Label>
                  <SelectDropdown
                    data={{ list: availableStaff }}
                    isMulti={false}
                    isSearchable={false}
                    onChange={(e) => {
                      setclientVisitor({ ...clientVisitor, value: e.value })

                    }}
                    isDisabled={!availableStaff ? true : false}
                  />
                  {isError(clientVisitor) && <p className='text-danger'>{clientVisitor.error}</p>}
                </Col>
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextaddress">
                <Col sm="12">
                  <Form.Label>Select Start Date</Form.Label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    className='form-control'
                    selected={startDate}
                    onChange={(date) => setstartDate(date)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Container>
        <hr />
        {/* <Button className='float-right'>Submit</Button> */}
        <Button className='float-right' type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </>
  );

}

export default AddService;


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
