import React from "react";
import { AuthProvider } from "./context/AuthContextProvider";
import AppRoutes from "./routes";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
