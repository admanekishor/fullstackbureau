import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import MUIDataTable from "mui-datatables";

export default function Areas() {
    const [Areas, setAreas] = useState([]);
    useEffect(() => {
        getAreas();
    }, [])
    const columns = [{ label: "ID", name: "id" }, { label: "Name", name: "areaname" }, { label: "Pincode", name: "pincode" }];
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
        page: 0
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
            <MUIDataTable
                title={"ACME Employee list"}
                data={Areas}
                columns={columns}
                options={options}
            />
        </>
    )
}
