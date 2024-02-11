import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Table, Tab, Tabs } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import PrintBill from '../PrintBill/PrintBill';
// import CustomModal from '../component/CustomModal';
import SelectDropdown from '../../component/SelectDropdown';
import { FaPrint } from 'react-icons/fa';
import ClientRecord from './ClientRecord';
export default function ClientsBilling() {
    const [isLoading, setisLoading] = useState(false);
    const [Visit, setVisit] = useState([]);
    // const [getMonth, setMonth] = useState(new Date());
    // const [printClient, setprintClient] = useState("");
    const [GetClientId, setGetClientId] = useState(null);
    const [ClientmodalShow, setClientModalShow] = useState(false);
    const [workingDays, setworkingDays] = useState(0);


    useEffect(() => {
        setisLoading(true)
        axios.get('http://www.muktainursesbureau.in/API/singleclient.php').then((res) => {
            setVisit(res.data)
            setisLoading(false)
        })
    }, [])

    // console.log("visit", Visit);

    // const daycalculate = (start_date, end_date) => {
    //     const start = new Date(start_date);
    //     const end = new Date(end_date);
    //     let dayCount = 0
    //     while (end > start) {
    //         dayCount++
    //         start.setDate(start.getDate() + 1)
    //     }
    //     return dayCount;
    // }

    return (
        <div>
            <br />
            <CustomModal
                data={{ title: "Show Client month of work Details", component: <ClientRecord GetClientId={GetClientId} /> }}
                show={ClientmodalShow}
                onHide={() => setClientModalShow(false)}
                modalsize="lg"
            />
            <div className='text-center'>
                {
                    isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> :
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    {/* <th>paid type</th> */}
                                    <th>Client Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Visit.map((record, i) => {
                                        
                                        return (<tr key={i}>
                                            <td>{i + 1}</td>
                                            {/* <td>
                                                <p>paid</p>
                                            </td> */}
                                            <td><label onClick={() => {
                                                setGetClientId(record.clientbillid)
                                                // setprintClient(record.clientbillid)
                                                setClientModalShow(true)
                                            }}>
                                                  {record.client_name}
                                            </label>
                                            </td>
                                           
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
