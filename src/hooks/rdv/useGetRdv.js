import axios from "axios";
import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";
import { useAxios } from "../axios/useAxios";

  const consultation = async (axios, idDoctor) => {
    const response = await axios.get(`${ENDPOINTS.CONSULTS}/medecin/${idDoctor}`); 
    // const response = await axios.get(ENDPOINTS.CONSULTS, {
    //   params: {
    //     idDoctor: idDoctor,
    //   },
    // });
    alert(`${ENDPOINTS.CONSULTATION}/${idDoctor}`);
    console.log(response.data+"not null test")
    return response;
  };


  
  export const useGetRdv = () =>{
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const axiosInstance = useAxios();

    const performRdv = async (idDoctor) => {
      console.log("performRdv")
        try {
            setLoading(true);
            const result = await consultation (axiosInstance,idDoctor);
            setData(result.data);
            console.log("data 3mrat "+ data)
          } catch (error) {
            setError(error.response?.data);
          } finally {
            setLoading(false);
          }
    };

    return {
        data,
        error,
        loading,
        performRdv,
      };
  }
  