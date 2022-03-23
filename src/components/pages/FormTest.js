import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";
import TestFormNo1 from "../form-test/TestFormNo1";
import TestTable from "../form-test/TestTable";

export default function FormTest() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="home-page">
      <div className="content">
        {/* <TestTable /> */}
        <TestFormNo1 />
      </div>
    </Layout>
  );
}
