import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import SelectDropdown from '../../component/SelectDropdown';
import API_URLS from '../../../api/api';


export default function Speciality() {
  const [option, SetOption] = useState({
    value: '', label: '',
  });
  
  // console.log("spceialityoption", option);
  
  useEffect(() => {
    getspeciality();
  }, []);

  async function getspeciality() {
  await  axios.get(API_URLS.Speciality).then((res) => {
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
