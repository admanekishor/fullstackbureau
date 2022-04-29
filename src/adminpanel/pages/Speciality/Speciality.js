import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import SelectDropdown from '../../components/SelectDropdown';


export default function Speciality() {
  const [option, SetOption] = useState({
    value: '', label: '',
  });
  
  // console.log("spceialityoption", option);
  
  useEffect(() => {
    getspeciality();
  }, []);

  async function getspeciality() {
  await  axios.get('http://localhost:9000/speciality').then((res) => {
      // console.log("res", res.data)
      var arr = [];
      res.data.map((item) => {
        // console.log("item", item)
        arr.push({
          value: item.id,
          label: item.name,
        });
      });
      SetOption(arr)
      // console.log("options", option)
    })

  }

  return (
    <div>
     <SelectDropdown data={{ list:option}} />
    </div>
  )
}
