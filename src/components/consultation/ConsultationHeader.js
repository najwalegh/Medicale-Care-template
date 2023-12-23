export const ConsultationHeader = ({ totalPage }) => {
  return (
    <div className="items-center">
      <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Vos Consultation
        </span>{" "}
      </h1>
      {totalPage > 0 && (
        <div className="flex text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          {`Proceder au traitement de vos patient !!! Vous avez au total
          ${totalPage} consultations à faire.`}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
