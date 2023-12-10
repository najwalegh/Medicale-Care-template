import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MyCalendar from "../../components/rdv/MyCalendar";
import { useGetRdv } from "../../hooks/rdv/useGetRdv";
import { useTokenContext } from "../../context/AuthContextProvider";
import { Spinner } from "../../components/utils/Spinner";
import { AlertError } from "../../components/utils/AlertError";

function Rdv() {
    const { data, loading, error, performRdv } = useGetRdv();
    

    useEffect(() => {
        performRdv();
        if (data) {
          console.log("data of rdv : ", data);
        }
        if (error) {
            console.log("error : ", error);
          }
          else console.log(data)
      }, []);

    return (
        <>
          <Header />
          {loading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center">
          <AlertError
            message={
              "Une erreur interne est survenu, Veuillez Reactualisez la page ! "
            }
          />
        </div>
      )}
      {data &&
        data.length > 0 &&
        console.log("avant cal"+data) &&
            <MyCalendar data={data}/>
        
      }
         
          <Footer />
        </>
      );
  }

  export default Rdv;