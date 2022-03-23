import React, { useState, useEffect } from "react";
import Layout from "../shares/Layout";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { apiMethod } from "../mocking/mocking";
import apiTestService from "../../libs/service.apiTest";

function APITest() {
  useEffect(() => {
    return () => {};
  }, []);

  const [result, setResult] = useState("Response show here.");
  const {
    control,
    register,
    getValues,
    handleSubmit,
    setValue,
    watch,
    errors
  } = useForm({
    defaultValues: {}
  });

  const callAPI = async data => {
    console.log("errors : ", errors);
    console.log("callAPI data: ", data);
    const params = { method: data.method.value, url: data.url };
    try {
      const response = await apiTestService(params);
      const stringResult = JSON.stringify(response, undefined, 4);
      setResult(stringResult);
    } catch (error) {
      const errorString = await String(error);
      setResult(errorString);
    }
  };

  return (
    <Layout>
      <div className="content">
        <form className="quotation-form" onSubmit={handleSubmit(callAPI)}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">{"API-Test"}</a>
              </li>
            </ol>
          </nav>

          <div className="form-row">
            <div className="form-group col-sm-6 col-md-6 col-lg-2">
              <label htmlFor="time">{"METHOD"}</label>

              <Controller
                name="method"
                rules={{ required: true }}
                control={control}
                render={props => (
                  <Select
                    placeholder={"เลือก METHOD"}
                    className={`${errors.method ? "select-is-invalid" : ""}`}
                    options={apiMethod}
                    {...props}
                  />
                )}
              ></Controller>
            </div>

            <div className="form-group col-sm-6 col-md-6 col-lg-6">
              <label htmlFor="url">{"URL"}</label>
              <input
                type="text"
                name="url"
                id="url"
                className={`form-control ${errors.url ? "is-invalid" : ""}`}
                ref={register({ required: true })}
              />
            </div>

            <div className="form-group col-sm-6 col-md-6 col-lg-2">
              <button type="submit" className="btn btn-secondary mt-4">
                <div className="d-flex justify-content-lg-center align-items-center">
                  <span className="material-icons">
                    <span className="material-icons">api</span>
                  </span>
                  <span className="ml-1">{" Call API"}</span>
                </div>
              </button>
            </div>
          </div>
          <pre value="ABC">{result}</pre>
        </form>
      </div>
    </Layout>
  );
}

export default APITest;
