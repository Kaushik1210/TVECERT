import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Result = ({ open, onClose, result }) => {
  const hasResult = result && typeof result === 'object';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {hasResult ? result.mainHeading : 'No Data'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
        <div className="h-full overflow-y-auto scrollbar-custom">
          {hasResult ? (
            <div className="flex flex-col gap-4 m-4 p-2">
              {/* Dynamic sections */}
              <div className="flex flex-col gap-4">
                <p className="text-center text-lg underline font-bold">
                  {result.selection}
                </p>
                <p className="text-center font-bold">{result.mainTitle}</p>
              </div>

              {result.pdf && (
                <a
                  href={result.pdf}
                  className="self-center mt-4 bg-blue-700 px-4 py-2 rounded-full shadow-lg text-white font-semibold hover:bg-green-600"
                >
                  Download PDF
                </a>
              )}
            </div>
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>
      </div>
      <div className="  p-5 border-t">
              <a
          className="bg-blue-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-600"
          href="https://forms.gle/A6YTaCtdhSrbvbtx6"
        >
          Apply
        </a>
              </div>
    </Dialog>
  );
};

export default Result;
