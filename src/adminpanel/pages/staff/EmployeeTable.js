import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import AddNewEmp from '../staff/AddNewEmp';
import EditEmp from '../staff/EditEmp';
import { FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';


export default function EmployeeTable() {

    const [isLoading, setisLoading] = useState(false);
    const [NewempmodalShow, setNewempModalShow] = React.useState(false);
    const [EditmodalShow, setEditmodalShow] = React.useState(false);

    const [EmployeeList, setEmployeeList] = useState([]);
    const [Empupdate, setEmpupdate] = useState({})

    // console.log(props)
    useEffect(() => {
        getemployeedata()
    }, [])
    useEffect(() => {
        deleteemployee()
    }, [])



    async function getemployeedata() {
        setisLoading(true)
        // await axios.get('http://www.muktainursesbureau.in/API//staff').then((res) => {
        await axios.get('http://www.muktainursesbureau.in/API/staff.php').then((res) => {
            setEmployeeList(res.data.result)
            // console.log("emplist", EmployeeList);
            setisLoading(false)
        })
    }
    async function deleteemployee(e) {
        const empData = { empId: e }
        // console.log("deleted id", empData);
        //    await axios.post('http://www.muktainursesbureau.in/API//staff/delete', empData).then((res) => {
        await axios.post('http://www.muktainursesbureau.in/API/deletestaff.php', empData).then((res) => {
            // console.log("deleted res", res);
            getemployeedata()
        })
    }

    return <>
        <div>
            <Button size='sm' onClick={() => setNewempModalShow(true)}>+</Button>

            <hr />
            <div className='text-center'>
                {
                    isLoading ? <img src={require('../../../assets/images/loader.gif')} /> :
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
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    EmployeeList.map((employee, i) => {
                                        return (<tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.age}</td>
                                            <td>{employee.gender}</td>
                                            <td>{employee.contact}</td>
                                            <td>{employee.active ? "Active" : "InActive"}</td>
                                            <td>{employee.specialityname}</td>
                                            <td valign='middle'>
                                                {/* <div className='d-flex justify-content-center align-items-center'> */}
                                                <Button className='btn-sm' onClick={() => {
                                                    setEmpupdate(employee)
                                                    setEditmodalShow(true)
                                                }}><FaPencilAlt /></Button>
                                                {/* </div> */}
                                            </td>
                                            <td valign='middle'>
                                                <Button className='btn-sm' onClick={() => {
                                                    if (window.confirm('Are you sure to delete this record?')) {
                                                        deleteemployee(employee.id)
                                                    }
                                                }}>
                                                    <RiDeleteBinFill size={16} />
                                                </Button>
                                                {/* </div> */}
                                            </td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>
                }
            </div>


            <CustomModal
                data={{ title: "Add New Staff", component: <AddNewEmp getemployeedata={getemployeedata} /> }}
                show={NewempmodalShow}
                onHide={() => setNewempModalShow(false)}
                modalsize="md"

            />

            <CustomModal
                data={{ title: "Edit Staff", component: <EditEmp Empupdate={Empupdate} setEmpupdate={setEmpupdate} /> }}
                show={EditmodalShow}
                onHide={() => setEditmodalShow(false)}
                modalSize="md"
            />
        </div >
    </>
}
