export default function PopupDelete({ handleShowPopup, performDelete }) {
  return (
    <div
      className="fixed top-1/4 left-64 w-1/2 h-40 bg-black bg-opacity-50 
    flex justify-center items-center"
    >
      <div className="flex flex-col  p-6 pt-4 mb-4 pb-2 bg-white dark:bg-black rounded shadow-md">
        <p className="text-center text-primary ">
          êtes vous sûr de vouloir supprimer ?{" "}
        </p>

        <div className="flex text-primary justify-between">
          <button type="button" onClick={performDelete}>
            Supprimer
          </button>
          <button type="button" onClick={handleShowPopup}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
