import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CustomModal from '../../component/CustomModal';
import AddClients from './AddClients';
import AddService from './AddService';
import DeleteClient from './DeleteClient';


export default function ClientsTable() {

    const [newclientmodalShow, setnewclientmodalShow] = React.useState(false);
    const [AddServiceModal, setAddServiceModal] = React.useState(false);
    const [DeleteClientModal, setDeleteClientModal] = React.useState(false);
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
        axios.get('http://www.muktainursesbureau.in/API/clients.php').then((res) => {
            setClient(res.data)
            // console.log("client", Client);
        })
        // await axios.get('http://www.muktainursesbureau.in/API//activeclients').then((resII) => {
        axios.get('http://www.muktainursesbureau.in/API/activeclients.php').then((resII) => {

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
            
            return (<Button className='btn-sm w-100'

                onClick={() => {
                    setClientUpdate(client);
                    setAddServiceModal(true);
                }}
            >Activate</Button>)
        } else {
            return <Button className='btn-sm btn-danger w-100 disabled'>Activated</Button>
        }
    }

    function deleteclient(client) {
        return(<Button className='btn-sm w-100'

        onClick={() => {
            setClientUpdate(client);
            setDeleteClientModal(true);
        }}
    >Delete</Button>)
    }
    
    
    return <>
        <div>
            <Button size='sm' onClick={() => setnewclientmodalShow(true)}>+</Button>

            <CustomModal
                data={{ title: "Add New Client", component: <AddClients getClientdata={getClientdata} /> }}
                show={newclientmodalShow}
                onHide={() => setnewclientmodalShow(false)}
            />
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
                        <th colSpan={2}>Action</th>
                        
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
                                <td>
                                    {
                                        getactiveclient(client)
                                    }
                                </td>
                                <td>{deleteclient(client)}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>

            <CustomModal
                data={{ title: "Activate Service", component: <AddService getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} /> }}
                show={AddServiceModal}
                onHide={() => setAddServiceModal(false)}
                modalsize="md"

            />
            <CustomModal
                data={{ title: "Delete Client", component: <DeleteClient getClientdata={getClientdata} setClientUpdate={setClientUpdate} clientUpdate={clientUpdate} /> }}
                show={DeleteClientModal}
                onHide={() => setDeleteClientModal(false)}
                modalsize="md"

            />
            <hr />
        </div>
    </>
}
