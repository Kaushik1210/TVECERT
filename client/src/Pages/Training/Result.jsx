import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Result = ({ open, onClose, result }) => {
  const handleDownload = () => {
    const pdf = result.pdf;// PDF file name stored in the result object
    const fileName = result.FileName
    const link = document.createElement("a");
        link.href = `/pdfs/${pdf}`; 
        link.download = `${fileName}`; 
                document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {/* Uncomment if you want to use the title */}
        <p>{result.mainHeading}</p>
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
            className="  h-full  overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-transparent
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
          >
        <div className="h-full overflow-y-auto scrollbar-custom">
          {result ? (
            <div className="flex flex-col gap-4 m-4 p-2">
              {/* Dynamic sections */}
              <div className="flex flex-col gap-4">
                <p className="text-center text-lg underline font-bold">{result.selection}</p>
                <p className="text-center font-bold">{result.mainTitle}</p>
              </div>

              {/* Why Section */}
              <div className="flex flex-col gap-1">
                {result.whyTitle && <p className="font-bold">{result.whyTitle}</p>}
                {result.whyPara1 && <p className="indent-4 font-semibold text-gray-700">{result.whyPara1}</p>}
                {result.whyPara2 && <p className="indent-4 font-semibold text-gray-700">{result.whyPara2}</p>}
                {result.whyList1 && <ul>{[...Array(9).keys()].map((i) => result[`whyList${i + 1}`] && (
                  <li className="font-semibold text-gray-700" key={i}>{result[`whyList${i + 1}`]}</li>
                ))}</ul>}
                {result.whyPara3 && <p className="indent-4 font-semibold text-gray-700">{result.whyPara3}</p>}
              </div>

              {/* Benefit Section */}
              <div className="flex flex-col gap-1">
                {result.benefitTitle && <p className="font-bold">{result.benefitTitle}</p>}
                {[...Array(10).keys()].map((i) =>
                  result[`benefitPara${i + 1}`] && (
                    <p className="indent-4 font-semibold text-gray-700" key={i}>
                      {result[`benefitPara${i + 1}`]}
                    </p>
                  )
                )}
              </div>

              {/* Learning Objectives */}
              <div className="flex flex-col gap-1">
                {result.learningObjTitle && <p className="font-bold">{result.learningObjTitle}</p>}
                {result.learningObjSubTitle && (
                  <p className="font-semibold text-gray-700">{result.learningObjSubTitle}</p>
                )}
                {result.learningObjPara1 && (
                  <ul>
                    {[...Array(10).keys()].map((i) =>
                      result[`learningObjPara${i + 1}`] && (
                        <li className="font-semibold text-gray-700" key={i}>
                          {result[`learningObjPara${i + 1}`]}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* ISO Section */}
              <div className="flex flex-col gap-1">
                {result.isoTitle && <p className="font-bold">{result.isoTitle}</p>}
                {result.isoPara1 && <p className="indent-4 font-semibold text-gray-700">{result.isoPara1}</p>}
                {result.isoPara2 && <p className="indent-4 font-semibold text-gray-700">{result.isoPara2}</p>}
              </div>

              {/* Knowledge Section */}
              {/* <div className="flex flex-col gap-1">
                {result.knowledgeTitle && <p className="font-bold">{result.knowledgeTitle}</p>}
                {[...Array(10).keys()].map((i) =>
                  result[`knowledgePara${i + 1}`] && (
                    <p className="indent-4 font-semibold text-gray-700" key={i}>
                      {result[`knowledgePara${i + 1}`]}
                    </p>
                  )
                )}
              </div> */}

              {/* Skill Section */}
              {/* <div className="flex flex-col gap-1">
                {result.skillTitle && <p className="font-bold">{result.skillTitle}</p>}
                {[...Array(10).keys()].map((i) =>
                  result[`skillPara${i + 1}`] && (
                    <p className="indent-4 font-semibold text-gray-700" key={i}>
                      {result[`skillPara${i + 1}`]}
                    </p>
                  )
                )}
              </div> */}

              {/* Course Format Section */}
              {/* <div className="flex flex-col gap-1">
                {result.courseFormatTitle && <p className="font-bold">{result.courseFormatTitle}</p>}
                {[...Array(10).keys()].map((i) =>
                  result[`courseFormatPara${i + 1}`] && (
                    <p className="indent-4 font-semibold text-gray-700" key={i}>
                      {result[`courseFormatPara${i + 1}`]}
                    </p>
                  )
                )}
              </div> */}

              {/* Course Style Section */}
              {/* <div className="flex flex-col gap-1">
                {result.courseStyleTitle && <p className="font-bold">{result.courseStyleTitle}</p>}
                {[...Array(10).keys()].map((i) =>
                  result[`courseStylePara${i + 1}`] && (
                    <p className="indent-4 font-semibold text-gray-700" key={i}>
                      {result[`courseStylePara${i + 1}`]}
                    </p>
                  )
                )}
              </div> */}

              {/* PDF Download Button */}
              {result.pdf && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                  className="self-center mt-4"
                >
                  Download PDF
                </Button>
              )}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
      <DialogActions>
        <button href="" className=' bg-blue-700 px-4 py-2 rounded-full text-white font-semibold hover:bg-green-600 ' >
          Apply
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Result;
