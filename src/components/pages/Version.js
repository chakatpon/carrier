import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";
import VersionPanel from "../version/VersionPanel";

function Version() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="version-page">
      <div className="content">
        <VersionPanel></VersionPanel>
      </div>
    </Layout>
  );
}

export default Version;
