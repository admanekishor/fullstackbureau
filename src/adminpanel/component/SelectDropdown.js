import React, { useState } from 'react'
import Select from 'react-select'

export default function SelectDropdown(props) {

  // const [selected, SetSelected] = useState(null)

  console.log("prpd", props);

  return (
    <div style={{ width: '100%' }}>
      <Select
        value={props.value}
        
        isClearable="true"
        options={props.data.list}
        isSearchable={props.isSearchable}
        isMulti={props.isMulti}
        // onChange={(e) => {
        //   props.onChange(e)
        // }}
        {...props}
        isDisabled={props.isDisabled}
      />
    </div>
  )
}
