import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import CertFormNavBar from "./CertFormNavBar";
import Footer from "../../../../CommonComponents/Footer";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";

const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      let color;
      switch (params.value) {
        case "VALID":
          color = "green";
          break;
        case "EXPIRED":
          color = "lightblue";
          break;
        case "WITHDRAWN":
          color = "yellow";
          break;
        case "SUSPENDED":
          color = "red";
          break;
        default:
          color = "black";
      }
      return <span style={{ color }}>{params.value}</span>;
    },
  },
  {
    field: "availability",
    headerName: "Availability",
    width: 150,
    editable: true,
    type: "singleSelect",
    valueOptions: ["SUSPENDED", "WITHDRAWN"],
  },
  { field: "certNo", headerName: "Certificate No.", width: 150 },
  { field: "companyName", headerName: "Organization Name", width: 200 },
  { field: "district", headerName: "District", width: 150 },
  { field: "state", headerName: "State", width: 150 },
  { field: "country", headerName: "Country", width: 150 },
  { field: "certType", headerName: "Certificate Type", width: 200 },
  {
    field: "scopeOfCertification",
    headerName: "Scope Of Certification",
    width: 200,
  },
  { field: "expiryDate", headerName: "Expiry Date", width: 130 },
];

const CertForm = () => {
  const [certificateInfoData, setCertificateInfoData] = useState({
    certNo: "",
    companyName: "",
    district: "",
    state: "",
    country: "",
    certType: "",
    scopeOfCertification: "",
    expiryDate: null,
    status: "",
    availability: "",
  });

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificationData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/data/certificationInfo/certificateInfo"
        );
        const dataWithIds = response.data.map((item) => ({
          ...item,
          id: item._id || uuidv4(), // Assign a unique id if _id is missing
          status: getStatus(item.expiryDate, item.availability),
        }));
        setRows(dataWithIds);
      } catch (error) {
        console.error("Error fetching certification data", error);
        alert("Error fetching data");
      }
    };

    fetchCertificationData();
  }, []);

  const getStatus = (expiryDate, availability) => {
    if (availability === "SUSPENDED") return "SUSPENDED";
    if (availability === "WITHDRAWN") return "WITHDRAWN";

    const now = dayjs();
    const expiry = dayjs(expiryDate);
    return now.isBefore(expiry) || now.isSame(expiry) ? "VALID" : "EXPIRED";
  };

  const handleCerticateInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateInfoData({ ...certificateInfoData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setCertificateInfoData({
      ...certificateInfoData,
      expiryDate: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
    });
  };

  const isFormValid = () => {
    return (
      certificateInfoData.certNo &&
      certificateInfoData.companyName &&
      certificateInfoData.district &&
      certificateInfoData.state &&
      certificateInfoData.country &&
      certificateInfoData.certType &&
      certificateInfoData.scopeOfCertification &&
      certificateInfoData.expiryDate
    );
  };

  const handleCertificationSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/data/certificationInfo/certificateInfo",
        certificateInfoData
      );

      const newRow = {
        ...response.data,
        id: response.data._id || uuidv4(), // Assign a unique id if _id is missing
        status: getStatus(response.data.expiryDate, response.data.availability),
      };

      setRows((prevRows) => [...prevRows, newRow]);
      alert("Data inserted into the database and Refresh the page to see the changes");
      

      setCertificateInfoData({
        certNo: "",
        companyName: "",
        district: "",
        state: "",
        country: "",
        certType: "",
        scopeOfCertification: "",
        expiryDate: null,
        availability: "",
      });
    } catch (error) {
      console.error("Error inserting data", error);
      setError(
        "Failed to insert data: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleDownload = () => {
    const sanitizedRows = rows.map(({ _id, id, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(sanitizedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");
    XLSX.writeFile(workbook, "certificates.xlsx");
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("No rows selected for deletion");
      return;
    }

    try {
      const idsToDelete = selectedRows.map((rowId) => {
        const row = rows.find((row) => row.id === rowId);
        return row?._id; // Ensure _id is used, not id
      }).filter(Boolean);

      if (idsToDelete.length === 0) {
        alert("No valid IDs found for deletion");
        return;
      }

      const response = await axios.delete(
        "http://localhost:5000/data/certificationInfo/certificateInfo",
        {
          data: { ids: idsToDelete },
        }
      );

      if (response.status === 200) {
        setRows((prevRows) =>
          prevRows.filter((row) => !idsToDelete.includes(row._id))
        );
        setSelectedRows([]);
        alert(response.data.message);
      } else {
        alert(`Failed to delete rows: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deleting rows:", error);
      alert("Failed to delete selected rows. Check console for details.");
    }
  };

  return (
    <div className="bg-white pb-10">
      <CertFormNavBar />
      <div className="relative mx-10 sm:mx-6">
        <div className="text-darkblue text-3xl w-full text-center font-semibold">
          Update Certificates
        </div>
        <div className="w-full border my-5" />
        <Box
          component="form"
          className="flex flex-wrap justify-center gap-4"
          onSubmit={handleCertificationSubmit}
          autoComplete="off"
        >
          <TextField
            label="Certificate No"
            name="certNo"
            value={certificateInfoData.certNo}
            onChange={handleCerticateInputChange}
          />
          <TextField
            label="Organization Name"
            name="companyName"
            value={certificateInfoData.companyName}
            onChange={handleCerticateInputChange}
          />
          <TextField
            label="District"
            name="district"
            value={certificateInfoData.district}
            onChange={handleCerticateInputChange}
          />
          <TextField
            label="State"
            name="state"
            value={certificateInfoData.state}
            onChange={handleCerticateInputChange}
          />
          <TextField
            label="Country"
            name="country"
            value={certificateInfoData.country}
            onChange={handleCerticateInputChange}
          />
          <TextField
            label="Certificate Type"
            name="certType"
            value={certificateInfoData.certType}
            onChange={handleCerticateInputChange}
          />
          <TextField
            label="Scope Of Certification"
            name="scopeOfCertification"
            value={certificateInfoData.scopeOfCertification}
            onChange={handleCerticateInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Expiry Date"
              value={dayjs(certificateInfoData.expiryDate)}
              onChange={handleDateChange}
              format="DD-MM-YYYY"
            />
          </LocalizationProvider>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid()}
            color="success"
          >
            Add Certificate
          </Button>
        </Box>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="w-full border my-5" />
        <div className="flex justify-between mb-4">
          <Button variant="contained" onClick={handleDownload} color="success">
            Download Data
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            color="error"
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
        </div>
        <Paper elevation={3}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            autoHeight
            pagination
            pageSize={10}
            getRowId={(row) => row.id}
            onRowSelectionModelChange={(ids) => {
              setSelectedRows(ids);
            }}
          />
        </Paper>
      </div>
      <Footer />
    </div>
  );
};

export default CertForm;
