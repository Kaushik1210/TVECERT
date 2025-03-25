import React, { useState } from "react";
import { Helmet } from "react-helmet";
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
import {
  cqiircaTrainingData,
  examplarGlobalTrainingData,
  eoshPdf,
  healthSafetyData,
  fireData,
  environmentData,
  environmentSustainabilityData,
  liftingRiggingData,
  scaffolfingData,
  firstAidData,
} from "./trainingData";
import Result from "./Result";

const TrainingList = () => {
  const [cqiircaSelection, setCqiircaSelection] = useState("");
  const [exemplarSelection, setExemplarSelection] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // Meta keywords including ISO numbers and training names
  const metaKeywords = [
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ISO 27001",
    "ISO 22000",
    "ISO 50001",
    "Lead Auditor Training",
    "Internal Auditor Training",
    "Transition Training",
    "CQI IRCA Training",
    "Exemplar Global Training",
    "EOSH Courses",
    "Health and Safety Training",
    "Fire Safety Training",
    "Environment Training",
    "Lifting and Rigging Training",
    "Scaffolding Training",
    "First Aid Training",
  ].join(", ");

  return (
    <>
      {/* React Helmet for SEO Meta Tags */}
      <Helmet>
        <title>Accredited Training Courses - Explore ISO Standards</title>
        <meta
          name="description"
          content="Explore accredited training courses in Quality, Environmental, Occupational Health and Safety, Information Security, Food Safety, and Energy Management. Join us to enhance your skills with globally recognized ISO standards."
        />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href="https://www.yourwebsite.com/training" />
      </Helmet>

      <section className="mx-28 mt-7 max-md:mx-5">
        <header className="flex justify-center">
          <h1 className="text-center text-24">
            Explore our <br />
            Accredited Courses
          </h1>
        </header>
        <div className="flex flex-col">
          <div className="flex max-[1100px]:flex-col">
            {/* CQI & IRCA Training Section */}
            <article className="flex-1 flex flex-col m-4 p-4 gap-4 shadow-lg rounded-2xl hover:shadow-xl hover:border-none duration-300">
              <h2 className="font-bold">CQI & IRCA Training</h2>
              <FormControl sx={{ m: 0, minWidth: 200 }}>
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
                  <MenuItem value="QMS - ISO 9001:2015 Lead Auditor">
                    QMS - ISO 9001:2015 <br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="QMS - ISO 9001:2015 Internal Auditor">
                    QMS - ISO 9001:2015<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="QMS - ISO 9001:2015 Transition Training">
                    QMS - ISO 9001:2015<br className="min-[450px]:hidden" /> Transition Training
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Environmental</strong>
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Lead Auditor">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Internal Auditor">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Auditor Transition">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /> Auditor Transition
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Auditor Conversion">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /> Auditor Conversion
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Occupational Health<br className="min-[400px]:hidden" /> and Safety</strong>
                  </MenuItem>
                  <MenuItem value="OHSMS - ISO 45001:2018 Lead Auditor">
                    OHSMS - ISO 45001:2018<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="OHSMS - ISO 45001:2018 Internal Auditor">
                    OHSMS - ISO 45001:2018<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="OHSMS - ISO 45001:2018 Auditor Migration">
                    OHSMS - ISO 45001:2018<br className="min-[450px]:hidden" /> Auditor Migration
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Information Security</strong>
                  </MenuItem>
                  <MenuItem value="ISMS - ISO 27001:2022 Lead Auditor">
                    ISMS - ISO 27001:2022<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="ISMS - ISO 27001:2022 Internal Auditor">
                    ISMS - ISO 27001:2022<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Food Safety</strong>
                  </MenuItem>
                  <MenuItem value="FSMS - ISO 22000:2018 Lead Auditor">
                    FSMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="FSMS - ISO 22000:2018 Internal Auditor">
                    FSMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="FSMS - ISO 22000:2018 Auditor Transition">
                    FSMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Auditor Transition
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Food Safety <br className="min-[400px]:hidden" />System Certification</strong>
                  </MenuItem>
                  <MenuItem value="FSSC - 22000 Lead Auditor">
                  FSSC - 22000 Ver 6.0<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Energy </strong>
                  </MenuItem>
                  <MenuItem value="EnMS - ISO 22000:2018 Lead Auditor">
                    EnMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                </Select>
              </FormControl>
              <div onClick={handleCqiircaSubmit}>
                <Button2 text="View details" />
              </div>
            </article>

            {/* Exemplar Global Training Section */}
            <article className="flex-1 flex flex-col m-4 p-4 gap-4 shadow-lg rounded-2xl hover:shadow-xl hover:border-none duration-300">
              <h2 className="font-bold">Exemplar Global Training</h2>
              <FormControl sx={{ m: 0, minWidth: 200 }}>
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
                  <MenuItem value="QMS - ISO 9001:2015 Lead Auditor">
                    QMS - ISO 9001:2015<br className="min-[450px]:hidden" /><br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="QMS - ISO 9001:2015 Internal Auditor">
                    QMS - ISO 9001:2015<br className="min-[450px]:hidden" /><br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="QMS - ISO 9001:2015 Transition Training">
                    QMS - ISO 9001:2015<br className="min-[450px]:hidden" /><br className="min-[450px]:hidden" /> Transition Training
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Environmental</strong>
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Lead Auditor">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /><br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Internal Auditor">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /><br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="EMS - ISO 14001:2015 Auditor Transition">
                    EMS - ISO 14001:2015<br className="min-[450px]:hidden" /><br className="min-[450px]:hidden" /> Auditor Transition
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Occupational Health<br className="min-[400px]:hidden" /> and Safety</strong>
                  </MenuItem>
                  <MenuItem value="OHSMS - ISO 45001:2018 Lead Auditor">
                    OHSMS - ISO 45001:2018<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="OHSMS - ISO 45001:2018 Internal Auditor">
                    OHSMS - ISO 45001:2018<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="OHSMS - ISO 45001:2018 Auditor Transition">
                    OHSMS - ISO 45001:2018<br className="min-[450px]:hidden" /> Auditor Transition
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Information Security</strong>
                  </MenuItem>
                  <MenuItem value="ISMS - ISO 27001:2022 Lead Auditor">
                    ISMS - ISO 27001:2022<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="ISMS - ISO 27001:2022 Internal Auditor">
                    ISMS - ISO 27001:2022<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Food Safety</strong>
                  </MenuItem>
                  <MenuItem value="FSMS - ISO 22000:2018 Lead Auditor">
                    FSMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem value="FSMS - ISO 22000:2018 Internal Auditor">
                    FSMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Internal Auditor
                  </MenuItem>
                  <MenuItem value="FSMS - ISO 22000:2018 Auditor Transition">
                    FSMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Auditor Transition
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Food Safety <br className="min-[400px]:hidden" />System Certification</strong>
                  </MenuItem>
                  <MenuItem value="FSSC - ISO 22000 Lead Auditor">
                  FSSC - ISO 22000 Ver 6.0<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                  <MenuItem disabled>
                    <strong>Energy </strong>
                  </MenuItem>
                  <MenuItem value="EnMS - ISO 22000:2018 Lead Auditor">
                  EnMS - ISO 22000:2018<br className="min-[450px]:hidden" /> Lead Auditor
                  </MenuItem>
                </Select>
              </FormControl>
              <div onClick={handleExemplarSubmit}>
                <Button2 text="View details" />
              </div>
            </article>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex flex-col w-[600px] m-4 p-4 gap-4 shadow-lg rounded-2xl hover:shadow-xl hover:border-none duration-300">
              <h2 className="font-bold text-lg">EOSH Courses</h2>
              <button
                className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full"
                onClick={handleOpen}
                aria-label="View EOSH Trainings"
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

                <div
                  className="h-full overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
                >
                  <div
                    className="overflow-auto mx-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      HEALTH & SAFETY
                    </p>
                    <a
                      href={eoshPdf[0].healthSafety}
                      className="relative z-20 mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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

                  <div
                    className="overflow-auto mx-4 mt-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      FIRE SAFETY
                    </p>
                    <a
                      href={eoshPdf[0].fire}
                      className="mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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

                  <div
                    className="overflow-auto mx-4 mt-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      ENVIRONMENT
                    </p>
                    <a
                      href={eoshPdf[0].environment}
                      className="mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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

                  <div
                    className="overflow-auto mx-4 mt-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      ENVIRONMENT SUSTAINABILITY
                    </p>
                    <a
                      href={eoshPdf[0].environmentSustainability}
                      className="mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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
                  <div
                    className="overflow-auto mx-4 mt-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      LIFTING & RIGGING
                    </p>
                    <a
                      href={eoshPdf[0].liftingRigging}
                      className="mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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
                  <div
                    className="overflow-auto mx-4 mt-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      SCAFFOLDING
                    </p>
                    <a
                      href={eoshPdf[0].scaffolfing}
                      className="mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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
                  <div
                    className="overflow-auto mx-4 mt-4"
                    style={{ maxHeight: "100%" }}
                  >
                    <p className="text-center font-bold text-ldarkblue">
                      FIRST AID
                    </p>
                    <a
                      href={eoshPdf[0].firstAid}
                      className="mt-4 mb-3 bg-blue-700 px-4 py-2 rounded-r-full shadow-lg text-white font-semibold hover:bg-green-600"
                    >
                      Download PDF
                    </a>
                    <table className="min-w-full border-collapse border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2 text-left font-bold">
                            Sl. No.
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Name of the Courses
                          </th>
                          <th className="border p-2 text-left font-bold">
                            Duration (days)
                          </th>
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
                <div className="p-5 border-t">
                  <a
                    className="bg-blue-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-600"
                    href="https://forms.gle/A6YTaCtdhSrbvbtx6"
                  >
                    Apply
                  </a>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Result Modal */}
      <Result
        result={selectedResult}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </>
  );
};

export default TrainingList;