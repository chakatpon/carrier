import React, { useState, useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    console.log("effect was call");
    return () => {
      console.log("clean up ");
    };
  }, []);

  return (
    <div className="footer">
      <div className="copyright">
        &copy; Copyright 2020, The Viriyah Insurance.
      </div>
    </div>
  );
}
