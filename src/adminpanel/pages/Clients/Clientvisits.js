import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
// import CustomModal from '../component/CustomModal';
// import AddNewEmp from '../staff/AddNewEmp';
import DatePicker from 'react-datepicker';
import CustomModal from '../../component/CustomModal';
import SelectDropdown from '../../component/SelectDropdown';
import AddNewEmp from '../staff/AddNewEmp';
export default function Clientvisits() {

    const [Visit, setVisit] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setendDate] = useState(new Date())
    const [selectclint, setselectclint] = useState(null)
    // const [getAction, setgetAction] = useState(null)
    useEffect(() => {
        getclientvisitdata()

    }, []);

    const getclientvisitdata = () =>{
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php').then((res) => {

        if(res.data){
            setVisit(res.data)

        }else{

            setVisit([])

        }

            // console.log("clientvisit", res);
        })
    }

    const updateenddate = () => {

        if (!selectclint) {
            alert("pelese select clint")
            return

        }

        // console.log("updateenddate", selectclint)

        var senddataapi = {
            visitId: selectclint.id,
            endDate: endDate
        }
        console.log("senddataapi", senddataapi)

        axios.post('http://www.muktainursesbureau.in/API/updateclientvisit.php', senddataapi).then((res) => {
            getclientvisitdata()
            setModalShow(false)
        })
    }

    return (
        <div>
            {/* <Button size='sm' onClick={() => setModalShow(true)}>+</Button> */}


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

                            console.log("map record", i, record)

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
                                    />
                                </td>
                                <td className='text-center'>
                                    {record.end_date ?
                                        <DatePicker
                                            disabled
                                            dateFormat="dd/MM/yyyy"
                                            className='form-control btn btn-sm btn-danger'
                                            selected={setenddate}
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
                                   
                                        <>
                                            <Button className='btn btn-sm w-100' onClick={() => {
                                                console.log("end", record, i)
                                                setselectclint(record)
                                                setModalShow(true)
                                            }}>End</Button>
                                            <CustomModal
                                                data={{
                                                    title: "Select End Date", component: <>

                                                        <Row>
                                                            <Col>
                                                                <label>Select End Date</label>
                                                            </Col>
                                                            <Col>
                                                                <DatePicker

                                                                    placeholderText='Enter End Date'
                                                                    dateFormat="dd/MM/yyyy"
                                                                    className='form-control'
                                                                    selected={endDate}
                                                                    onChange={(date) => setendDate(date)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Button className='float-end'

                                                            onClick={() => {
                                                                console.log("submit", record, i)
                                                                updateenddate()
                                                            }}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </>
                                                }}
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                            // modalSize="lg"
                                            />
                                        </>

                                }</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
