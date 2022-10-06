import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import CustomToolbar from '../component/CustomToolbar';
import CustomDialogBox from '../component/CustomDialogBox';

export default function Areas() {
    const [Areas, setAreas] = useState([]);
    const [ShowModal, setShowModal] = useState(false)
    useEffect(() => {
        getAreas();
    }, []);
    const handleClick = () => {
        console.log("demo", ShowModal);
        ShowModal === true ? setShowModal(false) : setShowModal(true)

    };


    const columns = [
        { label: "ID", name: "id" },
        { label: "Name", name: "areaname" },
        { label: "Pincode", name: "pincode" },
    ];
    const options = {
        filter: false,
        sort: true,
        print: false,
        download: false,
        pagination: true,
        search: true,
        selectableRowsHeader: true,
        sortFilterList: true,
        viewColumns: true,
        selectableRows: true,
        rowsPerPage: 7,
        rowsPerPageOptions: [7, 14, 21, 28],
        serverSide: false,
        page: 0,
        customToolbar: () => {
            return <CustomToolbar onclick={handleClick} />;
        }
    };

    async function getAreas() {
        await axios.get('http://www.muktainursesbureau.in/API/areas.php').then((res) => {

            console.log("res", res)
            var localareas = [];
            res.data.result.map((item) => {

                localareas.push(
                    {
                        id: item.id,
                        areaname: item.areaname,
                        pincode: item.pincode,
                    });
                setAreas(localareas)
            });
            // console.log("clientArea", Areas)
        })
    }
    return (
        <>
            <CustomDialogBox ShowModal={ShowModal} setShowModal={setShowModal} />
            <MUIDataTable
                title={"ACME Employee list"}
                data={Areas}
                columns={columns}
                options={options}
            />
        </>
    )
}
