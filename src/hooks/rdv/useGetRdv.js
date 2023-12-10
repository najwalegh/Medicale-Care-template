import axios from "axios";
import { ENDPOINTS } from "../EndPoints";
import { useState } from "react";
import { useAxios } from "../axios/useAxios";

const rdv = async (axios) => {
  console.log("before get")
    const response = await axios.get(`${ENDPOINTS.RDV}`);
    console.log(response.data+"not null test")
    return response;
  };

  export const useGetRdv = () =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    const performRdv = async () => {
      console.log("performRdv")
      
     

        try {
            setLoading(true);
            // const result = await rdv(axiosInstance);
            // setData(result);
            axios.get(`http://localhost:8080/api/rdv`).then((Response) => {
              console.log('Réponse du serveur:', Response.data);
              setData(Response.data);
              console.log("data response data" + data.toString())
            })
            .catch((error) => {
              console.error('Erreur lors de la requête:', error);
            });

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
  