import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Footer from "../../../../CommonComponents/Footer"; // Adjust the import path if needed
import NewsUpdateNav from "./NewsUpdateNav";
import { URL } from "../../../../constant";

const columns = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 400 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "expiryDate", headerName: "Expiry Date", width: 150 },
];

const NewsUpdate = () => {
  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
    date: "",
    expiryDate: "",
  });
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          `${URL}/data/certificationInfo/newsUpdate`
        );
        const dataWithIds = response.data.map((item) => ({
          ...item,
          id: item._id, // Use _id from MongoDB
        }));
        setRows(dataWithIds);
      } catch (error) {
        console.error("Error fetching news data", error);
        setError("Error fetching data from the server.");
      }
    };

    fetchNewsData();
  }, []);

  const handleNewsInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const isFormValid = () => {
    return newsData.title && newsData.description && newsData.date && newsData.expiryDate;
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${URL}/data/certificationInfo/newsUpdate`,
        newsData
      );

      const newRow = {
        ...response.data.data,
        id: response.data.data.id, // Use returned ID
      };

      setRows((prevRows) => [...prevRows, newRow]);
      alert("News updated successfully");

      setNewsData({
        title: "",
        description: "",
        date: "",
        expiryDate: "",
      });
    } catch (error) {
      console.error("Error submitting news data", error);
      setError(
        "Failed to update news: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${URL}/data/certificationInfo/newsUpdate`,
        {
          data: { ids: selectedRows }, // Pass selected IDs
        }
      );
      if (response.status === 200) {
        setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
        alert("Selected news deleted successfully");
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Error deleting news data", error);
      setError("Failed to delete news. Please try again later.");
    }
  };

  return (
    <div className="bg-white">
      <NewsUpdateNav />
      <div className="relative mx-100 max-lg:mx-20 max-[850px]:mx-14 max-sm:mx-6">
        <div className="text-darkblue text-3xl w-full text-center underline-offset-1 font-semibold">
          News Update
        </div>
        <div className="w-full border my-5" />
        <div className="text-lg font-semibold text-ldarkblue">Update News</div>
          <div className=" my-5">

        <Box
          onSubmit={handleNewsSubmit}
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            
            gap: 2,
            justifyContent: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={newsData.title}
            onChange={handleNewsInputChange}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={newsData.description}
            onChange={handleNewsInputChange}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Date"
            variant="outlined"
            type="date"
            name="date"
            value={newsData.date}
            onChange={handleNewsInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Expiry Date"
            variant="outlined"
            type="date"
            name="expiryDate"
            value={newsData.expiryDate}
            onChange={handleNewsInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid()}
            color="success"
          >
            {!isFormValid() ? "Enter all required data" : "Add News"}
           
          </Button>
        </Box>
          </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className="w-full border my-5" />

        <div className="m-4">
          <Paper sx={{ height: 400, width: "100%" }}>
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
                border: 0,
                "& .header-bold": {
                  fontWeight: "bold",
                },
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

        <div className="w-full border my-5" />
      </div>
      <Footer />
    </div>
  );
};

export default NewsUpdate;
