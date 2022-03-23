import React, { useState, useEffect } from "react";
import LoginPanel from "../login/LoginPanel";
import Header from "../shares/Header";
import Footer from "../shares/Footer";
import backgroundIMG from "../../assets/img/bgviriyah0.png";

export default function Login() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="login-page">
      <Header />
      <div className="login-content">
        <LoginPanel />
      </div>
      <img className="login-background" src={backgroundIMG} />
      <Footer />
    </div>
  );
}
