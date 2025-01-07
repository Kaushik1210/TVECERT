import React from 'react'
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const List = () => {
    


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel htmlFor="grouped-native-select">Management System</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping">
          <option aria-label="None" value="" />

          <optgroup label="Quality">
            <option value={1}>ISO 9001:2015 Lead Auditor</option>
            <option value={2}>ISO 9001:2015 Internal Auditor</option>
            <option value={3}>ISO 9001:2015 Transition Training</option>
          </optgroup>

          <optgroup label="Environmental">
            <option value={1}>ISO 14001:2015 Lead Auditor</option>
            <option value={2}>ISO 14001:2015 Internal Auditor</option>
            <option value={3}>ISO 14001:2015 Auditor Transition</option>
            <option value={4}>ISO 14001:2015 Auditor Conversion</option>
          </optgroup>

          <optgroup label="Occupational Health and Safety">
            <option value={1}>ISO 45001:2018 Lead Auditor</option>
            <option value={2}>ISO 45001:2018 Auditor Migration</option>
          </optgroup>
          
          <optgroup label="Information Securiy">
            <option value={1}>ISO 27001:2022 Lead Auditor</option>
            <option value={2}>ISO 27001:2022 Internal Auditor</option>
          </optgroup>

          <optgroup label="Food Safety">
            <option value={1}>ISO 22000:2005 Lead Auditor</option>
            <option value={2}>ISO 22000:2005 Internal Auditor</option>
            <option value={2}>ISO 22000:2018 Auditor Transition</option>
          </optgroup>

          <optgroup label="Food Safety">
            <option value={1}>Lead Auditor</option>
            
          </optgroup>

        </Select>
      </FormControl>
 
    </div>
  )
}

export default List
