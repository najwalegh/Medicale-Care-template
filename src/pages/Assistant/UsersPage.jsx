import { useEffect, useState } from "react";
import { useGetUsersByService } from "../../hooks/users/useGetUsersByService";
import { UserLists } from "../../components/Admin/UserLists";
import { useTokenContext } from "../../context/AuthContextProvider";
import { Spinner } from "../../components/utils/Spinner";
import { AlertInfo } from "../../components/utils/AlertInfo";
import { AlertError } from "../../components/utils/AlertError";
import { ConsultationFooter } from "../../components/consultation/ConsultationFooter";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const [selectedTab, setSelectedTab] = useState("ASSISTANT");
  const [usersService, setUsersService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useTokenContext();
  const navigate = useNavigate();

  const { users, status } = useGetUsersByService(token?.user?.service);
  const tailleTotal = usersService?.length ?? 1;
  const totalPage = Math.ceil(tailleTotal / 5);
  useEffect(() => {
    const filtered = users.filter((user) => {
      return selectedTab === user.role;
    });

    setUsersService(filtered);
  }, [selectedTab]);
  const TABS = [
    {
      label: "Patient",
      value: "PATIENT",
    },
    {
      label: "Medecin",
      value: "MEDECIN",
    },
    {
      label: "Assistant",
      value: "ASSISTANT",
    },
  ];
  const handleClick = () => {
    navigate("/admin/new-user");
  };
  return (
    <div>
      <div className="flex  mx-72 my-9 items-baseline">
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
        <div className="flex p-6">
          <button type="button" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-cyan-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex">
        {status === "loading" && (
          <div className="m-auto p-auto">
            <Spinner />{" "}
          </div>
        )}{" "}
        {status === "success" && usersService.length > 0 ? (
          usersService
            .slice((currentPage - 1) * 5, currentPage * 5)
            .map((user) => {
              return <UserLists key={user._id} user={user} />;
            })
        ) : (
          <>
            <AlertInfo message={"Aucun utilisateur pour ce service"} />
          </>
        )}
        {status === "error" && (
          <AlertError message={"Erreur Interne Veuillez Actualisez la page"} />
        )}
      </div>
      {status === "success" && usersService.length > 0 && (
        <ConsultationFooter
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      )}
    </div>
  );
}
export default UsersPage;
