import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
// import CustomModal from '../component/CustomModal';
// import AddNewEmp from '../staff/AddNewEmp';
import DatePicker from 'react-datepicker';
import CustomModal from '../../component/CustomModal';
import SelectDropdown from '../../component/SelectDropdown';
import AddNewEmp from '../staff/AddNewEmp';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Clientvisits() {

    const [Visit, setVisit] = useState([]);
    // const [Loading, setLoading] = useState(true)
    const [modalShow, setModalShow] = React.useState(false);
    const [startDate, setstartDate] = useState(new Date())
    const [endDate, setendDate] = useState(new Date())
    const [selectclint, setselectclint] = useState(null)
    // const [getAction, setgetAction] = useState(null)
    const [columnDefs, setColumnDefs] = useState([null])
    useEffect(() => {
        getclientvisitdata()

    }, []);

    const getclientvisitdata = () => {
        axios.get('http://www.muktainursesbureau.in/API/clientvisit.php').then((res) => {

            if (res.data) {
                setVisit(res.data)

                res.data.map((column) => {
                    Object.keys(column).map((field) => {

                        // console.log("field", { "field": field });
                        setColumnDefs({ "field": field })
                    })
                    // setColumnDefs(field);
                    // array.push({ "field" : Object.keys(column) })
                    // setColumnDefs(array)
                    // console.log("columnDefs", columnDefs)
                })
            } else {

                setVisit([])

            }

            // console.log("clientvisit", res);
        })
    }

    // const updateenddate = () => {
    //     if (!selectclint) {
    //         alert("pelese select clint")
    //         return

    //     }
    //     var senddataapi = {
    //         visitId: selectclint.id,
    //         endDate: endDate
    //     }
    //     console.log("senddataapi", senddataapi)

    //     axios.post('http://www.muktainursesbureau.in/API/updateclientvisit.php', senddataapi).then((res) => {
    //         getclientvisitdata()
    //         setModalShow(false)
    //     })
    // }

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                    rowData={Visit}
                    columnDefs={columnDefs}>
                </AgGridReact>

            <h2>dempo</h2>
        </div>
    )
}
