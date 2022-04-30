import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import AddNew from '../staff/AddNewEmp';


export default function StaffTable() {

    const [modalShow, setModalShow] = React.useState(false);

    const [EmployeeList, setEmployeeList] = useState([]);

    // console.log(props)
    useEffect(() => {
        axios.get('http://localhost:9000/staffdetails').then((res) => {
        // axios.get('http://localhost/project/provisonstoreAPiPHP/staffdetails.php').then((res) => {
            setEmployeeList(res.data.result)
            console.log("stafftable", EmployeeList);
        });

    },[])
    return <>
        <div>
            <Button size='sm' onClick={() => setModalShow(true)}>+</Button>

            <CustomModal
                data={{title:"Add New Staff", component:<AddNew />}}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>document type</th>
                        <th>document image</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        EmployeeList.map((employee, i) => {
                            return (<tr>
                                <td>{i+1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.address}</td>
                                <td>{employee.documenttype}</td>
                                <td><img src={`data:image/jpeg;base64, ${employee.document_img}`} /></td>
                               
                            </tr>)
                        })
                    } */}
                </tbody>
            </Table>

        </div>
    </>
}
