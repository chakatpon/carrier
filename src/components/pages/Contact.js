import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";

export default function Contact() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="contact-page">
      <div className="content">{"Contact Page Content"}</div>
    </Layout>
  );
}
