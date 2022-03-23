import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function TestFormNo1() {
  useEffect(() => {
    console.log("error : ", errors);
    return () => {
      console.log("clean up");
    };
  });

  const { handleSubmit, errors, register } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="firstName"
        ref={register({ required: true, maxLength: 2 })}
      />
      <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
      <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
      <label>th</label>
      <input
        class="input-medium datepicker"
        type="text"
        data-provide="datepicker"
        data-date-language="th"
      ></input>
      <input type="submit" />
    </form>
  );
}
