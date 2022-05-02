import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import PrintBill from '../PrintBill/PrintBill';
// import CustomModal from '../component/CustomModal';
import AddNewEmp from '../staff/AddNewEmp';

export default function ClientsBilling() {

    const [Visit, setVisit] = useState([]);
    const [printClient, setprintClient] = useState("");
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php').then((res) => {
            setVisit(res.data)
        })

    }, [])
    return (
        <div>
            <br />
            <CustomModal
                data={{ title: "Add New Employee", component: <PrintBill printClient={printClient} setprintClient={setprintClient} /> }}
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalsize="lg"
            />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Address</th>

                        <th>start date</th>
                        <th>End date</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Visit.map((record, i) => {

                            return (<tr key={i}>
                                <td>{i + 1}</td>
                                <td>{record.client_name}</td>
                                <td>{record.client_address}</td>

                                <td>{record.start_date}</td>
                                <td>{record.end_date}</td>
                                <td>
                                    {
                                        record.start_date && record.end_date
                                            ? <Button size="sm" onClick={() => {
                                                setprintClient(record)
                                                setModalShow(true)
                                            }}>Print</Button> : ""

                                    }
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}