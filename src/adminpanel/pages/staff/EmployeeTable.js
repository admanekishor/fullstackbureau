import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../components/CustomModal';
import AddNew from '../AddNew';


export default function EmployeeTable() {

    const [modalShow, setModalShow] = React.useState(false);

    const [EmployeeList, setEmployeeList] = useState([]);

    // console.log(props)
    useEffect(() => {
        // axios.get('http://localhost:9000/employees').then((res) => {
        axios.get('http://localhost/project/provisonstoreAPiPHP/View.php').then((res) => {
            setEmployeeList(res.data.result)
            console.log("res", EmployeeList);
        })

    }, [])
    return <>
        <div>
            <Button size='sm' onClick={() => setModalShow(true)}>+</Button>

            <CustomModal
                data={{ title: "Add New Staff", component: <AddNew /> }}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Active</th>
                        <th>Speciality</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        EmployeeList.map((employee, i) => {
                            return (<tr>
                                <td>{i + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.address}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.sex}</td>
                                <td>{employee.contact}</td>
                                <td>{employee.active}</td>
                                <td>{employee.specialityname}</td>
                            </tr>)
                        })
                    } */}
                </tbody>
            </Table>

        </div>
    </>
}
