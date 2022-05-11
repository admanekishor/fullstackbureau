import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
// import CustomModal from '../component/CustomModal';
// import AddNewEmp from '../staff/AddNewEmp';

export default function Clientvisits() {

    const [Visit, setVisit] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        // axios.get('http://www.muktainursesbureau.in/API//clientvisit').then((res) => {
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php').then((res) => {
            setVisit(res.data)

            // console.log("clientvisit", res.data);
        })

    }, [])
    return (
        <div>
            {/* <Button size='sm' onClick={() => setModalShow(true)}>+</Button>

            <CustomModal
                data={{ title: "Add New Employee", component: <AddNewEmp /> }}
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalSize="lg"
            /> */}
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Address</th>
                        <th>Staff Name</th>
                        <th>spaciality name</th>
                        <th>start date</th>
                        <th>End date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Visit.map((record, i) => {
                            var dateobj = (i) =>{
                                return i = new Date().toJSON().slice(0,10).split('-').reverse().join('/')
                            }
                            return (<tr key={i}>
                                <td>{i + 1}</td>
                                <td>{record.client_name}</td>
                                <td>{record.client_address}</td>
                                <td>{record.staff_name}</td>
                                <td>{record.spaciality_name}</td>
                                <td>{dateobj(record.start_date)}</td>
                                <td className='text-center'>
                                    {record.end_date ? dateobj(record.end_date) : <Button size='sm'>End</Button>}
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
