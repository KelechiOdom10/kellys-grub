import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Router } from "./router";

const rootElement = document.getElementById("root");
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
}
