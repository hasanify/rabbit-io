import "./index.css";

import App from "@/App";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
