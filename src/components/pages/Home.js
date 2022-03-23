import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";

export default function Home() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="home-page">
      <div className="content">{"This is home page."}</div>
    </Layout>
  );
}
