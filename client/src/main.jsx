import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { useLoadUserQuery } from "./features/api/authApi";
import { Toaster } from "@/components/ui/sonner"
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
      <Toaster/>
    </Provider>
  </StrictMode>
);
