import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Policies from "./components/pages/Policies";
import Quatations from "./components/pages/Quotations";
import EditQuotation from "./components/pages/EditQuotation";
import CreateQuotation from "./components/pages/CreateQuotation";
import PasswordChanging from "./components/pages/PasswordChanging";
import FormTest from "./components/pages/FormTest";
import Version from "./components/pages/Version";
import APITest from "./components/pages/APITest";

export default function App() {
  useEffect(() => {
    console.log("effect was call");
    return () => {
      console.log("clean up");
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact={true} component={Profile}></Route> */}
          <Route path="/" exact={true} component={CreateQuotation}></Route>
          <Route path="/quatations" component={Quatations}></Route>
          <Route path="/edit-quotaion" component={EditQuotation}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/policies" component={Policies}></Route>
          <Route path="/password-changing" component={PasswordChanging}></Route>

          {/* Form Test Components. */}
          <Route path="/versions" component={Version}></Route>
          <Route path="/api-test" component={APITest}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
