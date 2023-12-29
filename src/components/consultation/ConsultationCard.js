import { useState } from "react";
import { Tooltip } from "../utils/TooltipBtn";
import { formatHour } from "../utils/FormatHour";

export const ConsultationCard = ({
  id,
  time,
  description,
  result,
  patient,
  handleClick,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const handleShowInfo = () => setShowInfo(true);
  const handleHideInfo = () => setShowInfo(false);

  const handleUpdateStatus = () => {
    handleClick(id, "Done");
  };
  return (
    <div class="flex md:flex-row-reverse flex-wrap m-auto w-3/5 p-9 items-center mb-6 bg-white rounded-lg shadow dark:border">
      <div class="w-full md:w-3/4 p-4 text-center text-gray-200">
        <div className="flex justify-between">
          <div className="flex flex-col text-lg font-normal text-gray-500 dark:text-gray-400">
            <div>
              Consultation à l'horaire {formatHour(time) + " "} prevu pour{" "}
              {time.split("T")[0]}
            </div>
            <div>{`la Periode estimé est ${
              description !== "" ? description : " déjà fini !"
            } `}</div>
            <div>Results of the last consultation {result} </div>
          </div>
          <div className="flex flex-col justify-around">
            <button
              type="button"
              onMouseEnter={handleShowInfo}
              onMouseLeave={handleHideInfo}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 stroke-cyan-500 relative"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              {showInfo && <Tooltip content={"commencer"} />}
            </button>
            <button type="button" onClick={handleUpdateStatus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-red-500 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/4 p-4 text-center text-gray-700 border-r-4">
        <div className="flex flex-col items-center">
          <div className="text-primary">
            {patient && patient?.first_name + " " + patient?.last_name}
          </div>
          <div className="text-secondary">{patient && patient?.email}</div>
          <div className="text-secondary">{patient && patient?.phone}</div>
        </div>
      </div>
    </div>
  );
};
