import Banner from "../Banner";

export const MedecinBanner = ({ token }) => {
  const description =
    "Révolutionnez votre pratique médicale avec notre plateforme dédiée. Communiquez, offrez des soins de qualité et simplifiez la relation avec vos patients grâce à des outils intuitifs.";
  const services = [
    "Gérez vos rendez-vous",
    "consultez les dossiers patients",
    "Discuter En ligne",
  ];
  return (
    <Banner
      token={token}
      title={"Médecine Connectée"}
      description={description}
      btnText={"Consultation du jour"}
      btnLink={"/consultations"}
      services={services}
    />
  );
};
