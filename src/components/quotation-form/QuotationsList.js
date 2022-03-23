import React, { useState, useEffect } from "react";
import QuotationsTable from "./QuotationsTable";

export default function QuotationsList() {
  useEffect(() => {
    return () => {
      console.log("clean up.");
    };
  }, []);

  return (
    <div className="quotation-page">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <a href="#">{"สอบถามเบี้ย"}</a>
          </li>
        </ol>
      </nav>
      <div className="quotation-topic">
        <h1 className="">{"สอบถามเบี้ย"}</h1>
      </div>
      <QuotationsTable></QuotationsTable>
    </div>
  );
}
