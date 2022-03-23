import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";
import QuotationsEditV2 from "../quotation-form/QuotationsEditV2";

export default function EditQuotation(props) {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="quotations-page">
      <div className="content">
        <QuotationsEditV2></QuotationsEditV2>
      </div>
    </Layout>
  );
}
