import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import image from "../../../Assets/dummy";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


const CertList4 = () => {
  const [open, setOpen] = useState(false);

  // Handlers to open and close the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="mt-4  "> 
         <div class="relative ">
                        <img src={image.c4} alt="Example" className="w-full shadow-xl  rounded-xl h-full object-cover" />
                        <div class="absolute inset-0 p-2 gap-2 flex rounded-xl flex-col items-start justify-end bg-black bg-opacity-50">
                          <p class="text-white capitalize text-2xl font-bold">Granting, Maintaining and Suspension</p>
                          <button className=" "
                              onClick={handleClickOpen}>
                          <span className="text-white flex items-center gap-3 "> <p className=" text-xs">Read More</p><FaRegArrowAltCircleRight /></span>
                          
                        </button>
                          
                        </div>
                      </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            <p className="font-bold text-darkblue">
              Granting, Maintaining, Suspension
            </p>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Dialog Content */}

          <div
            className="  h-full  overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
          >
            <div className="m-10 flex flex-col gap-4">
              <div
                className="  custom-scrollbar"
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              >
                <img
                  src={image.gms1}
                  alt="Scrollable"
                  className=" object-contain m-4"
                  style={{ minWidth: "500px", minHeight: "100%" }}
                />
              </div>

              <div>
                <h5 className="font-bold text-ldarkblue">
                  Granting Certification
                </h5>
                <p className=" indent-6 font-semibold text-gray-700">
                  Granting certification means the state that the compliance to
                  the Certification requirements has been confirmed by the TVE
                  CERT as per its Certification Procedures. The certification is
                  granted and recorded in list of customers on the website after
                  the following conditions have been met by the
                  applicant organization.
                </p>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms2}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
              </div>
              <div>
                <h5 className="font-bold text-ldarkblue">
                  Maintaining Certification
                </h5>
                <p className=" indent-6 font-semibold text-gray-700">
                  Maintaining Certification means the state that demonstrate
                  that the client continues to satisfy the requirements of the
                  management system standard based on the positive
                  conclusion/recommendation by the audit team leader during
                  on-going surveillance.
                </p>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms3}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
                <p className=" indent-6 font-semibold text-gray-700">
                  The certification is maintained after the following conditions
                  have been met by the customer
                </p>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms4}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
                <p className=" indent-6 font-semibold text-gray-700">
                  Audit Manager monitors its surveillance activities, including
                  monitoring the reporting by its auditors, to confirm that the
                  certification activity is operating effectively.
                </p>
                <p className=" indent-6 font-semibold text-gray-700">
                  Special audits/ Short notice audits may be performed in
                  accordance with Certification System Procedures.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-ldarkblue">
                  Suspension of Certificate
                </h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms5}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
              </div>
              <div>
                <h5 className="font-bold text-ldarkblue">
                  Reduction of Scope of Certification
                </h5>
                <p className=" indent-6 font-semibold text-gray-700">
                  Reducing certification means the state that the customer
                  doesn't fulfill some of the certification requirements under
                  the scope of certification after granting.
                </p>
                <h5 className="font-bold text-ldarkblue">
                  Causes of Reduction of Scope of Certification
                </h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms6}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
              </div>

              <div>
                <h5 className="font-bold text-ldarkblue">
                  Withdrawal of Certification
                </h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms7}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
              </div>
              <div>
                <h5 className="font-bold text-ldarkblue">
                  Changes and Modification of Certification
                </h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms8}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
                <h5 className="indent-6 font-bold text-ldarkblue">
                  1 Issue of Changed Certificate
                </h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms9}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
                <p className=" indent-7 font-semibold text-gray-700">
                  The list of customers is revised accordingly. He/ she shall
                  report the changes to Accreditation body, if required.
                </p>
                <h5 className="indent-6 font-bold text-ldarkblue">
                  2 Assessments for Modification
                </h5>
                <p className=" indent-7 font-semibold text-gray-700">
                  If applicable, Audit Manager shall perform the assessment for
                  modification in accordance with Certification System Procedure
                </p>
                <h5 className="indent-6 font-bold text-ldarkblue">
                  3 Modifications of Certification Requirements
                </h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms10}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
                <p className=" indent-7 font-semibold text-gray-700">
                  In the event that MD decides for the extension of assessment
                  scope, TVE CERT will fulfill the requirements for extension
                  and apply to applicable accreditation body.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-ldarkblue">Expanding Scope</h5>
                <div
                  className="  custom-scrollbar"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                >
                  <img
                    src={image.gms11}
                    alt="Scrollable"
                    className=" object-contain m-4"
                    style={{ minWidth: "500px", minHeight: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dialog Actions with Apply Button */}
          {/* <div className="  p-5 border-t">
              <a
          className="bg-blue-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-600"
          href=""
        >
          Apply
        </a>
              </div> */}
        </Dialog>
        {/* <div className="flex-1 flex items-center max-md:hidden">
          <img className=" rounded-xl shadow-xl " src={image.c4} alt="" />
        </div> */}
      </div>
    </>
  );
};

export default CertList4;
