import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ConsultationCard } from "../../components/consultation/ConsultationCard";
import { ConsultationFooter } from "../../components/consultation/ConsultationFooter";
import { MedecinHeader } from "../../components/doctor/MedecinHeader";
import { useGetConsultsByDoctor } from "../../hooks/consultations/useGetConsultsByDoctor";
import { useTokenContext } from "../../context/AuthContextProvider";
import { AlertError } from "../../components/utils/AlertError";
import { AlertInfo } from "../../components/utils/AlertInfo";
import { Spinner } from "../../components/utils/Spinner";
import { calculatePeriod } from "../../components/utils/getPeriodeByDate";
import { useUpdateStatus } from "../../hooks/consultations/useUpdateStatus";
import Datepicker from "react-tailwindcss-datepicker";
import { ConsultationHeader } from "../../components/consultation/ConsultationHeader";

export const ConsultationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const [selectedTab, setSelectedTab] = useState("all");
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const { updateStatusMutation } = useUpdateStatus();
  const { token } = useTokenContext();
  const { status, consultations } = useGetConsultsByDoctor(token.user.id);
  const tailleTotal = filteredConsultations?.length ?? 1;
  const totalPage = Math.ceil(tailleTotal / 5);

  useEffect(() => {
    const filtered = consultations.filter((consultation) => {
      const consultationDate = consultation.start_date.split("T")[0];
      if (selectedTab === "all") {
        return consultationDate === value.startDate;
      } else {
        return (
          (selectedTab === consultation.status || selectedTab === "all") &&
          consultationDate === value.startDate
        );
      }
    });

    setFilteredConsultations(filtered);
  }, [selectedTab, handleValueChange]);
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Processing",
      value: "Processing",
    },
    {
      label: "Done",
      value: "Done",
    },
  ];

  const performUpdateStatus = async (id, status) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
      alert("Status Mis à Done");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <Header childreen={<MedecinHeader />} />

      <div>
        <div className=" mx-56 my-12 items-center">
          <ConsultationHeader totalPage={totalPage} />
        </div>
        <div className="flex  mx-72 my-9 items-start">
          <div className="flex w-96 p-auto m-auto items-center mb-8 m-auto shadow-md bg-white-500 rounded-lg justify-around md:flex-row">
            {TABS.map(({ label, value }) => (
              <button
                key={value}
                value={value}
                className={`btn-lg text-primary p-4 ${
                  selectedTab === value
                    ? "bg-cyan-400 rounded-lg w-full"
                    : "bg-none"
                }`}
                onClick={() => setSelectedTab(value)}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </button>
            ))}
          </div>
          <div className="w-96  p-auto">
            <Datepicker
              useRange={false}
              inputClassName="w-full h-14 rounded-md focus:ring-0 font-normal bg-white-500 dark:bg-green-900 dark:placeholder:text-green-100"
              placeholder={"Filtrez en fonction d'une date"}
              suffixIcon={false}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <div className="flex flex-col p-auto">
          {status === "loading" && (
            <div className="m-auto p-auto">
              <Spinner />{" "}
            </div>
          )}{" "}
          {status === "success" && filteredConsultations.length > 0 ? (
            filteredConsultations
              .slice((currentPage - 1) * 5, currentPage * 5)
              .map((consultation) => {
                return (
                  <ConsultationCard
                    key={consultation._id}
                    id={consultation._id}
                    time={consultation.start_date}
                    description={calculatePeriod(
                      consultation.start_date,
                      consultation.end_date
                    )}
                    result={consultation.status}
                    patient={consultation.patient}
                    handleClick={performUpdateStatus}
                  />
                );
              })
          ) : (
            <>
              <AlertInfo message={"Aucune Consultation Pour ajourd'hui"} />
            </>
          )}
          {status === "error" && (
            <AlertError
              message={"Erreur Interne Veuillez Actualisez la page"}
            />
          )}
        </div>
        {status === "success" && filteredConsultations.length > 0 && (
          <ConsultationFooter
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        )}
      </div>
      <Footer />
    </>
  );
};
