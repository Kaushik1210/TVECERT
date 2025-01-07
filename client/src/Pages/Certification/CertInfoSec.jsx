import React, { useState, useEffect } from 'react';
import { BiSearchAlt } from "react-icons/bi";

const CertInfoSec = () => {
  const [searchCert, setSearchCert] = useState('');
  const [result, setResult] = useState(null);
  const [certData, setCertData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // New state for loader during search

  // Fetch the certification data from the API
  useEffect(() => {
    const fetchCertData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data/certificationInfo/certificateInfo');
        const data = await response.json();
        setCertData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certification data:", error);
        setLoading(false);
      }
    };

    fetchCertData();
  }, []);

  // Search handler
  const handleSearch = () => {
    setSearching(true); // Start the loader
    setTimeout(() => {
      const found = certData.find((cert) => cert.certNo === searchCert);
      setResult(found || null); // Set result or null if not found
      setSearching(false); // Stop the loader after 2 seconds
    }, 2000); // 2-second delay
  };

  // Determine status based on expiry date
  const getStatus = (expiryDate) => {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    return expiry >= currentDate ? { text: 'Valid', color: 'text-green-500' } : { text: 'Expired', color: 'text-red-500' };
  };

  // Format date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div id='certificateinfo' className='my-50 mx-50 flex flex-col gap-6'>
      <div className='flex flex-col items-center '>
        <p className='text-2xl text-darkblue'>CLIENT'S CERTIFICATE INFO</p>
        <p className='text-darkblue'>Please enter your certificate name correctly as available in the certificate.</p>
      </div>

      <div className='w-full flex justify-center gap-3'>
        <input
          className='h-10 w-80 border rounded-lg border-gray-400 focus:border-lightblue indent-2 outline-none'
          type="text"
          placeholder='Certification number'
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
            <div className='flex justify-between max-md:flex-col-reverse max-md:gap-3'>
              <div className='flex flex-col'>
                <p className='text-lg font-semibold uppercase'>{result.companyName}</p>
                <p className='font-medium text-gray-500'>{result.district}, {result.state}, {result.country}</p>
              </div>
              <p className='text-lg font-semibold text-gray-500'>{result.certNo}</p>
            </div>
            <div className='w-full border border-gray-200' />
            <div className='flex-1 text-center'>
              <p className='font-medium'>Scope Of Certification</p>
              <p className='font-medium text-gray-500'>{result.scopeOfCertification}</p>
            </div>
            <div className='flex max-md:flex-col max-md:gap-3'>
              <div className='flex flex-1 max-sm:flex-col max-sm:gap-3'>
                <div className='flex-1 text-center'>
                  <p className='font-medium'>Certificate Type</p>
                  <p className='font-medium text-gray-500'>{result.certType}</p>
                </div>
                <div className='flex-1 text-center'>
                  <p className='font-medium'>Expiry Date</p>
                  <p className='font-medium text-gray-500'>{formatDate(result.expiryDate)}</p>
                </div>
                <div className='flex-1 text-center'>
                  <p className='font-medium'>Status</p>
                  <p className={`font-medium ${getStatus(result.expiryDate).color}`}>
                    {getStatus(result.expiryDate).text}
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

export default CertInfoSec;
