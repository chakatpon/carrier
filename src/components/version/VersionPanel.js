import React, { useState, useEffect } from "react";

function VersionPanel() {
  useEffect(() => {
    console.log("This is component for see version.");
    return () => {
      console.log("clean up Version Component.");
    };
  }, []);

  return (
    <div className="version-page">
      <p>{"carrier:v21"}</p>
    </div>
  );
}

export default VersionPanel;
