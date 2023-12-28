import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MyCalendar from "../../components/rdv/MyCalendar";
import { useGetRdv } from "../../hooks/rdv/useGetRdv";
import { useTokenContext } from "../../context/AuthContextProvider";
import { Spinner } from "../../components/utils/Spinner";
import { AlertError } from "../../components/utils/AlertError";
import { Navigate, useLocation } from "react-router-dom";
import { useAddRdv } from "../../hooks/rdv/useAddRdv";

function Rdv() {
  const location = useLocation();
  const {medcinId} =location.state ?? {medcinId : null}
    const { data, loading, error, performRdv } = useGetRdv();
    const { dataRdv, loadingRdv, errorRdv, performNewRdv } = useAddRdv();

    useEffect(() => {
      alert("id" +" "+medcinId)
        performRdv();
        if (data) {
          console.log("data of rdv : ", data);
        }
        if (error) {
            console.log("error : ", error);
          }
          else console.log(data)
      }, []);

      useEffect(() => {
        if (dataRdv) {
          console.log("data: ", data);
          Navigate("/rdv");
        }
      }, [dataRdv]);

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
      {
      data &&
            <MyCalendar data={data} performNewRdv={performNewRdv}/>
      }
          <Footer />
        </>
      );
  }

  export default Rdv;