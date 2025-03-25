import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Policy1 from '../../CommonComponents/Policy1';
import Policy2 from '../../CommonComponents/Policy2';
import Policy3 from '../../CommonComponents/Policy3';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PaymentPolicyTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=' mx-5 my-5 p-5 rounded-lg shadow-lg'>
       <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Refund Policy" {...a11yProps(0)} />
          <Tab label="Privacy Policy" {...a11yProps(1)} />
          <Tab label="Terms & Conditions" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Policy1/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Policy2/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Policy3/>
      </TabPanel>
    </Box>
    </div>
   
  );
}