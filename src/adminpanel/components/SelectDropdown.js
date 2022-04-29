import React, { useState } from 'react'
import Select from 'react-select'

export default function SelectDropdown(props) {

  // const [selected, SetSelected] = useState(null)

  // console.log("prpd", props.data.list);

  return (
    <div style={{width:'100%'}}>
      <Select
        isClearable="true"
        options={props.data.list}
        isSearchable="true"
        isMulti="true"
      />
    </div>
  )
}
