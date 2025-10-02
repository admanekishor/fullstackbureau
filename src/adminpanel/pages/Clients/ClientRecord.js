import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Table, Tab, Tabs } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import PrintBill from '../PrintBill/PrintBill';
// import CustomModal from '../component/CustomModal';

import { FaPrint } from 'react-icons/fa';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { formatDate } from 'react-calendar/dist/cjs/shared/dateFormatter';
import API_URLS from '../../../api/api';

export default function ClientRecord(props) {
    console.log("ClientRecord props", props);
    
    const { GetClientId } = props;
    const [isLoading, setisLoading] = useState(false);
    const [Visit, setVisit] = useState([]);
    // const [getMonth, setMonth] = useState(new Date());
    const [printClient, setprintClient] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [workingDays, setworkingDays] = useState(0);

    const [clientId, setclientId] = useState(GetClientId)
    const [payMode, setpayMode] = useState('');
    const [selecteddate, setselectedDate] = useState(new Date());

    // const [paymentDetails, setpaymentDetails] = useState({
    //     clientId: GetClientId,
    //     payDate: new Date(),
    //     paymode: "",
    // })

    useEffect(() => {

        getclientDetails()
    }, [])

    console.log("visit", Visit);

    const getclientDetails = () => {
        const clientData = {
            clientId: GetClientId,
        }
        // console.log(clientId)
        setisLoading(true)
        axios.post(API_URLS.SingleClient, clientData).then((res) => {

            setVisit(res.data)
            setisLoading(false)
            console.log("res", res.data);
        })
    }
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
    const currentMonth = (start_date, end_date) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const start = new Date(start_date);
        const end = new Date(end_date);
        let dayCount = month[end.getUTCMonth()];

        return dayCount;

    }


    const getPaymentDetails = ((e) => {
        const visitid = e.target.dataset.id;

        // const customdate = selecteddate.toString().split('-').reverse().join('-');
        const payvisitdata = { visitid: visitid, c_id: clientId, payMode: payMode, paydate: selecteddate };
        console.log("data", payvisitdata);

        axios.post(API_URLS.Paybill, payvisitdata).then((res) => {
            console.log(res.data)

        }).catch((err) => {
            console.log("err", ...err)
        })

    })

    return (
        <div>
            <CustomModal
                data={{ title: "Print Bill of Employee", component: <PrintBill printClient={printClient} setprintClient={setprintClient} /> }}
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalsize="lg"
            />
            <div className='text-center'>
                {
                    isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> :
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th colSpan={4}>
                                        {
                                            Visit.map((record, i) => {
                                                if(i == 0){

                                                    return record.client_name
                                                }
                                            })
                                        }
                                    </th>
                                </tr>
                                <tr>

                                    <th>#</th>
                                    {/* <th>Client Name</th> */}
                                    {/* <th>Address</th> */}

                                    <th>Service Month</th>
                                    <th>Service Days</th>
                                    {/* <th>date</th> */}
                                    <th>action</th>
                                    {/* <th>paid type</th>
                                    <th>payment date</th>
                                    <th>submit</th> */}

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Visit.map((record, i) => {
                                        console.log("Visit", Visit);
                                        
                                        const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
                                            <Button size='sm' onClick={onClick} ref={ref}>
                                                {value}
                                            </Button>
                                        ));

                                        return (<tr key={i}>
                                            <td>{i + 1}</td>
                                            {/* <td>{record.client_name}</td> */}
                                            {/* <td>{record.client_address}</td> */}

                                            {/* <td>{record.start_date}</td> */}
                                            <td>

                                                {
                                                    currentMonth(record.start_date, record.end_date)
                                                }
                                            </td>
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
                                            {/* <td>
                                                {
                                                    record.ispaid === '0' ?

                                                        <select className='form-select' onChange={((e) => setpayMode(e.target.value))}>
                                                            <option value="">select payment mode</option>
                                                            <option value="1">Cash</option>
                                                            <option value="2">Cheque</option>
                                                            <option value="3">UPI</option>
                                                            <option value="4">Net banking</option>
                                                        </select> : ""
                                                }
                                            </td>
                                            <td>

                                                <input type="date" className='form-control'
                                                    value={selecteddate}
                                                    onChange={(e) => setselectedDate(e.target.value)}
                                                ></input>
                                            </td>
                                            <td>
                                                <button className='btn btn-primary' data-id={record.id} onClick={getPaymentDetails}>
                                                    pay
                                                </button>
                                            </td> */}
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>
                }
            </div>

        </div>
    )
}
