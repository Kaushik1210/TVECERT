import React, { useState, useEffect } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { URL } from '../../constant';

import { useLocation } from "react-router-dom";

const DelegateInfo = () => {
  const [searchCert, setSearchCert] = useState('');
  const [result, setResult] = useState(null);
  const [delegateData, setDelegateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // New state for the search loader

    const location = useLocation();
  
  useEffect(() => {
    const fetchDelegateData = async () => {
      try {
        const response = await fetch(`${URL}/data/certificationInfo/delegatesInfo`);
        const data = await response.json();
        setDelegateData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching delegate data:", error);
        setLoading(false);
      }
    };

    fetchDelegateData();
  }, []);

  useEffect(() => {
      if (location.hash) {
        const id = location.hash.substring(1); // Remove the '#' from the hash
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);

  const handleSearch = () => {
    setSearching(true); // Start the search loader
    setTimeout(() => {
      const found = delegateData.find((delegate) => delegate.certificateNo === searchCert);
      setResult(found || null); // Set result or null if not found
      console.log(result.issueDate)
      
      setSearching(false); // Stop the search loader after 2 seconds
    }, 2000); // 2-second delay
  };

  const formatDateStartperiod = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateEndperiod = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div id='delegateinfo' className='my-50 mx-50 flex flex-col gap-6'>
      <div className='flex flex-col items-center '>
        <p className='text-2xl text-darkblue'>DELEGATE'S CERTIFICATE INFO</p>
        <p className='text-darkblue'>Please enter your certificate number correctly as available on the certificate.</p>
      </div>

      <div className='w-full flex justify-center gap-3'>
        <input
          className='h-10 w-80 border rounded-lg border-gray-400 focus:border-lightblue indent-2 outline-none'
          type="text"
          placeholder='Certificate number'
          value={searchCert}
          onChange={(e) => setSearchCert(e.target.value)}
        />
        <div
          className='h-10 w-12 bg-gradient-to-r from-buttonfrom to-buttonto flex justify-center items-center rounded-lg cursor-pointer'
          onClick={handleSearch}
        >
          <BiSearchAlt className='text-white text-2xl' />
        </div>
      </div>

      {loading ? (
        <div className='px-7 py-5 bg-lgray shadow-xl rounded-xl'>
          <p className='text-lg font-semibold text-gray-500'>Loading...</p>
        </div>
      ) : searching ? (
        <div className='px-7 py-5 bg-lgray shadow-xl rounded-xl'>
          <p className='text-lg font-semibold text-gray-500'>Searching...</p>
        </div>
      ) : result ? (
        <div className='px-7 py-5 bg-lgray shadow-xl rounded-xl'>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between max-md:flex-col-reverse max-md:items-center'>
              <p className='text-lg font-semibold uppercase'>{result.delegateName}</p>
              <p className='text-lg font-semibold text-gray-500'>{result.certificateNo}</p>
            </div>
            <div className='w-full border border-gray-200' />
            <div className='flex-1 text-center'>
              <p className='font-medium'>Name of the Course</p>
              <p className='font-medium text-gray-500'>{result.nameOfTheCourse}</p>
            </div>
            <div className='flex max-md:flex-col max-md:gap-3'>
              <div className='flex flex-1 max-sm:flex-col max-sm:gap-3'>
                <div className='flex-1 text-center'>
                  <p className='font-medium'>Issue Date</p>
                  <p className='font-medium text-gray-500'>{result.issueDate}</p>
                </div>
                <div className='flex-1 text-center'>
                  <p className='font-medium'>Course End Date</p>
                  <p className='font-medium text-gray-500'>{result.expiryDate}</p>
                </div>
                <div className='flex-1 text-center'>
                  <p className='font-medium'>Status</p>
                  <p className='font-medium text-gray-500'>
                    {result.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='px-7 py-5 bg-lgray shadow-xl rounded-xl'>
          <p className='text-lg font-semibold text-gray-500'>No result found</p>
          <p className='text-gray-500'>Enter your certificate number correctly</p>
        </div>
      )}

      <div className='w-full flex justify-center'>
        <div className='w-[500px] border border-gray-500' />
      </div>
    </div>
  );
};

export default DelegateInfo;
