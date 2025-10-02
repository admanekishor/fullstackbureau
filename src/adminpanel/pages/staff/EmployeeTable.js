import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import AddNewEmp from '../staff/AddNewEmp';
import EditEmp from '../staff/EditEmp';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';
import API_URLS from '../../../api/api';


export default function EmployeeTable() {

    const [isLoading, setisLoading] = useState(false);
    const [NewempmodalShow, setNewempModalShow] = React.useState(false);
    const [EditmodalShow, setEditmodalShow] = React.useState(false);

    const [Employee, setEmployee] = useState([]);
    const [Activestaff, setActivestaff] = useState([])
    const [updateEmployee, setupdateEmployee] = useState({})

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
        await axios.get(API_URLS.Staff).then((res) => {
            setEmployee(res.data.result)
            //console.log("emplist", res.data);
            setisLoading(false)
        })
        await axios.get(API_URLS.Activestaff).then((resII) => {
            setActivestaff(resII.data)
           // console.log("emplist", resII.data);
            setisLoading(false);
        })
    }
    
    async function deleteemployee(e) {
        const empData = { empId: e }
        // console.log("deleted id", empData);
        //    await axios.post('http://www.muktainursesbureau.in/API//staff/delete', empData).then((res) => {
        await axios.post(API_URLS.Deletestaff, empData).then((res) => {
            // console.log("deleted res", res);
            getemployeedata()
        })
    }
    const activestaff = (employee) => {
        // console.log(employee.id);
        const activeStaff = Activestaff.map((emp) => emp.id);
        if (!activeStaff.includes(employee.id)) {

            return (<Button className='btn-sm'
                title='Activate'
                onClick={() => {
                    setupdateEmployee(employee);
                    // setAddServiceModal(true);
                }}
            ><FaCheck size={16} /></Button>)
        } else {
            return (<Button
                className='btn-sm btn-danger'
                title='Activated'>
                <FaCheck size={16} />
            </Button>)
        }
    }
const editEmployee = (employee)=>{
  return  <Button className='btn-sm' onClick={() => {
        setupdateEmployee(employee)
        setEditmodalShow(true)
    }}><FaPencilAlt size={16} /></Button>
}
    
    return <>
        <div>
            <Button size='sm' onClick={() => setNewempModalShow(true)}>+</Button>

            <hr />
            <div className='text-center'>
                {
                    isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> :
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Contact</th>
                                    {/* <th>Active</th> */}
                                    <th>Speciality</th>
                                    <th colSpan={3}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Employee.map((employee, i) => {
                                        return (<tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.address}</td>
                                            <td>{employee.age}</td>
                                            <td>{employee.gender}</td>
                                            <td>{employee.contact}</td>
                                            <td>{employee.specialityname}</td>
                                            <td valign='middle'>{
                                                activestaff(employee)
                                            }</td>
                                            <td valign='middle'>
                                             
                                               {editEmployee(employee)}
                                              
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
                data={{ title: "Edit Staff", component: <EditEmp updateEmployee={updateEmployee} setupdateEmployee={setupdateEmployee} /> }}
                show={EditmodalShow}
                onHide={() => setEditmodalShow(false)}
                modalSize="md"
            />
        </div >
    </>
}
