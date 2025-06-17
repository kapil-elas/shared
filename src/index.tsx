import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      {/* <SoftButton> Shared App </SoftButton> */}
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}
