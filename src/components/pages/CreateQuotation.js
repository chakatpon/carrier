import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";
import QuotationsFormV2 from "../quotation-form/QuotationsFormV2";

export default function CreateQuotations() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="quotations-page">
      <div className="content">
        <QuotationsFormV2></QuotationsFormV2>
      </div>
    </Layout>
  );
}
