import axios from 'axios';
import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Table, Tab, Tabs } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import PrintBill from '../PrintBill/PrintBill';
// import CustomModal from '../component/CustomModal';
import SelectDropdown from '../../component/SelectDropdown';
import { FaPrint } from 'react-icons/fa';
import ClientRecord from './ClientRecord';
import CustomTable from '../../component/CustomTable';

export default function ClientsBilling() {
    const [isLoading, setisLoading] = useState(false);
    const [Bills, setBills] = useState([]);
    // const [getMonth, setMonth] = useState(new Date());
    // const [printClient, setprintClient] = useState("");
    const [GetClientId, setGetClientId] = useState(null);
    const [ClientRecordmodalShow, setClientRecordModalShow] = useState(false);
    const [workingDays, setworkingDays] = useState(0);


    useEffect(() => {
        setisLoading(true)
        axios.get('http://www.muktainursesbureau.in/API/singleclient.php').then((res) => {
            setBills(res.data)
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
                show={ClientRecordmodalShow}
                onHide={() => setClientRecordModalShow(false)}
                modalsize="lg"
            />
            <div className='text-center'>
                {
                    isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> :
                        <CustomTable
                            title="Billings"
                            data={Bills}
                            columns={["client_name"]} // only these columns
                            renderers={{
                                client_name: (row) => (
                                    <span
                                        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                        onClick={() => {
                                            setGetClientId(row.clientbillid);
                                            setClientRecordModalShow(true);
                                        }}
                                    >
                                        {row.client_name}
                                    </span>
                                ),
                            }}
                        // actions={[
                        //   {
                        //     label: "View",
                        //     onClick: (row) => { alert('View billing for ' + row.clientName); },
                        //     className: "btn btn-sm btn-primary",
                        //   }
                        // ]}
                        />
                }
            </div>

        </div>
    )
}
