import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Authcontext } from '../Auth/Auth';

export default function Sidebar() {

    return <>
        <div style={{ height: '90vh', background: '#343a40' }}>
            <ListGroup variant="flush">
                <ListGroup.Item action variant="dark" href="#link1"> 
                    Dashboard
                </ListGroup.Item>
                <ListGroup.Item action variant="dark" href="#link2">
                    Clients
                </ListGroup.Item>
                <ListGroup.Item action variant="dark" href="#link3">
                    Employees
                </ListGroup.Item>
                <ListGroup.Item action variant="dark" href="#link4">
                    Staff Details
                </ListGroup.Item>
            </ListGroup>
        </div>
    </>
}
