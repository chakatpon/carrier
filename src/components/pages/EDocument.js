import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";

export default function EDocument() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="e-document-page">
      <div className="content">{"E-Document Page Content"}</div>
    </Layout>
  );
}
