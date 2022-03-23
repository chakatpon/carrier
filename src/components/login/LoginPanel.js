import React, { useState, useEffect } from "react";

export default function LoginPanel() {
  useEffect(() => {
    return () => {
      console.log("clean up.");
    };
  }, []);

  return (
    <form className="login-form">
      <h1 className="login-topic f-50px">{"เข้าสู่ระบบ Carrier"}</h1>

      <div className="login-group">
        <input
          className="login-input"
          type="text"
          id="username"
          required="required"
          autoComplete="off"
        />
        <label className="login-label" for="username">
          {"ชื่อบัญชี"}
        </label>
        <div className="input-bar"></div>
      </div>
      <div className="login-group">
        <input
          className="login-input"
          type="password"
          id="password"
          required="required"
          autoComplete="off"
        />
        <label className="login-label" for="password">
          {"รหัสผ่าน"}
        </label>
        <div className="input-bar"></div>
      </div>
      <div className="login-group">
        <div className="mt-3">
          <div class="pretty p-default p-curve p-thick">
            <input type="checkbox" />
            <div class="state  p-warning">
              <label className="f-30px text-white">{"จดจำรหัสผ่าน"}</label>
            </div>
          </div>
        </div>
      </div>
      <button className="button-login box-shadow">{"เข้าสู่ระบบ"}</button>
    </form>
  );
}
