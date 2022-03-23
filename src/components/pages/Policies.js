import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";

export default function Policies() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout className="policies-page">
      <div className="content">{"This is Policies."}</div>
    </Layout>
  );
}
