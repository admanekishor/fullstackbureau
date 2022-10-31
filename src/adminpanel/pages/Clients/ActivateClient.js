import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Authcontext } from '../../../config/AppRoutes'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectDropdown from '../../component/SelectDropdown';
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


const ActivateClient = ({ clientUpdate, getClientdata, afterclose }) => {
  const auth = useContext(Authcontext);

  const [clientVisitor, setclientVisitor] = useState(initialClientvisitor);
  const [empService, setempService] = useState(initialService)
  const [startDate, setstartDate] = useState(new Date())

  // const [specialityoption, setSpecialityoption] = useState(null)
  const [availableStaff, setavailableStaff] = useState([]);
  // const [availablestaffII, setavailablestaffII] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);


  // const validate = (obj) => {
  //   let error;
  //   if (!obj.value) {
  //     error = "Required";
  //   } else if (!obj.regex.test(obj.value)) {
  //     error = `Invalid ${obj.key}`;
  //   }
  //   return error;
  // };


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

    // setempService({ ...empService, error: validate(empService), touched: true });
    // setclientVisitor({ ...clientVisitor, error: validate(clientVisitor), touched: true });



    if (!clientVisitor.error && !empService.error) {


      const empData = {

        // clientVisitor: clientVisitor.value,
        // empService: empService.value,
        clientId: clientUpdate.id,
        // startDate: startDate.toISOString().slice(0, 19).replace('T', ' ')
      }
    
      console.log("empData", empData);
      axios.post('http://www.muktainursesbureau.in/API/activateclient.php', empData).then((res) => {
        console.log(res.data)
        getClientdata()
        notify()
        afterclose()
        // setAddServiceModal(false)
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
          
        </Container>
        <hr />
        {/* <Button className='float-right'>Submit</Button> */}
        <Button className='btn-danger float-end' type="submit" disabled={isSubmitting}>
          Delete
        </Button>
      </form>
    </>
  );

}

export default ActivateClient;


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
