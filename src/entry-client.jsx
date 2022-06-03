import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { worker } from "../mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
