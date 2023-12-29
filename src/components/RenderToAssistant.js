import React from "react";

export const RenderToAssistant = ({ role, children }) => {
  return <div>{role === "ASSISTANT" && children}</div>;
};
