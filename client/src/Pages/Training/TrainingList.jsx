import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button2 from "../../Components/Button2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { cqiircaTrainingData, examplarGlobalTrainingData ,pecbData,healthSafetyData,fireData,environmentData,environmentSustainabilityData,liftingRiggingData,scaffolfingData,firstAidData} from "./trainingData";

import Result from "./Result";

const TrainingList = () => {
  const [cqiircaSelection, setCqiircaSelection] = useState("");
  const [exemplarSelection, setExemplarSelection] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handlers for CQI & IRCA Training
  const handleCqiircaChange = (event) => {
    setCqiircaSelection(event.target.value);
  };

  const handleCqiircaSubmit = () => {
    const result = cqiircaTrainingData.find(
      (training) => training.selection === cqiircaSelection
    );
    setSelectedResult(result);
    setPopupOpen(true);
  };

  // Handlers for Exemplar Global Training
  const handleExemplarChange = (event) => {
    setExemplarSelection(event.target.value);
  };

  const handleExemplarSubmit = () => {
    const result = examplarGlobalTrainingData.find(
      (training) => training.selection === exemplarSelection
    );
    setSelectedResult(result);
    setPopupOpen(true);
  };

  return (
    <div className="mx-28 max-md:mx-5">
      <div className="flex justify-center">
        <p className="text-center text-24">
          Some opportunities <br />
          for you to explore
        </p>
      </div>
      <div className="flex flex-col">
        
      <div className="flex max-[1100px]:flex-col">
        {/* Exemplar Global Training Section */}
        <div className="flex-1 flex flex-col m-4 p-4 gap-4 shadow-lg rounded-2xl hover:shadow-xl hover:border-none duration-300">
          <p className="font-bold">Exemplar Global Training</p>
          <FormControl sx={{ m: 0, minWidth: 300 }}>
            <InputLabel htmlFor="exemplar-select">Training in</InputLabel>
            <Select
              id="exemplar-select"
              value={exemplarSelection}
              onChange={handleExemplarChange}
              label="Training in"
              renderValue={(value) => value || "Training In"}
              MenuProps={{
                PaperProps: {
                  className: `
                    h-full overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300
                  `,
                },
              }}
            >
              <MenuItem disabled>
                <strong>Quality</strong>
              </MenuItem>
              <MenuItem value="QM/ISO 9001:2015 Lead Auditor">
                QM/ISO 9001:2015 Lead Auditor
              </MenuItem>
              <MenuItem value="QM/ISO 9001:2015 Internal Auditor">
                QM/ISO 9001:2015 Internal Auditor
              </MenuItem>
              <MenuItem value="QM/ISO 9001:2015 Transition Training">
                QM/ISO 9001:2015 Transition Training
              </MenuItem>
              <MenuItem disabled>
                <strong>Environmental</strong>
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Lead Auditor">
                ISO 14001:2015 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Internal Auditor">
                ISO 14001:2015 Internal Auditor
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Auditor Transition">
                ISO 14001:2015 Auditor Transition
              </MenuItem>
              
              <MenuItem disabled>
                <strong>Occupational Health and Safety</strong>
              </MenuItem>
              <MenuItem value="ISO 45001:2018 Lead Auditor">
                ISO 45001:2018 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 45001:2018 Internal Auditor">
                ISO 45001:2018 Internal Auditor
              </MenuItem>
              <MenuItem value="ISO 45001:2018 Auditor Migration">
                ISO 45001:2018 Auditor Migration
              </MenuItem>
              <MenuItem disabled>
                <strong>Information Security</strong>
              </MenuItem>
              <MenuItem value="ISO 27001:2022 Lead Auditor">
                ISO 27001:2022 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 27001:2022 Internal Auditor">
                ISO 27001:2022 Internal Auditor
              </MenuItem>
              <MenuItem disabled>
                <strong>Food Safety</strong>
              </MenuItem>
              <MenuItem value="ISO 22000:2005 Lead Auditor">
                ISO 22000:2005 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 22000:2005 Internal Auditor">
                ISO 22000:2005 Internal Auditor
              </MenuItem>
              <MenuItem value="ISO 22000:2018 Auditor Transition">
                ISO 22000:2018 Auditor Transition
              </MenuItem>
            </Select>
          </FormControl>
          <div onClick={handleExemplarSubmit}>
            <Button2 text="View details" />
          </div>
        </div>

        {/* CQI & IRCA Training Section */}
        <div className="flex-1 flex flex-col m-4 p-4 gap-4 shadow-lg rounded-2xl hover:shadow-xl hover:border-none duration-300">
          <p className="font-bold">CQI & IRCA Training</p>
          <FormControl sx={{ m: 0, minWidth: 300 }}>
            <InputLabel htmlFor="cqiirca-select">Training in</InputLabel>
            <Select
              id="cqiirca-select"
              value={cqiircaSelection}
              onChange={handleCqiircaChange}
              label="Training in"
              renderValue={(value) => value || "Training In"}
              MenuProps={{
                PaperProps: {
                  className: `
                    h-full overflow-y-auto
                    [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300
                  `,
                },
              }}
            >
              <MenuItem disabled>
                <strong>Quality</strong>
              </MenuItem>
              <MenuItem value="QM/ISO 9001:2015 Lead Auditor">
                QM/ISO 9001:2015 Lead Auditor
              </MenuItem>
              <MenuItem value="QM/ISO 9001:2015 Internal Auditor">
                QM/ISO 9001:2015 Internal Auditor
              </MenuItem>
              <MenuItem value="QM/ISO 9001:2015 Transition Training">
                QM/ISO 9001:2015 Transition Training
              </MenuItem>
              <MenuItem disabled>
                <strong>Environmental</strong>
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Lead Auditor">
                ISO 14001:2015 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Internal Auditor">
                ISO 14001:2015 Internal Auditor
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Auditor Transition">
                ISO 14001:2015 Auditor Transition
              </MenuItem>
              <MenuItem value="ISO 14001:2015 Auditor Conversion">
                ISO 14001:2015 Auditor Conversion
              </MenuItem>
              <MenuItem disabled>
                <strong>Occupational Health and Safety</strong>
              </MenuItem>
              <MenuItem value="ISO 45001:2018 Lead Auditor">
                ISO 45001:2018 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 45001:2018 Internal Auditor">
                ISO 45001:2018 Internal Auditor
              </MenuItem>
              <MenuItem value="ISO 45001:2018 Auditor Migration">
                ISO 45001:2018 Auditor Migration
              </MenuItem>
              <MenuItem disabled>
                <strong>Information Security</strong>
              </MenuItem>
              <MenuItem value="ISO 27001:2022 Lead Auditor">
                ISO 27001:2022 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 27001:2022 Internal Auditor">
                ISO 27001:2022 Internal Auditor
              </MenuItem>
              <MenuItem disabled>
                <strong>Food Safety</strong>
              </MenuItem>
              <MenuItem value="ISO 22000:2005 Lead Auditor">
                ISO 22000:2005 Lead Auditor
              </MenuItem>
              <MenuItem value="ISO 22000:2005 Internal Auditor">
                ISO 22000:2005 Internal Auditor
              </MenuItem>
              <MenuItem value="ISO 22000:2018 Auditor Transition">
                ISO 22000:2018 Auditor Transition
              </MenuItem>
            </Select>
          </FormControl>
          <div onClick={handleCqiircaSubmit}>
            <Button2 text="View details" />
          </div>
        </div>
      </div>
        <div className="flex w- full justify-center">
       
          <div className=" flex flex-col w-[600px] m-4 p-4 gap-4 shadow-lg rounded-2xl hover:shadow-xl hover:border-none duration-300">
      <p className="font-bold text-lg">EOSH Courses</p>
      <button
            className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full"
            onClick={handleOpen}
          >
            <span className="text-white m-10">View Trainings</span>
          </button>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <div className="flex justify-between items-center p-2">
          <DialogTitle>EOSH Courses</DialogTitle>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="  h-full  overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300">
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
            <p className="text-center font-bold text-ldarkblue">HEALTH & SAFETY</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {healthSafetyData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
            <p className="text-center font-bold text-ldarkblue">FIRE SAFETY</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {fireData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {fireData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
          <p className="text-center font-bold text-ldarkblue">ENVIRONMENT</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {environmentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
          <p className="text-center font-bold text-ldarkblue">ENVIRONMENT SUSTAINABILITY</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {environmentSustainabilityData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
          <p className="text-center font-bold text-ldarkblue">LIFTING & RIGGING</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {liftingRiggingData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
          <p className="text-center font-bold text-ldarkblue">SCAFFOLDING</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {scaffolfingData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-auto mx-4" style={{ maxHeight: "100%" }}>
          <p className="text-center font-bold text-ldarkblue">FIRST AID</p>
            <table className="min-w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left font-bold">Sl. No.</th>
                  <th className="border p-2 text-left font-bold">Name of the Courses</th>
                  <th className="border p-2 text-left font-bold">Duration (days)</th>
                </tr>
              </thead>
              <tbody>
                {firstAidData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>

        {/* Dialog Actions */}
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("Apply button clicked!");
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>

        </div>

      </div>


      {/* Result Modal */}
      <Result
        result={selectedResult}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
};

export default TrainingList;
