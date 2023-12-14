import React from "react";

export const RenderToMedecin = ({ role, children }) => {
  return <div>{role === "MEDECIN" && children}</div>;
};
