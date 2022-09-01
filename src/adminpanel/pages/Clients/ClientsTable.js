import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import AddClients from './AddClients';
import AddService from './AddService';
import DeleteClient from './DeleteClient';
import { FaCheck, FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBinFill } from "react-icons/ri";
import UpdateClients from './UpdateClient';

export default function ClientsTable() {

    const [newclientmodalShow, setnewclientmodalShow] = React.useState(false);
    const [AddServiceModal, setAddServiceModal] = React.useState(false);
    const [DeleteClientModal, setDeleteClientModal] = React.useState(false);
    const [UpdateClientModal, setUpdateClientModal] = React.useState(false);
    const [clientUpdate, setClientUpdate] = useState({});
    const [Client, setClient] = useState([]);
    const [activeClient, setactiveClient] = useState([]);
    // console.log(props)
    useEffect(() => {
        getClientdata()

    }, [])

    var activeclent = [];
    async function getClientdata() {
        // await axios.get('http://www.muktainursesbureau.in/API//clients').then((res) => {
       await axios.get('http://www.muktainursesbureau.in/API/clients.php').then((res) => {
            setClient(res.data)
            // console.log("client", Client);
        })
        // await axios.get('http://www.muktainursesbureau.in/API//activeclients').then((resII) => {
       await axios.get('http://www.muktainursesbureau.in/API/activeclients.php').then((resII) => {

            if (resII.data) {

                setactiveClient(resII.data)
            } else {

                setactiveClient([])
            }
        })
    }


    function getactiveclient(client) {
        activeclent = activeClient.map((item) => item.id)
        if (!activeclent.includes(client.id)) {

            return (<Button className='btn-sm d-flex'
                title='Activate'
                onClick={() => {
                    setClientUpdate(client);
                    setAddServiceModal(true);
                }}
            ><FaCheck size={15} /></Button>)
        } else {
            return <Button className='btn-sm btn-danger d-flex' title='Activated'> <FaCheck size={15} /></Button>
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

    function Editclient(client) {
        return (<Button className='btn-sm d-flex'
            title='Edit'
            onClick={() => {
                setClientUpdate(client);
                setUpdateClientModal(true);
            }}
        ><FaPencilAlt /></Button>)
    }


    return <>
        <div>
            <Button size='sm' onClick={() => setnewclientmodalShow(true)}>+</Button>
            <hr />
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

            <CustomModal
                data={{ title: "Add New Client", component: <AddClients getClientdata={getClientdata} /> }}
                show={newclientmodalShow}
                onHide={() => setnewclientmodalShow(false)}
            />

            <CustomModal
                data={{ title: "Update Client", component: <UpdateClients getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} /> }}
                show={UpdateClientModal}
                onHide={() => setUpdateClientModal(false)}
            />

            <CustomModal
                data={{ title: "Delete Client", component: <DeleteClient getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate}  /> }}
                show={DeleteClientModal}
                onHide={() => setDeleteClientModal(false)}
                modalsize="md"

            />

            <CustomModal
                data={{ title: "Activate Service", component: <AddService getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} /> }}
                show={AddServiceModal}
                onHide={() => setAddServiceModal(false)}
                modalsize="md"

            />
            <hr />
        </div>
    </>
}
