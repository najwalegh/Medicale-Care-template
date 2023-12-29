export const ConsultationCard = ({
  id,
  start_date,
  end_date,
  description,
  status,
  patient,
  medecin,
  handleClick,
}) => {
  const handleAccept = () => {
    handleClick(id, "Processing");
  };
  const handleCancel = () => {
    handleCancel(id, "Cancel");
  };
  const handleFacture = () => {
    alert("changement de facture !!!! ");
  };
  return (
    <div class="flex text-center md:flex-row-reverse flex-wrap m-auto w-3/5 p-3 items-center mb-6 bg-white rounded-lg shadow dark:border">
      <div className="w-full md:w-1/6 text-center text-gray-700">
        <div className="flex flex-col items-center">
          {status !== "Processing" && (
            <button type="button" onClick={handleAccept}>
              Accepter
            </button>
          )}
          <button type="button" onClick={handleCancel}>
            Annuler
          </button>
          <button type="button" onClick={handleFacture}>
            Facture
          </button>
        </div>
      </div>
      <div class="w-full md:w-3/5 text-center text-gray-200">
        <div className="flex justify-between">
          <div className="flex flex-col p-6 text-lg font-normal text-gray-500 dark:text-gray-400 border-r-4 mr-2 border-l-4">
            <h3 className="border-b-2 text-lg">Information de Consultation</h3>
            <div>
              Date : {start_date.split("T")[0]} au {end_date.split("T")[0]}
            </div>
            <div>{description}</div>
            <div>etat de la consultation {status} </div>
          </div>
          <div className="flex flex-col text-primary justify-around boder-r-4 border-black">
            <div className="flex flex-col items-center">
              <h3 className="border-b-2">Medecin</h3>

              <div className="text-primary">
                {medecin && medecin?.first_name + " " + medecin?.last_name}
              </div>
              <div className="text-secondary">{medecin && medecin?.email}</div>
              <div className="text-secondary">{medecin && medecin?.gender}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/5 text-center text-gray-700  mr-2">
        <div className="flex flex-col items-start">
          <h3 className="border-b-2">Patient</h3>
          <div className="text-primary">
            {patient && patient?.first_name + " " + patient?.last_name}
          </div>
          <div className="text-secondary">{patient && patient?.email}</div>
          <div className="text-secondary">{patient && patient?.gender}</div>
        </div>
      </div>
    </div>
  );
};
