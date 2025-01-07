import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarrerCard from '../../Components/CarrerCard';
import { URL } from '../../constant';

const CareerCardSec = () => {
  const [careerData, setCareerData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch career data when the component mounts
    const fetchCareerData = async () => {
      try {
        const response = await axios.get(`${URL}/data/certificationInfo/careerInfo`);
        setCareerData(response.data);
      } catch (err) {
        console.error("Error fetching career data", err);
        setError("Failed to load data.");
      }
    };

    fetchCareerData();
  }, []);

  return (
    <div id='careerList'>
      <div className='flex justify-center'>
        <p className='text-center text-24'>
          Some opportunities <br /> for you to explore
        </p>
      </div>

      <div className=' flex justify-evenly  flex-wrap mx-100 max-md:mx-6'>
        {error && <p className="text-red-500">{error}</p>}
        {/* Render each career item as a separate CarrerCard */}
        {careerData.map((item, index) => (
          <CarrerCard key={index} cd={item} />
        ))}
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-[500px] mx-6 border mb-10 border-gray-500' />
      </div>
    </div>
  );
};

export default CareerCardSec;
