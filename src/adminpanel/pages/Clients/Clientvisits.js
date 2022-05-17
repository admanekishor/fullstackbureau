import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
// import CustomModal from '../component/CustomModal';
// import AddNewEmp from '../staff/AddNewEmp';
import DatePicker from 'react-datepicker';
import SelectDropdown from '../../component/SelectDropdown';
export default function Clientvisits() {

    const [Visit, setVisit] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [startDate, setstartDate] = useState(new Date())
    const [getAction, setgetAction] = useState(null)
    useEffect(() => {
        // axios.get('http://www.muktainursesbureau.in/API//clientvisit').then((res) => {
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php').then((res) => {
            setVisit(res.data)

            // console.log("clientvisit", res.data);
        })

    }, []);

     var optionlist =  [{ value: "", label: "Select Option" },
    { value: 1, label: "Renew" },{ value: 2, label: "End" }]

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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Visit.map((record, i) => {

                            // startDate
                            var st = record.start_date.split(/[- :]/);
                            var setdate = new Date(Date.UTC(st[0], st[1] - 1, st[2], st[3], st[4], st[5]));
                            // end date
                            if (record.end_date !== null) {
                                var et = record.end_date.split(/[- :]/);
                                var setenddate = new Date(Date.UTC(et[0], et[1] - 1, et[2], et[3], et[4], et[5]));
                            }


                            return (<tr key={i}>
                                <td>{i + 1}</td>
                                <td>{record.client_name}</td>
                                <td>{record.client_address}</td>
                                <td>{record.staff_name}</td>
                                <td>{record.spaciality_name}</td>
                                {/* <td>{dateobj(record.start_date)}</td> */}
                                <td>
                                    <DatePicker

                                        disabled
                                        dateFormat="dd/MM/yyyy"
                                        className='form-control btn btn-sm btn-danger'
                                        selected={setdate}
                                    // onChange={(date) => setstartDate(date)}
                                    />
                                </td>
                                <td className='text-center'>
                                    {record.end_date ?
                                        <DatePicker
                                            disabled
                                            dateFormat="dd/MM/yyyy"
                                            className='form-control btn btn-sm btn-danger'
                                            selected={setenddate}
                                        // onChange={(date) => setstartDate(date)}
                                        />
                                        :
                                        <DatePicker

                                            dateFormat="dd/MM/yyyy"
                                            className='form-control btn btn-sm btn-primary'
                                            selected={startDate}
                                        onChange={(date) => setstartDate(date)}
                                        />}
                                </td>
                                <td>{
                                    record.end_date ? <Button className='btn btn-sm w-100'>Renew</Button>
                                        :
                                     <Button className='btn btn-sm w-100'>End</Button>
                                        // <SelectDropdown
                                        
                                        //     data={{
                                        //         list: optionlist
                                        //     }}
                                        //     isMulti={false}
                                        //     isSearchable={false}
                                        //     onChange={(e) => {
                                        //         console.log("getstaff", e)
                                        //         setgetAction(e.value)

                                        //     }}
                                        
                                        // />

                                }</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
