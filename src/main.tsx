import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";

import { Amplify } from "aws-amplify";
import output from "../amplify_outputs.json";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ShareRecipeForm from "./components/ShareRecipeForm.tsx";
import { Authenticator } from "@aws-amplify/ui-react";
import Navbar from "./components/Navbar.tsx";

Amplify.configure(output);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authenticator className="flex justify-center items-center min-h-screen">
        {({ user, signOut }) => (
          <>
            <Navbar user={user} signOut={signOut} />
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/share" element={<ShareRecipeForm user={user} />} />
            </Routes>
          </>
        )}
      </Authenticator>
    </BrowserRouter>
  </React.StrictMode>
);
