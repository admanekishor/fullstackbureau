import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Tab, Tabs } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import AddClients from './AddClients';
import AddService from './AddService';
import DeleteClient from './DeleteClient';
import { FaCheck, FaPencilAlt, FaTrashRestore } from 'react-icons/fa';
import { RiDeleteBinFill } from "react-icons/ri";
import UpdateClients from './UpdateClient';
import ActivateClient from './ActivateClient';
import UndeleteClient from './UndeleteClient';
import CustomTable from '../../component/CustomTable';
import API_URLS from '../../../api/api.js';

export default function ClientsTable() {
    const [isLoading, setisLoading] = useState(false);
    const [newclientmodalShow, setnewclientmodalShow] = React.useState(false);
    const [AddServiceModal, setAddServiceModal] = React.useState(false);
    const [DeleteClientModal, setDeleteClientModal] = React.useState(false);
    const [UndeleteClientModal, setUndeleteClientModal] = React.useState(false);
    const [ActivateClientModal, setActivateClientModal] = useState(false)
    const [UpdateClientModal, setUpdateClientModal] = React.useState(false);
    const [clientUpdate, setClientUpdate] = useState({});
    const [Client, setClient] = useState([]);
    const [activeClient, setactiveClient] = useState([]);
    const [InactiveClient, setInactiveClient] = useState([]);
    // setprevdata
    const [PrevData, setPrevData] = useState({});
    // set selected client working staff


    // console.log(props)
    useEffect(() => {
        getClientdata()

    }, [])

    var activeclent = [];
    async function getClientdata() {
        setisLoading(true)

        await axios.get(API_URLS.clients).then((res) => {
            const data = Array.isArray(res.data) ? res.data : [];
            setClient(data);
            // console.log("client", Client);
            setisLoading(false);
        })
        // await axios.get('http://www.muktainursesbureau.in/API//activeclients').then((resII) => {
        await axios.get(API_URLS.ActiveClients).then((resII) => {

            if (resII.data) {

                setactiveClient(resII.data)
                setisLoading(false)
            } else {

                setactiveClient([])
            }
        })
        await axios.get(API_URLS.inActiveClients).then((resIII) => {
            setInactiveClient(resIII.data)
            // console.log("client", Client);
            setisLoading(false)
        })
    }


    const getPrevData = useCallback(async (client) => {
        if (!client || !client.id) {
            setPrevData({});
            return;
        }
        const Prevdata = { clientId: client.id };
        console.log("PrevdataApi", Prevdata);
        try {
            const res = await axios.post(API_URLS.SelectedClientVisit, Prevdata);
            console.log("Prevdata", res.data);
            // Normalize response: prefer first item when array is returned
            if (Array.isArray(res.data) && res.data.length > 0) {
                setPrevData(res.data[0]);
            } else if (res.data && typeof res.data === 'object') {
                setPrevData(res.data);
            } else {
                setPrevData({});
            }
        } catch (err) {
            console.error('getPrevData error', err);
            setPrevData({});
        }
    }, []);


    // console.log("SelectedWorkStaff", SelectSplType);

    function getactiveclient(client) {
        activeclent = activeClient.map((item) => item.id)
        if (!activeclent.includes(client.id)) {

            return (<Button className='btn-sm d-flex'
                title='Activate'
                onClick={() => {
                    setClientUpdate(client);
                    getPrevData(client);
                    setAddServiceModal(true);
                }}
            ><FaCheck size={15} /></Button>)
        } else {
            return (<Button
                className='btn-sm btn-danger d-flex'
                title='Activated'>
                <FaCheck size={15} />
            </Button>)
        }
    }

    function deleteclient(client) {
        return (<Button className='btn-sm d-flex'
            title='Delete'
            onClick={() => {
                setClientUpdate(client);
                setDeleteClientModal(true);
            }}
        ><RiDeleteBinFill /></Button>)
    }
    function undeleteclient(client) {
        return (<Button className='btn-sm d-flex'
            title='Restore'
            onClick={() => {
                setClientUpdate(client);
                setUndeleteClientModal(true);
            }}
        ><FaTrashRestore /></Button>)
    }
    function activateclient(client) {
        return (<Button className='btn-sm d-flex'
            title='Delete'
            onClick={() => {
                setClientUpdate(client);
                setActivateClientModal(true);
            }}
        ><RiDeleteBinFill /></Button>)
    }

    function Editclient(client) {
        return (<Button className='btn-sm d-flex'
            title='Edit'
            onClick={() => {
                setClientUpdate(client);
                setUpdateClientModal(true);
            }}
        ><FaPencilAlt /></Button>)
    }

    const afterclose = () => {
        setTimeout(() => {
            setnewclientmodalShow(false);
            setUpdateClientModal(false);
            setDeleteClientModal(false);
            setAddServiceModal(false);
            setActivateClientModal(false);
        }, 100);
    }
    return <>
        <div>
            <Button size='sm' onClick={() => setnewclientmodalShow(true)}>+</Button>
            <hr />
            <Tabs
                defaultActiveKey="ActiveClient"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="ActiveClient" title="Active Clients">
                    <div className='text-center'>
                        {isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> :
                            <CustomTable
                                title="Clients"
                                data={Client}
                                columns={["name", "address", "contact", "amount"]} // only these columns
                                actions={[
                                    {
                                        label: <FaCheck size={15} />,
                                        onClick: (row) => {
                                            // Pass full client object so modal can display client details
                                            setClientUpdate(row);
                                            // Fetch previous visit data for this client
                                            getPrevData(row);
                                            setAddServiceModal(true);
                                        },
                                        className: (row) => activeClient.map(item => item.id).includes(row.id) ? "btn btn-sm btn-danger" : "btn btn-sm btn-primary",
                                    },
                                    {
                                        label: "Edit",
                                        onClick: (row) => {
                                            setClientUpdate(row);
                                            setUpdateClientModal(true);
                                        },
                                        className: "btn btn-sm btn-warning",
                                    },
                                    {
                                        label: "Delete",
                                        onClick: (row) => {
                                            setClientUpdate(row);
                                            setDeleteClientModal(true);
                                        },
                                        className: "btn btn-sm btn-danger",
                                    },
                                ]}
                            />
                        }
                    </div>
                </Tab>
                <Tab eventKey="InActiveClient" title="Closed Clients">
                    <div className='text-center'>
                        {isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> : <CustomTable
                            title="Clients"
                            data={InactiveClient}
                            columns={["name", "address", "contact", "amount"]} // only these columns
                            actions={[
                                {
                                    label: <FaCheck size={15} />,
                                    onClick: (row) => {
                                        setClientUpdate(row);
                                        getPrevData(row);
                                        setAddServiceModal(true);
                                    },
                                    className: (row) => activeClient.map(item => item.id).includes(row.id) ? "btn btn-sm btn-danger" : "btn btn-sm btn-primary",
                                },
                                {
                                    label: "Edit",
                                    onClick: (row) => {
                                        setClientUpdate(row);
                                        setUpdateClientModal(true);
                                    },
                                    className: "btn btn-sm btn-warning",
                                },
                                {
                                    label: "Restore",
                                    onClick: (row) => {
                                        setClientUpdate(row);
                                        setUndeleteClientModal(true);
                                    },
                                    className: "btn btn-sm btn-danger",
                                },
                            ]}
                        />}
                    </div>
                </Tab>
            </Tabs>
            <CustomModal
                data={{ title: "Add New Client", component: <AddClients getClientdata={getClientdata} afterclose={afterclose} /> }}
                show={newclientmodalShow}
                onHide={() => setnewclientmodalShow(false)}
            />

            <CustomModal
                data={{ title: "Update Client", component: <UpdateClients getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} afterclose={afterclose} /> }}
                show={UpdateClientModal}
                onHide={() => setUpdateClientModal(false)}
            />

            <CustomModal
                data={{ title: "Delete Client", component: <DeleteClient getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} afterclose={afterclose} /> }}
                show={DeleteClientModal}
                onHide={() => setDeleteClientModal(false)}
                modalsize="md"

            />
            <CustomModal
                data={{ title: "UnDelete Client", component: <UndeleteClient getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} afterclose={afterclose} /> }}
                show={UndeleteClientModal}
                onHide={() => setUndeleteClientModal(false)}
                modalsize="md"

            />
            {/* <CustomModal
                data={{ title: "Delete Client", component: <ActivateClient getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} afterclose={afterclose} /> }}
                show={ActivateClientModal}
                onHide={() => setActivateClientModal(false)}
                modalsize="md"

            /> */}

            <CustomModal
                data={{ title: "Activate Service", component: <AddService getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} getPrevData={getPrevData} PrevData={PrevData} afterclose={afterclose} /> }}
                show={AddServiceModal}
                onHide={() => setAddServiceModal(false)}
                modalsize="md"

            />
            <hr />
        </div>
    </>
}
