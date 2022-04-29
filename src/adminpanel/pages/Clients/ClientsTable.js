import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../components/CustomModal';
import AddNew from '../AddNew';


export default function ClientsTable() {

    const [modalShow, setModalShow] = React.useState(false);

    const [Client, setClient] = useState([]);

    // console.log(props)
    useEffect(() => {
        // axios.get('http://localhost:9000/clients').then((res) => {
        axios.get('http://localhost/project/provisonstoreAPiPHP/ClientView.php').then((res) => {
            setClient(res.data.result)
            // console.log("res", Client);
        })

    },[])
    return <>
        <div>
            <Button size='sm' onClick={() => setModalShow(true)}>+</Button>

            <CustomModal
                data={{title:"Add New Employee", component:<AddNew />}}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Service</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Client.map((employee, i) => {
                            return (<tr>
                                <td>{i}</td>
                                <td>{employee.name}</td>
                                <td>{employee.address}</td>
                                <td>{employee.contact}</td>
                                <td>{employee.servicetype}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>

        </div>
    </>
}
