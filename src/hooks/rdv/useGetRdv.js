// import axios from "axios";
import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";
import { useAxios } from "../axios/useAxios";

const rdv = async (axios) => {
    const response = await axios.get(`${ENDPOINTS.RDV}`);
    console.log(response.data+"not null test")
    return response;
  };

  export const useGetRdv = () =>{
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const axiosInstance = useAxios();

    const performRdv = async () => {
      console.log("performRdv")
        try {
            setLoading(true);
            const result = await rdv(axiosInstance);
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
  