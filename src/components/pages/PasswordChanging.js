import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";

export default function PasswordChanging() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="passwordChanging-page">
      <div className="content">{"This is password-changing page"}</div>
    </Layout>
  );
}
