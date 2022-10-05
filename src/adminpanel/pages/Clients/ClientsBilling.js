import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Table, Tab, Tabs } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import PrintBill from '../PrintBill/PrintBill';
// import CustomModal from '../component/CustomModal';
import SelectDropdown from '../../component/SelectDropdown';
import { FaPrint } from 'react-icons/fa';
export default function ClientsBilling() {
    const [isLoading, setisLoading] = useState(false);
    const [Visit, setVisit] = useState([]);
    // const [getMonth, setMonth] = useState(new Date());
    const [printClient, setprintClient] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [workingDays, setworkingDays] = useState(0);


    useEffect(() => {
        setisLoading(true)
        axios.get('http://www.muktainursesbureau.in/API/Billing.php').then((res) => {
            setVisit(res.data)
            setisLoading(false)
        })
    }, [])

    // console.log("visit", Visit);

    const daycalculate = (start_date, end_date) => {
        const start = new Date(start_date);
        const end = new Date(end_date);
        let dayCount = 0
        while (end > start) {
            dayCount++
            start.setDate(start.getDate() + 1)
        }
        return dayCount;

    }

    return (
        <div>
            <br />
            <CustomModal
                data={{ title: "Add New Employee", component: <PrintBill printClient={printClient} setprintClient={setprintClient} /> }}
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalsize="lg"
            />
            <Tabs
                defaultActiveKey="pendingbill"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="pendingbill" title="Pending Bill">

                    <div className='text-center'>
                        {
                            isLoading ? <img src={require('../../../assets/images/loader.gif')} /> :
                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Client Name</th>
                                            <th>Address</th>

                                            <th>start date</th>
                                            <th>Service Days</th>
                                            <th>action</th>
                                            <th>pending</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Visit.map((record, i) => {
                                                const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
                                                    <Button size='sm' onClick={onClick} ref={ref}>
                                                        {value}
                                                    </Button>
                                                ));

                                                return (<tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{record.client_name}</td>
                                                    <td>{record.client_address}</td>

                                                    <td>{record.start_date}</td>
                                                    <td>

                                                        {
                                                            daycalculate(record.start_date, record.end_date)
                                                        }
                                                    </td>

                                                    {/* <td>{record.end_date}</td> */}
                                                    <td>
                                                        {
                                                            record.start_date && record.end_date
                                                                ? <Button size="sm" title="Print" onClick={() => {
                                                                    setprintClient(record)
                                                                    setModalShow(true)
                                                                }}><FaPrint /></Button> : ""

                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            record.ispaid ? "Pending" : ""
                                                        }
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </Table>
                        }
                    </div>
                </Tab>
                <Tab eventKey="paidbill" title="Paid Bill">
                    <div className='text-center'>
                        {
                            isLoading ? <img src={require('../../../assets/images/loader.gif')} /> :
                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Client Name</th>
                                            <th>Address</th>

                                            <th>start date</th>
                                            <th>Service Days</th>
                                            <th>action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Visit.map((record, i) => {
                                                const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
                                                    <Button size='sm' onClick={onClick} ref={ref}>
                                                        {value}
                                                    </Button>
                                                ));

                                                return (<tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{record.client_name}</td>
                                                    <td>{record.client_address}</td>

                                                    <td>{record.start_date}</td>
                                                    <td>

                                                        {
                                                            daycalculate(record.start_date, record.end_date)
                                                        }
                                                    </td>

                                                    {/* <td>{record.end_date}</td> */}
                                                    <td>
                                                        {
                                                            record.start_date && record.end_date
                                                                ? <Button size="sm"
                                                                    title="Print" onClick={() => {
                                                                        setprintClient(record)
                                                                        setModalShow(true)
                                                                    }}><FaPrint /></Button> : ""

                                                        }
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </Table>
                        }
                    </div>
                </Tab>

            </Tabs>

        </div>
    )
}
