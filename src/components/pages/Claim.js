import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";

export default function Claim() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="claim-page">
      <div className="content">{"This is Claim page."}</div>
    </Layout>
  );
}
