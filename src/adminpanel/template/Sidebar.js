import React, { useContext, useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import Employees from '../pages/Employees';
import Areas from '../pages/Locations/Areas';
import ClientsBilling from '../pages/Clients/ClientsBilling';
import ClientVisits from '../pages/Clients/Clientvisits';
// import { Authcontext } from '../Auth/Auth';


const routes = [
    {
        path: "",
        name: "Dashboard",
        element: <Dashboard />,
    },
    {
        path: "clientvisits",
        name: "Client Visits",
        element: <ClientVisits />,
    },
    {
        path: "clients",
        name: "Clients",
        element: <Clients />,
    },
    {
        path: "employees",
        name: "Employees",
        element: <Employees />,
    },
    {
        path: "cities",
        name: "Local Areas",
        element: <Areas />,
    },
    {
        path: "billings",
        name: "Billings",
        element: <ClientsBilling />,
    },

    // { path: "/admin", name: "Admin", element: "" },
];


export default function Sidebar() {
    const location = useLocation();

    const lastword = location.pathname.split("/").slice(2, 3);

    const [URLstring, setURLstring] = useState("");
    // const [isActive, setisActive] = useState("");
    useEffect(() => {
        setURLstring(lastword)
    }, [location])


    const geturlstring = (path) => {
        const queryparam = path
            .split("/")
            .slice(0, 2)
            .filter((ch) => ch.trim().length > 0);
        // if (URLstring.toString() == queryparam.toString()) {
        // console.log("URLstring", queryparam.toString());
        // }
    };

    return (
        <div key={1} style={{ height: '90vh', background: '#343a40' }}>
            <ListGroup defaultActiveKey="clientvisit" variant="flush">

                {routes.map(({ path, name, i }) => (
                    <ListGroup.Item
                        key={path || i}
                        variant={URLstring == path
                            .split("/")
                            .slice(0, 2)
                            .filter((ch) => ch.trim().length > 0).toString() ? "dark" : "secondary"}
                    // className={URLstring == path
                    //   .split("/")
                    //   .slice(0, 2)
                    //   .filter((ch) => ch.trim().length > 0).toString() ? "active" : ""}
                    >
                        <Link
                            to={path}
                            className="sidebarMenu"
                            onClick={() => geturlstring(path)}
                            style={{ textDecoration: 'none', color: '#333' }}
                        >
                            {name}
                        </Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}
