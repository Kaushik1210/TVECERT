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


const CertList2 = () => {
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
      <div className=" mt-4  ">
            
        <div class="relative ">
                 <img src={image.c2} alt="Example" className="w-full shadow-xl  rounded-xl h-full object-cover" />
                 <div class="absolute inset-0 p-2 gap-2 flex flex-col rounded-xl items-start justify-end bg-black bg-opacity-50">
                   <p class="text-white capitalize text-2xl font-bold">Appeals</p>
                   <button className=" "
                       onClick={handleClickOpen}>
                   <span className="text-white flex items-center gap-3 "> <p className=" text-xs">View Process</p><FaRegArrowAltCircleRight /></span>
                   
                 </button>
                   
                 </div>
               </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            <p className="font-bold text-darkblue">Appeals Process</p>
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
            <div
              className="m-5  overflow-scroll border border-gray-300
      rounded-r-md [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              <img
                src={image.appeals}
                alt="Scrollable"
                className=" object-contain"
                style={{ minWidth: "1000px", minHeight: "842px" }}
              />
            </div>
          </div>

          {/* Dialog Actions with Apply Button */}
          <div className="  p-5 border-t">
              <a
          className="bg-blue-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-600"
          href=""
        >
          Apply
        </a>
              </div>
        </Dialog>
        {/* <div className="flex-1 flex items-center max-md:hidden">
          <img className=" rounded-xl shadow-xl " src={image.c2} alt="" />
        </div> */}
      </div>
    </>
  );
};

export default CertList2;
