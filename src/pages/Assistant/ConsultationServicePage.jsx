import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { ConsultationFooter } from "../../components/consultation/ConsultationFooter";
import { useGetConsultsByDoctor } from "../../hooks/consultations/useGetConsultsByDoctor";
import { useTokenContext } from "../../context/AuthContextProvider";
import { AlertError } from "../../components/utils/AlertError";
import { AlertInfo } from "../../components/utils/AlertInfo";
import { Spinner } from "../../components/utils/Spinner";
import { calculatePeriod } from "../../components/utils/getPeriodeByDate";
import { useUpdateStatus } from "../../hooks/consultations/useUpdateStatus";
import Datepicker from "react-tailwindcss-datepicker";
import { ConsultationHeader } from "../../components/consultation/ConsultationHeader";
import { ConsultationCard } from "../../components/Admin/ConsultCard";
import { useGetConsultsByService } from "../../hooks/consultations/useGetConsultsByService";
import { Navbar } from "../../components/Admin/Navbar";
import { SideNav } from "../../components/Admin/sideNav";

export const ConsultationServicePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const [selectedTab, setSelectedTab] = useState("all");
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSideBar = () => setSidebarOpen(!sidebarOpen);
  const { updateStatusMutation } = useUpdateStatus();
  const { token } = useTokenContext();
  const { status, consultations } = useGetConsultsByService(token.user.service);
  const tailleTotal = filteredConsultations?.length ?? 1;
  const totalPage = Math.ceil(tailleTotal / 5);

  useEffect(() => {
    const filtered = consultations.filter((consultation) => {
      const consultationDate = consultation.start_date.split("T")[0];

      return (
        selectedTab === consultation.status &&
        (consultationDate === value.startDate || value.startDate === null)
      );
    });

    setFilteredConsultations(filtered);
  }, [selectedTab, handleValueChange]);
  const TABS = [
    {
      label: "attente",
      value: "Pending",
    },
    {
      label: "Traitement",
      value: "Processing",
    },
    {
      label: "Terminer",
      value: "Done",
    },
    {
      label: "Annuler",
      value: "Cancel",
    },
  ];

  const performUpdateStatus = async (id, status) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
      alert("Status changer avec succes");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div>
        <Navbar
          user={token?.user}
          sidebarOpen={sidebarOpen}
          handleSideBar={handleSideBar}
          setSidebarOpen={setSidebarOpen}
        />
        <SideNav isSidebarCollapsed={sidebarOpen} />
      </div>
      <div
        className={`flex items-center justify-center w-4/5 h-3/2 m-auto text-center pt-20 pb-16 transition-transform sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div>
          <div className="mx-56 my-12 items-center">
            <h3>Gerez les demandes de prise de Rendez-vous ! </h3>
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
                      start_date={consultation.start_date}
                      end_date={consultation.end_date}
                      description={
                        consultation.description ??
                        "No description !!!!!!! Hhhhhh "
                      }
                      status={consultation.status}
                      patient={consultation.patient}
                      medecin={consultation.id_medcin}
                      handleClick={performUpdateStatus}
                    />
                  );
                })
            ) : (
              <>
                <AlertInfo message={"Aucun Utilisateur Trouvé"} />
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
      </div>
    </>
  );
};
