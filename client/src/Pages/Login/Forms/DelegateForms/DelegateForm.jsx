import React, { useState, useEffect } from "react";  
import { Box, Button, TextField, Grid, Paper } from "@mui/material";  
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";  
import { DateField } from "@mui/x-date-pickers/DateField";  
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";  
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

const DelegateForm = () => {  
  const [delegateData, setDelegateData] = useState({  
    delegateName: "",  
    certificateNo: "",  
    nameOfTheCourse: "",  
    issueDate: null,  
    expiryDate: null,  
  });  

  const [rows, setRows] = useState([]);  
  const [error, setError] = useState("");  
  const [selectedRows, setSelectedRows] = useState([]);  

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

  const isFormValid = () => {  
    return (  
      delegateData.delegateName &&  
      delegateData.certificateNo &&  
      delegateData.nameOfTheCourse &&  
      delegateData.issueDate &&  
      delegateData.expiryDate  
    );  
  };  

  const handleDelegateSubmit = async (e) => {  
    e.preventDefault();  
    setError("");  
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
      alert("Data inserted into the database");  

      setDelegateData({  
        delegateName: "",  
        certificateNo: "",  
        nameOfTheCourse: "",  
        issueDate: null,  
        expiryDate: null,  
      });  
    } catch (error) {  
      console.error("Error inserting data", error);  
      setError(  
        "Failed to insert data: " +  
          (error.response?.data?.message || "Unknown error")  
      );  
    }  
  };  

  const handleDelete = async () => {  
    try {  
      await axios.delete(`${URL}/data/certificationInfo/delegatesInfo`, {  
        data: { ids: selectedRows },  
      });  
      setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));  
      alert("Selected data deleted successfully");  
      setSelectedRows([]);  
    } catch (error) {  
      console.error("Error deleting delegate data", error);  
      setError("Failed to delete data. Please try again later.");  
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
    <div className=" bg-white pb-10">  
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
              onChange={handleDelegateInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Name of the Course"
              variant="outlined"
              name="nameOfTheCourse"
              fullWidth
              size="medium"
              value={delegateData.nameOfTheCourse}
              onChange={handleDelegateInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Issue Date"
                name="issueDate"
                value={dayjs(delegateData.issueDate)}
                onChange={(newValue) => handleDateChange("issueDate", newValue)}
                format="DD-MM-YYYY"
                fullWidth
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Expiry Date"
                name="expiryDate"
                value={dayjs(delegateData.expiryDate)}
                onChange={(newValue) =>
                  handleDateChange("expiryDate", newValue)
                }
                format="DD-MM-YYYY"
                fullWidth
              />
            </LocalizationProvider>
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
