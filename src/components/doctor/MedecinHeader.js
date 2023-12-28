import { Link } from "react-router-dom";

export const MedecinHeader = () => {
  return (
    <>
      <Link to={"/consultations"}>
        <button className="btn-lg ">Consultations</button>
      </Link>
    </>
  );
};
