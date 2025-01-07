import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import io from "socket.io-client";
import CareerDNavBar from "./CareerDNavBar";
import Footer from "../../../../CommonComponents/Footer";
import { URL } from "../../../../constant";

const columns = [
  { field: 'jobTitle', headerName: 'Job Title', width: 200 },
  { field: 'qualification', headerName: 'Qualification', width: 200 },
  { field: 'skill1', headerName: 'Skill 1', width: 150 },
  { field: 'skill2', headerName: 'Skill 2', width: 150 },
  { field: 'skill3', headerName: 'Skill 3', width: 150 },
  { field: 'skill4', headerName: 'Skill 4', width: 150 },
  { field: 'skill5', headerName: 'Skill 5', width: 150 },
  { field: 'skill6', headerName: 'Skill 6', width: 150 },
  { field: 'noOfOpenings', headerName: 'No of Openings', width: 130 },
  { field: 'yearsOfExperienceNeeded', headerName: 'Years of Experience Needed', width: 200 },
  { field: 'district', headerName: 'District', width: 150 },
  { field: 'state', headerName: 'State', width: 150 },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'linkToApply', headerName: 'Link to Apply', width: 200 },
];

const CareerDetails = () => {
  const [careerData, setCareerData] = useState({
    jobTitle: "",
    qualification: "",
    skill1: "",
    skill2: "",
    skill3: "",
    skill4: "",
    skill5: "",
    skill6: "",
    noOfOpenings: "",
    yearsOfExperienceNeeded: "",
    district: "",
    state: "",
    country: "",
    linkToApply: "",
  });

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [error, setError] = useState("");

  // Socket.IO client connection
  useEffect(() => {
    const socket = io(`${URL}`);

    socket.on("newData", (newData) => {
      setRows((prevRows) => [...prevRows, newData]);
    });

    const fetchCareerData = async () => {
      try {
        const response = await axios.get(`${URL}/data/certificationInfo/careerInfo`);
        const dataWithIds = response.data.map((item) => ({
          ...item,
          id: item._id || Date.now(),
        }));
        setRows(dataWithIds);
      } catch (error) {
        console.error("Error fetching career data", error);
        alert("Error fetching data");
      }
    };

    fetchCareerData();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCareerInputChange = (e) => {
    const { name, value } = e.target;
    setCareerData({ ...careerData, [name]: value });
  };

  const isFormValid = () => {
    const filledSkills = [careerData.skill1, careerData.skill2, careerData.skill3, careerData.skill4, careerData.skill5, careerData.skill6].filter(skill => skill);
    return (
      careerData.jobTitle &&
      careerData.qualification &&
      filledSkills.length >= 2 &&
      careerData.noOfOpenings &&
      careerData.yearsOfExperienceNeeded &&
      careerData.district &&
      careerData.state &&
      careerData.country
    );
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${URL}/data/certificationInfo/careerInfo`, {
        ...careerData,
      });

      const newRow = {
        ...response.data,
        id: response.data._id || Date.now(),
      };

      setRows((prevRows) => [...prevRows, newRow]);
      alert("Data inserted into the database");
      window.location.reload();

      setCareerData({
        jobTitle: "",
        qualification: "",
        skill1: "",
        skill2: "",
        skill3: "",
        skill4: "",
        skill5: "",
        skill6: "",
        noOfOpenings: "",
        yearsOfExperienceNeeded: "",
        district: "",
        state: "",
        country: "",
        linkToApply: "",
      });
    } catch (error) {
      console.error("Error inserting data", error);
      setError("Failed to insert data: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        await axios.delete(`${URL}/data/certificationInfo/careerInfo`, {
          data: { ids: selectedRows }, 
        });
  
        setRows((prevRows) => prevRows.filter((row) => !selectedRows.includes(row.id)));
  
        alert("Selected data deleted successfully");
        setSelectedRows([]); 
      } else {
        alert("Please select data to delete");
      }
    } catch (error) {
      console.error("Error deleting career data", error);
      setError("Failed to delete data. Please try again later.");
    }
  };
  
  return (
    <div className=" bg-white">
      <CareerDNavBar />
      <div className=" relative mx-100 max-lg:mx-20 max-[850px]:mx-14 max-sm:mx-6">
        <div className=" text-darkblue text-3xl w-full text-center underline-offset-1 font-semibold">Career Details</div>
        <div className=" w-full border my-5 " />
        <div className=" text-lg font-semibold text-ldarkblue">Add data of Certificates</div>

        <Box
          onSubmit={handleCareerSubmit}
          component="form"
          sx={{ "& > :not(style)": { m: 2, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Job Title"
            variant="outlined"
            name="jobTitle"
            value={careerData.jobTitle}
            onChange={handleCareerInputChange}
          />
          <TextField
            label="Qualification"
            variant="outlined"
            name="qualification"
            value={careerData.qualification}
            onChange={handleCareerInputChange}
          />

          <div className=" flex" >
            <Box sx={{ "& > :not(style)": { mt: 1, width: "25ch" } }} component="form">
              <Typography variant="h6">Skills Needed</Typography>
              <Typography variant="body2" color="textSecondary">
                At least enter 2 skills
              </Typography>
              <TextField
                label="Skill 1"
                variant="outlined"
                name="skill1"
                value={careerData.skill1}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Skill 2"
                variant="outlined"
                name="skill2"
                value={careerData.skill2}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Skill 3"
                variant="outlined"
                name="skill3"
                value={careerData.skill3}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Skill 4"
                variant="outlined"
                name="skill4"
                value={careerData.skill4}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Skill 5"
                variant="outlined"
                name="skill5"
                value={careerData.skill5}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Skill 6"
                variant="outlined"
                name="skill6"
                value={careerData.skill6}
                onChange={handleCareerInputChange}
              />
            </Box>

            <div className=" w-full border" />

            <Box component="form" sx={{ "& > :not(style)": { m: 2, width: "25ch" } }} noValidate autoComplete="off">
              <TextField
                label="No of Openings"
                variant="outlined"
                name="noOfOpenings"
                value={careerData.noOfOpenings}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Years of Experience Needed"
                variant="outlined"
                name="yearsOfExperienceNeeded"
                value={careerData.yearsOfExperienceNeeded}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="District"
                variant="outlined"
                name="district"
                value={careerData.district}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="State"
                variant="outlined"
                name="state"
                value={careerData.state}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Country"
                variant="outlined"
                name="country"
                value={careerData.country}
                onChange={handleCareerInputChange}
              />
              <TextField
                label="Link to Apply"
                variant="outlined"
                name="linkToApply"
                value={careerData.linkToApply}
                onChange={handleCareerInputChange}
              />
            </Box>

          </div>

          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid()}
            color="success"
          >
            {!isFormValid() ? "Enter all required data" : "Add data"}
          </Button>
        </Box>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <div className=" w-full border" />

        <div className="m-4">
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
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
        </div>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={selectedRows.length === 0}
          sx={{ mt: 2 }}
        >
          Delete Selected
        </Button>

        <div className=" w-full border my-5 " />
        <div className="h-[800px] -z-10 w-[550px] absolute bg-bbgufill top-0 -left-[100px] bg-no-repeat max-sm:w-[350px] max-[360px]:w-[250px]" />
      </div>
      <Footer />
    </div>
  );
};

export default CareerDetails;
