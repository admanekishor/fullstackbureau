import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import CustomToolbar from '../../component/CustomToolbar';
import CustomDialogBox from '../../component/CustomDialogBox';
import AddLocation from './AddLocation';
import CustomModal from '../../component/CustomModal';
import Updatelocation from './Updatelocation';
import { FaPencilAlt } from 'react-icons/fa';
import API_URLS from '../../../api/api';

export default function Areas() {
    const [Areas, setAreas] = useState([]);
    const [Selected, setSelected] = useState([])
    const [AddLocationModal, setAddLocationModal] = useState(false)
    const [UpdateLocationModal, setUpdateLocationModal] = useState(false)
    useEffect(() => {
        getAreas();
    }, []);
    const handleClick = () => {
        // console.log("demo", AddLocationModal);
        AddLocationModal === true ? setAddLocationModal(false) : setAddLocationModal(true)

    };
    const getclientData = () => {
        UpdateLocationModal === true ? setUpdateLocationModal(false) : setUpdateLocationModal(true)
    }

    const columns = [
        {

            label: "Id",
            name: "id",


        },
        {

            label: "Areaname",
            name: "areaname",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: "Pincode",
            name: "pincode",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "Actions",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (

                        <Button className='btn-sm d-flex'
                            title='Edit'
                            onClick={() => {

                                getclientData(true);
                            }}
                        ><FaPencilAlt /></Button>
                    )
                }
            }
        },
    ];
    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: "standard",
        serverSide: false,
        downloadOptions: {
            filename: 'excel-format.csv',
            separator: ';',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
            }
        },
        onRowClick: ((rowMeta) => {
            setSelected(rowMeta)
            // console.log(rowData, rowMeta);
        }),
        customToolbar: () => {
            return <CustomToolbar onclick={handleClick} />;
        }
    };

    async function getAreas() {
        await axios.get(API_URLS.Areas).then((res) => {
            // Axios automatically parses JSON, no JSON.parse needed
            console.log(res.data); // Object: {status: "200", result: [...]}
            const localareas = [];
            if (res.data.status === "200") {
                res.data.result.map(item => {
                    localareas.push({
                        id: item.id,
                        areaname: item.areaname,
                        pincode: item.pincode,
                    });
                });
                setAreas(localareas);
            } else {
                console.log(res.data.message);
            }
        }).catch((err) => {
            console.error("Error fetching areas:", err);
        });
        // console.log("clientArea", Areas)
    }
    return (
        <>

            <MUIDataTable
                title={"Area list"}
                data={Areas}
                columns={columns}
                options={options}

            />

            {/* <CustomDialogBox
                data={{ component: <AddLocation /> }}
                AddLocationModal={AddLocationModal}
                setAddLocationModal={setAddLocationModal}
            /> */}
            <CustomModal
                data={{ title: "Add New Area", component: <AddLocation getAreas={getAreas} /> }}
                show={AddLocationModal}
                onHide={() => setAddLocationModal(false)}
            />
            <CustomModal
                data={{ title: "Update Location", component: <Updatelocation Selected={Selected} getAreas={getAreas} /> }}
                show={UpdateLocationModal}
                onHide={() => setUpdateLocationModal(false)}
            />
        </>
    )
}
