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

const MainURL = "http://www.muktainursesbureau.in/API";

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
    const [PrevData, setPrevData] = useState([]);
    // set selected client working staff


    // console.log(props)
    useEffect(() => {
        getClientdata()

    }, [])

    var activeclent = [];
    async function getClientdata() {
        setisLoading(true)

        await axios.get(MainURL + '/' + 'clients.php').then((res) => {
            setClient(res.data)
            // console.log("client", Client);
            setisLoading(false)
        })
        // await axios.get('http://www.muktainursesbureau.in/API//activeclients').then((resII) => {
        await axios.get(MainURL + '/' + 'activeclients.php').then((resII) => {

            if (resII.data) {

                setactiveClient(resII.data)
                setisLoading(false)
            } else {

                setactiveClient([])
            }
        })
        await axios.get(MainURL + '/' + 'InActiveClients.php').then((resIII) => {
            setInactiveClient(resIII.data)
            // console.log("client", Client);
            setisLoading(false)
        })
    }


    const getPrevData = useCallback(async (props) => {
            {
                // console.log("props", props)
                const Prevdata = { clientId: props.id }
                // console.log("PrevdataApi", Prevdata)

                await axios.post(MainURL + '/' + 'selectedclientvisit.php', Prevdata).then((res) => {
                    console.log("Prevdata", res.data);

                    if (res.data) {
                        res.data.map((item) => {
                            setPrevData(item)
                        })

                    }
                })
                // console.log("PrevData", PrevData)
            }
        },
        [PrevData],
    )


    // console.log("SelectedWorkStaff", SelectSplType);

    function getactiveclient(client) {
        activeclent = activeClient.map((item) => item.id)
        if (!activeclent.includes(client.id)) {

            return (<Button className='btn-sm d-flex'
                title='Activate'
                onClick={() => {
                    setClientUpdate(client);
                    // getPrevData(client.id)
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
                            <Table striped bordered hover size="sm" responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>area</th>
                                        <th>Contact</th>
                                        <th>Amount</th>
                                        <th colSpan={3}>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Client.map((client, i) => {
                                            return (<tr key={i + 1}>
                                                <td>{i + 1}</td>
                                                <td>{client.name}</td>
                                                <td>{client.address}</td>
                                                <td>{client.areacode}</td>
                                                <td>{client.contact}</td>
                                                <td>{client.amount}</td>
                                                <td>{getactiveclient(client)}</td>
                                                <td>{Editclient(client)}</td>
                                                <td>{deleteclient(client)}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </Table>
                        }
                    </div>
                </Tab>
                <Tab eventKey="InActiveClient" title="Closed Clients">
                    <div className='text-center'>
                        {isLoading ? <img src={require('../../../assets/images/loader.gif')} width="5%" /> : <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>area</th>
                                    <th>Contact</th>
                                    <th>Amount</th>
                                    <th colSpan={3}>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    InactiveClient.map((client, i) => {
                                        return (<tr key={i + 1}>
                                            <td>{i + 1}</td>
                                            <td>{client.name}</td>
                                            <td>{client.address}</td>
                                            <td>{client.areacode}</td>
                                            <td>{client.contact}</td>
                                            <td>{client.amount}</td>
                                            <td>{getactiveclient(client)}</td>
                                            <td>{Editclient(client)}</td>
                                            <td>{undeleteclient(client)}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>}
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
