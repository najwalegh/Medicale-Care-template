import { bgcolor } from '@mui/system';
import React, { useState } from 'react';

function Banner({ data }) {
  const [showInfo, setShowInfo] = useState(null);

  return (
    <ul className='flex flex-wrap justify-center'>
      {data &&
        data.length &&
        data.map((medcin, index) => (
          <li
            key={index}
            className={`m-4 p-4 bg-white shadow-md rounded-md w-64 ${
              showInfo === index ? 'expanded-card' : ''
            }`}
          >
            <div className='flex flex-col items-center'>
              <img
                src={require('../../assets/logo.png')}
                className='w-full h-40 object-cover rounded-md'
                alt={medcin.role}
              />
              <h1 className='text-black text-xl font-bold mt-2 mb-4'>
                {medcin.first_name} {medcin.last_name}
              </h1>
              <button
 className='text-white px-4 py-2 rounded-md mt-2'
 style={{ backgroundColor: '#AFFFDD' }}              >
                Select
              </button>
            </div>

            {showInfo === index && (
              <div className='text-center'>
            <button
                className='text-white px-4 py-2 rounded-md mt-2'
                style={{ backgroundColor: '#197dD2' }}
                onClick={() => setShowInfo(null)}
              >
 

                  Hide Info
                </button>
                <div>
                  <h1 className='text-black font-bold mt-2 mb-1'>Phone: </h1>
                  <h3 className='text-black'>{medcin.phone}</h3>
                </div>
                <div>
                  <h1 className='text-black font-bold mt-2 mb-1'>Address: </h1>
                  <h3 className='text-black'>{medcin.adress}</h3>
                </div>
              </div>
            )}

            {showInfo !== index && (
              <div className='text-center'>
                <button
 className='text-white px-4 py-2 rounded-md mt-2'
 style={{ backgroundColor: '#197dD2' }}
                   onClick={() => setShowInfo(index)}
                >
                  More Info
                </button>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Banner;
