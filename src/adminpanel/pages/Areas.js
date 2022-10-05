import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

export default function Areas() {
    const [Areas, setAreas] = useState([]);
    useEffect(() => {
        getAreas();
    }, [])
    
    async function getAreas() {
        await axios.get('http://www.muktainursesbureau.in/API/areas.php').then((res) => {

        console.log("res", res)
            var localareas = [];
            res.data.result.map((item) => {
                
                localareas.push(
                    {
                        id: item.id,
                        name: item.areaname,
                        pin: item.pincode,
                    });
                    setAreas(localareas)
            });
            // console.log("clientArea", Areas)
        })
    }
    return (
   <Table>
    
     <>
    {
        Areas.map((itm, i)=>{
            return(
                <tr>
                    <td><p>{itm.id}</p></td>
                    <td><p>{itm.name}</p></td>
                    <td><p>{itm.pin}</p></td>
                </tr>
            )
        })
    }
    </>
   </Table>
    )
}
