import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";
import ProfileForm from "../profile/ProfileForm";

export default function Profile() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout id="profile-page">
      <div className="content">
        <ProfileForm />
      </div>
    </Layout>
  );
}
