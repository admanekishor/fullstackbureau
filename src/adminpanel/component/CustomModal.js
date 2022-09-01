import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function CustomModal(props) {
  
  useEffect(() => {
   setTimeout(() => {
    props.onHide()
   },10000);
  }, [props])
  
    return (
      <Modal
        {...props}
        size={props.modalsize}
        className='ml-auto'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.data.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {props.data.component}
          <Button className='float-left' onClick={props.onHide}>Close</Button>
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    );
  }
  
  export default CustomModal;