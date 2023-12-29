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
import {useGetConsultsByDoctor} from "../../hooks/consultations/useGetConsultsByDoctor";
import { useAddDoc } from "../../hooks/rdv/useAddDoc";

function Rdv() {
  const location = useLocation();
  const {idDoctor} =location.state ?? {idDoctor : "65706937932fe08092d2525f"};
    const { data, loading, error, performNewRdv } = useAddRdv();
    const { datadoc, loadingdoc, errordoc, performNewDoc } = useAddDoc();
    const { status, consultations } = useGetConsultsByDoctor(idDoctor);
  
      // useEffect(() => {
      //   if (consultations) {
      //     console.log("data: ", data);
      //     Navigate("/rdv");
      //   }
      // }, [consultations]);

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
      consultations &&
            <MyCalendar data={consultations} performNewRdv={performNewRdv} performNewDoc={performNewDoc} datadoc={datadoc} idDoctor={idDoctor}/>
      }
          <Footer />
        </>
      );
  }

  export default Rdv;