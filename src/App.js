import React from "react";
import { AuthProvider } from "./context/AuthContextProvider";
import AppRoutes from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-site bg-no-repeat bg-cover overflow-hidden min-h-screen">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
