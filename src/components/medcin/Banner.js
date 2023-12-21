import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetMedcin } from "../../hooks/medcins/useGetMedcin";

function Banner() {
  const [medcinList, setMedcinList] = useState([]);
  const [showInfo, setShowInfo] = useState(null);

  // useEffect(() => {
  //   const idService="123"
  //   axios.get(`http://localhost:8080/api/medcins/${idService}`).then((Response) => {
  //     console.log('Réponse du serveur:', Response.data);
  //     setMedcinList(Response.data);
  //   })
  //   .catch((error) => {
  //     console.error('Erreur lors de la requête:', error);
  //   });
  // }, []);
  const { data, loading, error, performService } = useGetMedcin();

  useEffect(() => {
    performService();
    if (data) {
      console.log("data from sevice : ", data);
    }
    if (error) {
      console.log("error : ", error);
    }
  }, []);

  return (
    <ul className='flex flex-wrap justify-center'>
      {data.map((medcin, index) => (
        <li key={index} className='m-4 p-4 bg-white shadow-md rounded-md w-64'>
          <div className='flex flex-col items-center'>
            <img src={require('../../assets/logo.png')} className='w-full h-40 object-cover rounded-md' alt={medcin.role} />
            <h1 className='text-black text-xl font-bold mt-2 mb-4'>{medcin.first_name} {medcin.last_name}</h1>
            <button
                className='bg-green-400 text-white px-4 py-2 rounded-md mt-2'
              >
                select
              </button>
          </div>
       
          {showInfo===index ? (
            <div className='text-center'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'
                onClick={() => setShowInfo(null)}
              >
                Hide Info
              </button>
              <h1 className='text-black text-xl font-bold mt-2 mb-4'>Phone: {medcin.phone}</h1>
              <h1 className='text-black text-xl font-bold mt-2 mb-4'>Address: {medcin.adress}</h1>
            </div>
          ) : (
            <div className='text-center'>

            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'
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
