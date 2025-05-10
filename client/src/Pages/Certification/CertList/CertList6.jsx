import React, { useState } from "react";
import image from "../../../Assets/dummy";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";

const CertList6 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const obligations = [
    {
      title: "ISO 9001:2015",
      link: "https://drive.google.com/file/d/1adQkX2M8zjhXyvQJdnQ07e55pWq5cNUN/view?usp=drive_link"
    },
    {
      title: "ISO 14001:2015",
      link: "https://drive.google.com/file/d/1rL6WJGzN-hx6RBMJrLBDboFoxTSSqzEV/view?usp=drive_link"
    },
    {
      title: "ISO 45001:2018",
      link: "https://drive.google.com/file/d/1rSlSkYD5V3k1uLUi0tGsrjC0vaZbAsa3/view?usp=drive_link"
    },
    {
      title: "ISO 22000:2018",
      link: "https://drive.google.com/file/d/18PouLU4zwCqedYM3flOFVVx6XIexJgNA/view?usp=drive_link"
    }
  ];

  return (
    <div className="mt-4">
      <div className="relative">
        <img 
          src={image.c7} 
          alt="Example" 
          className="w-full h-full shadow-xl rounded-xl object-cover" 
        />
        <div className="absolute inset-0 p-2 gap-2 flex flex-col rounded-xl items-start justify-end bg-black bg-opacity-50">
          <p className="text-white capitalize text-2xl font-bold">
            Obligation of certified client
          </p>
          
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className="text-white flex items-center gap-2  normal-case p-0 min-w-0"
              sx={{
                textTransform: 'none',
                color:'#ffff',
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >
              <span className="text-xs">More</span>
              <FaRegArrowAltCircleRight className="text-sm" />
            </Button>
            
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              PaperProps={{
                sx: {
                  width: '200px',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                  borderRadius: '8px',
                }
              }}
            >
              {obligations.map((obligation, index) => (
                <MenuItem 
                  key={index} 
                  onClick={handleClose}
                  component="a"
                  href={obligation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: '0.875rem',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  {obligation.title}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertList6;