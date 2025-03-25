import React, { useState, useEffect } from "react";  
import { Box, Button, TextField, Grid, Paper, MenuItem, Select, FormControl, InputLabel,  } from "@mui/material";  
import { Radio, RadioGroup, FormControlLabel } from "@mui/material"; 
import { Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";  
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";  
import { DataGrid } from "@mui/x-data-grid";  
import axios from "axios";  
import dayjs from "dayjs";  
import * as XLSX from "xlsx";  
import DelegateFormNav from "./DelegateFormNav";  
import { URL } from "../../../../constant";

const columns = [  
  { field: "delegateName", headerName: "Delegate Name", width: 200 },  
  { field: "certificateNo", headerName: "Certificate No.", width: 180 },  
  { field: "nameOfTheCourse", headerName: "Name of the Course", width: 300 },  
  { field: "issueDate", headerName: "Issue Date", width: 130 },  
  { field: "expiryDate", headerName: "Expiry Date", width: 130 },  
  { field: "status", headerName: "Status", width: 200 },  
];  

// Options for each checkbox
const certificateOptions = {
  "CQI IRCA": [
    "ISO 9001:2015 - CQI IRCA - Quality Management Systems Internal Auditor",
    "ISO 9001:2015 - CQI IRCA - Quality Management Systems Lead Auditor",
    "ISO 9001:2015 - CQI IRCA - Quality Management Systems Transition",
    "ISO 14001:2015 - CQI IRCA - Environmental Management Systems Auditor Conversion",
    "ISO 14001:2015 - CQI IRCA - Environmental Management Systems Internal Auditor",
    "ISO 14001:2015 - CQI IRCA - Environmental Management Systems Lead Auditor",
    "ISO 14001:2015 - CQI IRCA - Environmental Management Systems Transition",
    "ISO 45001:2018 - CQI IRCA - Occupational Health and Safety Management Systems Internal Auditor",
    "ISO 45001:2018 - CQI IRCA - Occupational Health and Safety Management Systems Lead Auditor",
    "ISO 45001:2018 - CQI IRCA - Occupational Health and Safety Management Systems Migration",
    "ISO 22000:2018 - CQI IRCA - Food Safety Management Systems Transition",
    "ISO 22000:2018 - CQI IRCA - Food Safety Management Systems Lead Auditor",
    "CQI IRCA - FSSC 22000 VER 6.0 Lead Auditor",
    "ISO 27001:2022 - CQI IRCA - Information Security Management Systems Internal Auditor",
    "ISO 27001:2022 - CQI IRCA - Information Security Management Systems Lead Auditor",
    "ISO 50001:2018 - CQI IRCA - Energy Management Systems Lead Auditor",
  ],
  "EG": [
    "EXEMPLAR GLOBAL - Annex SL Transition Module 1",
    "ISO 9001:2015 - EXEMPLAR GLOBAL - Quality Management Systems Awareness",
    "ISO 9001:2015 - EXEMPLAR GLOBAL - Quality Management Systems Internal Auditor",
    "ISO 9001:2015 - EXEMPLAR GLOBAL - Quality Management Systems Lead Auditor",
    "ISO 9001:2015 - EXEMPLAR GLOBAL - Quality Management Systems Transition",
    "ISO 9001:2015 - EXEMPLAR GLOBAL - Quality Management Systems Lead Implementor",
    "ISO 14001:2015 - EXEMPLAR GLOBAL - Environmental Management Systems Awareness",
    "ISO 14001:2015 - EXEMPLAR GLOBAL - Environmental Management Systems Auditor Conversion",
    "ISO 14001:2015 - EXEMPLAR GLOBAL - Environmental Management Systems Internal Auditor",
    "ISO 14001:2015 - EXEMPLAR GLOBAL - Environmental Management Systems Lead Auditor",
    "ISO 14001:2015 - EXEMPLAR GLOBAL - Environmental Management Systems Transition",
    "ISO 14001:2015 - EXEMPLAR GLOBAL - Environmental Management Systems Lead Implementor",
    "ISO 45001:2018 - EXEMPLAR GLOBAL - Occupational Health and Safety Management Systems Awareness",
    "ISO 45001:2018 - EXEMPLAR GLOBAL - Occupational Health and Safety Management Systems Internal Auditor",
    "ISO 45001:2018 - EXEMPLAR GLOBAL - Occupational Health and Safety Management Systems Lead Auditor",
    "ISO 45001:2018 - EXEMPLAR GLOBAL - Occupational Health and Safety Management Systems Migration",
    "ISO 45001:2018 - EXEMPLAR GLOBAL - Occupational Health and Safety Management Systems Lead Implementor",
    "ISO 22000:2018 - EXEMPLAR GLOBAL - Food Safety Management Systems Awareness",
    "ISO 22000:2018 - EXEMPLAR GLOBAL - Food Safety Management Systems Internal Auditor",
    "ISO 22000:2018 - EXEMPLAR GLOBAL - Food Safety Management Systems Lead Auditor",
    "ISO 22000:2018 - EXEMPLAR GLOBAL - Food Safety Management Systems Transition",
    "ISO 22000:2018 - EXEMPLAR GLOBAL - Food Safety Management Systems Lead Implementor",
    "EXEMPLAR GLOBAL - FSSC 22000 VER 6.0 Lead Auditor",
    "ISO 27001:2022 - EXEMPLAR GLOBAL - Information Security Management Systems Awareness",
    "ISO 27001:2022 - EXEMPLAR GLOBAL - Information Security Management Systems Internal Auditor",
    "ISO 27001:2022 - EXEMPLAR GLOBAL - Information Security Management Systems Lead Auditor",
    "ISO 27001:2022 - EXEMPLAR GLOBAL - Information Security Management Systems Transition",
    "ISO 27001:2022 - EXEMPLAR GLOBAL - Information Security Management Systems Lead Implementor",
    "ISO 50001:2018 - EXEMPLAR GLOBAL - Energy Management Systems Awareness",
    "ISO 50001:2018 - EXEMPLAR GLOBAL - Energy Management Systems Internal Auditor",
    "ISO 50001:2018 - EXEMPLAR GLOBAL - Energy Management Systems Lead Auditor",
    "ISO 50001:2018 - EXEMPLAR GLOBAL - Energy Management Systems Transition",
    "ISO 50001:2018 - EXEMPLAR GLOBAL - Energy Management Systems Lead Implementor",
  ],
  "EOSH UK": [
    "EOSH UK- Award In Cpr & First Aid",
    "EOSH UK – Award In Ehs Guidelines-Environment, Health & Safety",
    "EOSH UK – Award In Environmental And Social Action Plan (Esap) For Managers",
    "EOSH UK – Award In Environmental Management System Audit Techniques & Best Practices",
    "EOSH UK – Award In Environmental Quality Monitoring & Analysis",
    "EOSH UK- Award In Environmental Sustainability Skills For Managers",
    "EOSH UK- Award In Environmental Sustainability Skills For Workforce",
    "EOSH UK- Award In Environmental Sustainable Monitoring At Workplace",
    "EOSH UK Award In Equipment Safety Inspection",
    "EOSH UK Award In Fire Safety & Hazard Management",
    "EOSH UK Award In Fire Safety For Managers",
    "EOSH UK Award In Firefighting & Fire Extinguisher Safety",
    "EOSH UK – Award In First Aid & Aed",
    "EOSH UK Award In Flagman Safety Training",
    "EOSH UK Award In Health & Safety For Workers",
    "EOSH UK Award In Hse Inspector (Health, Safety & Environment)",
    "EOSH UK Award In Hse Manager (Health, Safety & Environment)",
    "EOSH UK- Award In Life Safety & Environmental Protection",
    "EOSH UK – Award In Lifting & Rigging Supervisor",
    "EOSH UK- Award In Lifting Supervisor",
    "EOSH UK Award In Safe Scaffolding Erection, Dismantling & Modification",
    "EOSH UK – Award In Scaffolding Erector",
    "EOSH UK – Award In Scaffolding Inspector",
    "EOSH UK Award In Scaffolding For Manager",
    "EOSH UK – Award In Scaffolding Supervisor",
    "EOSH UK – Award In Scaffolding Safety Awareness",
    "EOSH UK- Award In Sustainability In Building Structure",
    "EOSH UK- Award In Sustainability In Waste Water Management",
    "EOSH UK Award In Train The Trainer – Lifting & Rigging",
    "EOSH UK Award In Train The Trainer- Fire Safety",
    "EOSH UK Award In Train The Trainer- Scaffolding",
    "EOSH UK Award In Workplace Health & Safety For Supervision",
    "EOSH UK Level 2 – Award In Lifting & Rigging Safety",
    "EOSH UK Level 2 – Award In Workplace Health & Safety",
    "EOSH UK Level 2 Award In Basic Fire Safety",
    "EOSH UK Level 2 Award In Basic Life Support And Safe Use Of An Automated External Defibrillator (Rqf)",
    "EOSH UK Level 2- Award In Basic Rigger And Signalman",
    "EOSH UK Level 2- Award In Basic Scaffolding Safety",
    "EOSH UK Level 2- Award in Basic Workplace Construction & Process Safety",
    "EOSH UK Level 2 Award In Emergency First Aid At Work",
    "EOSH UK Level 2- Award In Environmental Principles",
    "EOSH UK Level 2 Award In Fire & Industrial Safety",
    "EOSH UK Level 2- Award In Introduction To Environmental Sustainability",
    "EOSH UK Level 2- Award in Risk Assessment",
    "EOSH UK Level 3 – Award In Lifting & Rigging Safety",
    "EOSH UK Level 3 – Award In Scaffolding Safety",
    "EOSH UK Level 3 – Award In Workplace Health & Safety",
    "EOSH UK Level 3- Award in Basic Workplace Construction & Process Safety",
    "EOSH UK Level 3- Award In Environmental Management",
    "EOSH UK Level 3- Award In Environmental Sustainability",
    "EOSH UK Level 3 Award In Fire & Industrial Safety",
    "EOSH UK Level 3 Award In Fire Safety Management",
    "EOSH UK Level 3 Award In First Aid At Work",
    "EOSH UK Level 3- Award In Principles Of Rigger And Signalman",
    "EOSH UK Level 3- Award in Risk Assessment",
    "EOSH UK Level 3 –Process Safety Management",
    "EOSH UK Level 4 – Award In Workplace Health & Safety",
    "EOSH UK Level 4- Award In Advanced Rigger And Signalman",
    "EOSH UK Level 4- Award In Environmental Management & Legal Compliance",
    "EOSH UK- Train The Trainer-Hse",
  ],
  "UNACCREDITED COURSES - ISO STANDARDS COURSES": [
    "Annex SL Transition Module 1",
    "ISO 9001:2015 Quality Management Systems Awareness",
    "ISO 9001:2015 Quality Management Systems Internal Auditor",
    "ISO 9001:2015 Quality Management Systems Lead Auditor",
    "ISO 9001:2015 Quality Management Systems Transition",
    "ISO 9001:2015 Quality Management Systems Lead Implementer",
    "ISO 14001:2015 Environmental Management Systems Awareness",
    "ISO 14001:2015 Environmental Management Systems Auditor Conversion",
    "ISO 14001:2015 Environmental Management Systems Internal Auditor",
    "ISO 14001:2015 Environmental Management Systems Lead Auditor",
    "ISO 14001:2015 Environmental Management Systems Transition",
    "ISO 14001:2015 Environmental Management Systems Lead Implementer",
    "ISO 45001:2018 Occupational Health and Safety Management Systems Awareness",
    "ISO 45001:2018 Occupational Health and Safety Management Systems Internal Auditor",
    "ISO 45001:2018 Occupational Health and Safety Management Systems Lead Auditor",
    "ISO 45001:2018 Occupational Health and Safety Management Systems Migration",
    "ISO 45001:2018 Occupational Health and Safety Management Systems Lead Implementer",
    "ISO 22000:2018 Food Safety Management Systems Awareness",
    "ISO 22000:2018 Food Safety Management Systems Internal Auditor",
    "ISO 22000:2018 Food Safety Management Systems Lead Auditor",
    "ISO 22000:2018 Food Safety Management Systems Transition",
    "ISO 22000:2018 Food Safety Management Systems Lead Implementer",
    "FSSC 22000 VER 6.0 Lead Auditor",
    "ISO 27001:2022 Information Security Management Systems Awareness",
    "ISO 27001:2022 Information Security Management Systems Internal Auditor",
    "ISO 27001:2022 Information Security Management Systems Lead Auditor",
    "ISO 27001:2022 Information Security Management Systems Transition",
    "ISO 27001:2022 Information Security Management Systems Lead Implementer",
    "ISO 50001:2018 Energy Management Systems Awareness",
    "ISO 50001:2018 Energy Management Systems Internal Auditor",
    "ISO 50001:2018 Energy Management Systems Lead Auditor",
    "ISO 50001:2018 Energy Management Systems Transition",
    "ISO 50001:2018 Energy Management Systems Lead Implementer",
  ],
};

const DelegateForm = () => {  
  const [delegateData, setDelegateData] = useState({  
    delegateName: "",  
    certificateNo: "",  
    nameOfTheCourse: "",  
    issueDate: null,  
    expiryDate: null,  
    status: "",  
  });  

  const [certNoError, setCertNoError] = useState("");

  const [rows, setRows] = useState([]);  
  const [error, setError] = useState("");  
  const [selectedRows, setSelectedRows] = useState([]);  
  const [selectedFilters, setSelectedFilters] = useState([]); // State for selected filters
  const [filteredOptions, setFilteredOptions] = useState([]); // State for filtered options
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert({ open: false, message: "", severity: "success" }), 3000); // Auto-close after 3 seconds
  };

  useEffect(() => {  
    const fetchDelegateData = async () => {  
      try {  
        const response = await axios.get(  
          `${URL}/data/certificationInfo/delegatesInfo`  
        );  
        const dataWithIds = response.data.map((item) => ({  
          ...item,  
          id: item._id || Date.now(),  
        }));  
        setRows(dataWithIds);  
      } catch (error) {  
        console.error("Error fetching delegate data", error);  
        alert("Error fetching data");  
      }  
    };  

    fetchDelegateData();  
  }, []);  

  // Handle radio changes
  const handleFilterChange = (filter) => {
    setSelectedFilters([filter]); // Only one filter can be selected at a time
  
    // Update filtered options based on the selected filter
    const options = certificateOptions[filter] || [];
    setFilteredOptions(options);
  };

  const handleDelegateInputChange = (e) => {  
    const { name, value } = e.target;  
    setDelegateData({ ...delegateData, [name]: value });  
  };  

  const handleDateChange = (name, newValue) => {  
    setDelegateData({  
      ...delegateData,  
      [name]: newValue ? dayjs(newValue).format("DD-MM-YYYY") : null,  
    });  
  };  

  const validateCertNo = (value) => {
    const exists = rows.some(row => row.certificateNo === value);
    if (exists) {
      setCertNoError("Certificate number already exists");
      return false;
    }
    setCertNoError("");
    return true;
  };

  const isFormValid = () => {  
    return (  
      delegateData.delegateName &&  
      delegateData.certificateNo &&  
      !certNoError && 
      delegateData.nameOfTheCourse &&  
      delegateData.issueDate &&  
      delegateData.expiryDate &&  
      delegateData.status  
    );  
  };   

  const handleDelegateSubmit = async (e) => {  
    e.preventDefault();  
    setError("");  
  
    // Validate certificate number before submission
    if (!validateCertNo(delegateData.certificateNo)) {
      showAlert("Certificate number already exists", "error");
      return;
    }
  
    try {  
      const response = await axios.post(  
        `${URL}/data/certificationInfo/delegatesInfo`,  
        delegateData  
      );  
  
      const newRow = {  
        ...response.data,  
        id: response.data._id || Date.now(),  
      };  
  
      setRows((prevRows) => [...prevRows, newRow]);  
      showAlert("Data inserted into the database", "success");
  
      // Reset form
      setDelegateData({  
        delegateName: "",  
        certificateNo: "",  
        nameOfTheCourse: "",  
        issueDate: null,  
        expiryDate: null,  
        status: "",  
      });  
  
      // Clear any certificate number error
      setCertNoError("");
  
    } catch (error) {  
      console.error("Error inserting data", error);  
      let errorMessage = "Failed to insert data";
      
      // More specific error messages if available
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 409) {
          errorMessage = "Certificate number already exists in database";
        }
      }
      
      showAlert(errorMessage, "error");  
    }  
  };  

  const handleDelete = async () => {  
    try {  
      await axios.delete(`${URL}/data/certificationInfo/delegatesInfo`, {  
        data: { ids: selectedRows },  
      });  
      setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));  
      showAlert("Selected data deleted successfully", "success"); // Success alert
      setSelectedRows([]);  
    } catch (error) {  
      console.error("Error deleting delegate data", error);  
      showAlert("Failed to delete data. Please try again later.", "error"); // Error alert
    }  
  };  

  const handleDownload = () => {
    const processedRows = rows.map(({ _id, ...rest }) => ({
      id: rest.id || Date.now(), // Ensure 'id' is included if it's missing
      ...rest,                  // Include all other fields except `_id`
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(processedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Delegates Data");
    XLSX.writeFile(workbook, "delegates_data.xlsx");
  };

  return (  
    <div className=" relative bg-white pb-10">  

    {alert.open && (
    <div className={`w-full ${alert.message === "Selected data deleted successfully" || alert.message === "Failed to delete data. Please try again later."?"bottom-0":"" }  absolute`} >
  <Alert  variant="filled" severity={alert.severity} sx={{ mb: 2 }}>
    {alert.message}
  </Alert>
    </div>
)}
      <DelegateFormNav />  
      <div className="relative mx-100 max-lg:mx-20 max-[850px]:mx-14 max-sm:mx-6">  
        <div className="z-30 text-darkblue text-3xl w-full text-center underline-offset-1 font-semibold">  
          Update Delegates Details  
        </div>  
        <div className="w-full border my-5" />  
        <div className="text-lg font-semibold text-ldarkblue">  
          Add Data of Delegates  
        </div>  
        <div className="flex justify-center items-center content-center">  
          <Box  
            component="form"  
            onSubmit={handleDelegateSubmit}  
            noValidate  
            autoComplete="off"  
            sx={{ flexGrow: 1, px: { xs: 2, sm: 4 } }}  
          >  
           <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Delegate Name"
              variant="outlined"
              name="delegateName"
              fullWidth
              size="medium"
              value={delegateData.delegateName}
              onChange={handleDelegateInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Certificate No."
    variant="outlined"
    name="certificateNo"
    fullWidth
    size="medium"
    value={delegateData.certificateNo}
    onChange={(e) => {
      handleDelegateInputChange(e);
      validateCertNo(e.target.value);
    }}
    error={!!certNoError}
    helperText={certNoError}
  />
</Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Name of the Course"
              variant="outlined"
              name="nameOfTheCourse"
              fullWidth
              size="medium"
              value={delegateData.nameOfTheCourse}
              onChange={handleDelegateInputChange}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Issue Date"
                value={delegateData.issueDate ? dayjs(delegateData.issueDate, "DD-MM-YYYY") : null}
                onChange={(newValue) => handleDateChange("issueDate", newValue)}
                format="DD-MM-YYYY"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiry Date"
                value={delegateData.expiryDate ? dayjs(delegateData.expiryDate, "DD-MM-YYYY") : null}
                onChange={(newValue) => handleDateChange("expiryDate", newValue)}
                format="DD-MM-YYYY"
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={delegateData.status}
                onChange={handleDelegateInputChange}
              >
                <MenuItem value="ATTENDED">ATTENDED</MenuItem>
                <MenuItem value="SATISFACTORY COMPLETED">SATISFACTORY COMPLETED</MenuItem>
                <MenuItem value="PARTICIPATED">PARTICIPATED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Checkboxes for filtering */}
          <Grid item xs={12}>
  <FormControl component="fieldset">
    <RadioGroup
      row
      value={selectedFilters[0] || ""} // Only one filter can be selected
      onChange={(e) => handleFilterChange(e.target.value)} // Handle radio button change
    >
      <FormControlLabel
        value="CQI IRCA"
        control={<Radio />}
        label="CQI IRCA"
      />
      <FormControlLabel
        value="EG"
        control={<Radio />}
        label="EG"
      />
      <FormControlLabel
        value="EOSH UK"
        control={<Radio />}
        label="EOSH UK"
      />
      <FormControlLabel
        value="UNACCREDITED COURSES - ISO STANDARDS COURSES"
        control={<Radio />}
        label="UNACCREDITED COURSES - ISO STANDARDS COURSES"
      />
    </RadioGroup>
  </FormControl>
</Grid>
          {/* Dropdown for filtered options */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Name of the Course</InputLabel>
              <Select
                label="Name of the Course"
                name="nameOfTheCourse"
                value={delegateData.nameOfTheCourse}
                onChange={handleDelegateInputChange}
              >
                {filteredOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={!isFormValid()}
              color="success"
              fullWidth
            >
              {!isFormValid() ? "Enter all data" : "Add data"}
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <div style={{ color: "red", textAlign: "center" }}>{error}</div>
            </Grid>
          )}
        </Grid> 
          </Box>  
        </div>  
        <Paper sx={{ height: 400, width: "100%", mt: 4, position: "relative" }}>  
          <Button  
            variant="contained"  
            color="primary"  
            onClick={handleDownload}  
            sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}  
          >  
            Download  
          </Button>  
          <DataGrid  
            rows={rows}  
            columns={columns.map((col) => ({  
              ...col,  
              headerClassName: "header-bold",  
            }))}  
            pageSizeOptions={[5, 10]}  
            checkboxSelection  
            onRowSelectionModelChange={(newSelection) => {  
              setSelectedRows(newSelection);  
            }}  
            sx={{  
              "& .header-bold": { fontWeight: "bold" },  
            }}  
          />  
        </Paper>  
        <Button  
          variant="contained"  
          color="error"  
          onClick={handleDelete}  
          disabled={selectedRows.length === 0}  
          sx={{ mt: 2 }}  
        >  
          Delete Selected  
        </Button>  
      </div>  
    </div>  
  );  
};  

export default DelegateForm;  