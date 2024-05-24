import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";

import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(output);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticator>
              {({ user, signOut }) => <Home user={user} signOut={signOut} />}
            </Authenticator>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
