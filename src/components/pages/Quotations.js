import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../shares/Layout";
import QuotationsList from "../quotation-form/QuotationsList";

export default function Quotations() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="quotations-page">
      <div className="content">
        <QuotationsList></QuotationsList>
      </div>
    </Layout>
  );
}
