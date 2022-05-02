import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SelectDropdown from '../../component/SelectDropdown';

export default function StaffSelect({setclientVisitor, clientVisitor}) {

    const [option, SetOption] = useState(null);
    useEffect(() => {
        getstaff();
    }, []);

    async function getstaff() {
        await axios.get('http://www.muktainursesbureau.in/API/staff.php').then((res) => {
            var arr = [];
            res.data.map((item) => {
                arr.push(
                    {
                        value: item.id,
                        label: item.name,
                    });
            });
            SetOption(arr)
        })

    }

    return (
        <div>
            <SelectDropdown
                data={{ list: option }}
                isMulti={false}
                isSearchable={true}
                onChange={(e) => {
                    setclientVisitor({ ...clientVisitor, value: e.value })
                }}
            />
        </div>
    )
}
