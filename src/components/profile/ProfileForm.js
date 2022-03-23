import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { mockingOptions, prefix } from "../mocking/mocking";
import { useForm, Controller } from "react-hook-form";

export default function ProfileForm() {
  const { control, register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      prefix: "",
      province: "",
      district: "",
      subdistrict: ""
    }
  });
  const submitForm = data => {
    // do something when data valid.
  };

  useEffect(() => {
    return () => {};
  });

  const [birthDate, setBirthDate] = useState(new Date());
  const [isMale, setIsMale] = useState(true);
  const [isMaried, setIsMaried] = useState(true);

  return (
    <form className="profile-form" onSubmit={handleSubmit(submitForm)}>
      <div className="quotation-subtopic">
        <h4>{"ข้อมูลส่วนตัว"}</h4>
      </div>

      <div className="form-row">
        <div className="form-group col-md-2">
          <label className="px-0 col-md-12">{"เพศ"}</label>
          <div className="pretty p-default p-curve mb-1">
            <input
              onClick={() => setIsMale(true)}
              type="radio"
              name="gender"
              checked={isMale}
            />
            <div className="state p-primary-o">
              <label>{"ชาย"}</label>
            </div>
          </div>

          <div className="pretty p-default p-curve">
            <input
              onClick={() => setIsMale(false)}
              type="radio"
              name="gender"
              checked={!isMale}
            />
            <div className="state p-primary-o">
              <label>{"ผู้หญิง"}</label>
            </div>
          </div>
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="prefix">{"คำนำหน้าชื่อ"}</label>
          <Controller
            name="prefix"
            className={`${errors.prefix ? "select-is-invalid" : ""}`}
            as={Select}
            rules={{ required: true }}
            placeholder={"คำนำหน้าชื่อ"}
            options={prefix}
            control={control}
          ></Controller>
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="firstname">{"ชื่อ"}</label>
          <input
            type="text"
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
            name="firstname"
            id="firstname"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="lastname">{"นามสกุล"}</label>
          <input
            type="text"
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            name="lastname"
            id="lastname"
            ref={register({ required: true })}
          />
        </div>
        <div className="form-group col-md-2 p-0">
          <label className="px-1 col-md-12" for="birthDate">
            {"วันเกิด"}
          </label>
          <DatePicker
            selected={birthDate}
            onChange={date => setBirthDate(date)}
            className="form-control col-md-12"
          />
        </div>

        <div className="form-group col-md-2">
          <label className="px-0 col-md-12">{"สถานะการแต่งงาน"}</label>
          <div className="pretty p-default p-curve mb-1">
            <input
              onClick={() => setIsMaried(true)}
              type="radio"
              name="mariedStatus"
              checked={isMaried}
            />
            <div className="state p-primary-o">
              <label>{"แต่งงาน"}</label>
            </div>
          </div>

          <div className="pretty p-default p-curve">
            <input
              onClick={() => setIsMaried(false)}
              type="radio"
              name="mariedStatus"
              checked={!isMaried}
            />
            <div className="state p-primary-o">
              <label>{"โสด"}</label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-2">
          <label htmlFor="address">{"บ้านเลขที่"}</label>
          <input
            type="text"
            name="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <button className="btn btn-secondary mt-4" type="button">
            <div className="d-flex justify-content-lg-center align-items-center">
              <span className="material-icons">
                <span className="material-icons">search</span>
              </span>
              {" Address CIS"}
            </div>
          </button>
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="building">{"อาคาร/หมู่บ้าน"}</label>
          <input
            type="text"
            name="building"
            className={`form-control ${errors.building ? "is-invalid" : ""}`}
            id="building"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="moo">{"หมู่"}</label>
          <input
            type="text"
            name="moo"
            className={`form-control ${errors.moo ? "is-invalid" : ""}`}
            id="moo"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="soi">{"ซอย"}</label>
          <input
            type="text"
            name="soi"
            className={`form-control ${errors.soi ? "is-invalid" : ""}`}
            id="soi"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="street">{"ถนน"}</label>
          <input
            type="text"
            name="street"
            className={`form-control ${errors.street ? "is-invalid" : ""}`}
            id="street"
            ref={register({ required: true })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-2">
          <label htmlFor="province">{"จังหวัด"}</label>
          <Controller
            name="province"
            className={`${errors.province ? "select-is-invalid" : ""}`}
            as={Select}
            rules={{ required: true }}
            placeholder={"เลือกจังหวัด"}
            options={mockingOptions}
            control={control}
          ></Controller>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="district">{"อำเภอ"}</label>
          <Controller
            name="district"
            className={`${errors.district ? "select-is-invalid" : ""}`}
            as={Select}
            rules={{ required: true }}
            placeholder={"เลือกอำเภอ"}
            options={mockingOptions}
            control={control}
          ></Controller>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="subdistrict">{"ตำบล"}</label>
          <Controller
            name="subdistrict"
            className={`${errors.subdistrict ? "select-is-invalid" : ""}`}
            as={Select}
            rules={{ required: true }}
            placeholder={"เลือกตำบล"}
            options={mockingOptions}
            control={control}
          ></Controller>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="zipcode">{"รหัสไปร์ษณีย์"}</label>
          <input
            type="text"
            name="zipcode"
            className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
            id="zipcode"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="telephone">{"เบอร์โทรศัพท์"}</label>
          <input
            type="text"
            name="telephone"
            className={`form-control ${errors.telephone ? "is-invalid" : ""}`}
            id="telephone"
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="fax">{"เบอร์โทรสาร"}</label>
          <input
            type="text"
            name="fax"
            className={`form-control ${errors.fax ? "is-invalid" : ""}`}
            id="fax"
            ref={register({ required: true })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-2">
          <label htmlFor="mobile">{"เบอร์มือถือ"}</label>
          <input
            type="text"
            name="mobile"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            id="mobile"
            ref={register({
              required: true,
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i,
                message: "invalid mobile"
              }
            })}
          />
        </div>

        <div className="form-group col-md-2">
          <label htmlFor="email">{"อีเมล์"}</label>
          <input
            type="text"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(com|kr|net|us|info|biz)$/i,
                message: "invalid email address"
              }
            })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-2">
          <button type="submit" className="btn btn-info">
            {"Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
