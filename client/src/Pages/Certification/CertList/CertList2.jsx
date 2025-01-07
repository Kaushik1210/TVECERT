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
      <div className="animate my-10 flex">
        <div className="flex-1 flex justify-center flex-col gap-3 p-10 py-5 max-md:p-0">
          <p className=" capitalize text-35 font-semibold text-ldarkblue ">
            Appeals
          </p>
          <img
            className=" rounded-xl hidden shadow-xl max-md:block"
            src={image.c2}
            alt=""
          />
          <p className=" text-justify flex flex-col gap-2 text-darkblue">
            We're building a culture at HubSpot where amazing people (like you)
            can do their best work. If you're ready to grow your career and help
            millions of organizations grow better, you've come to the right
            place.
          </p>
          <button
            className="bg-gradient-to-r from-buttonfrom to to-buttonto w-fit h-45 flex items-center rounded-full"
            onClick={handleClickOpen}
          >
            <span className="text-white m-10">View Process</span>
          </button>
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
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Apply button clicked")}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
        <div className="flex-1 flex items-center max-md:hidden">
          <img className=" rounded-xl shadow-xl " src={image.c2} alt="" />
        </div>
      </div>
    </>
  );
};

export default CertList2;
