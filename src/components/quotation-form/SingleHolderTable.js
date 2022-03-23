import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import MaterialTable, { MTableToolbar } from "material-table";
import { mockingOptions, prefix } from "../mocking/mocking";

function SingleHolderTable(props) {
  const [birthDate, setBirthDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMale, setIsMale] = useState(true);
  const [isMaried, setIsMaried] = useState(true);
  const [isPerson, setIsPerson] = useState(true);
  const [isIDCard, setIsIDCard] = useState(true);
  const ExampleElemanet = () => {
    return <div>{"example element"}</div>;
  };

  const [columns, setColumns] = useState([
    {
      title: "คำนำหน้าชื่อ",
      field: "prefix",
      width: 120
    },
    {
      title: "ชื่อ - นามสกุล",
      field: "fullname"
    },
    {
      title: "บ้านเลขที่",
      field: "address"
    },
    {
      title: "อาคาร/หมู่บ้าน",
      field: "moo"
    },
    {
      title: "ซอย",
      field: "soi"
    },
    {
      title: "ถนน",
      field: "street"
    },
    {
      title: "จังหวัด",
      field: "province"
    },
    {
      title: "อำเภอ",
      field: "district"
    },
    {
      title: "ตำบล",
      field: "subdistrict"
    },
    {
      title: "รหัสไปรษณีย์",
      field: "zipcode"
    }
  ]);

  const [data, setData] = useState([
    {
      prefix: "นาย",
      fullname: "คนแรก และคนสุดท้าย",
      address: "213",
      moo: "8",
      soi: "02",
      street: "ห้วยฮัก",
      province: "เชียงใหม่",
      district: "สันทราย",
      subdistrict: "ป่าไผ่",
      zipcode: "50210"
    },
    {
      prefix: "นาย",
      fullname: "สดใส ร่าเริง",
      address: "213",
      moo: "8",
      soi: "02",
      street: "ห้วยฮัก",
      province: "เชียงใหม่",
      district: "สันทราย",
      subdistrict: "ป่าไผ่",
      zipcode: "50210"
    },
    {
      prefix: "นาย",
      fullname: "ตากฝน เปียกปอน",
      address: "213",
      moo: "8",
      soi: "02",
      street: "ห้วยฮัก",
      province: "เชียงใหม่",
      district: "สันทราย",
      subdistrict: "ป่าไผ่",
      zipcode: "50210"
    },
    {
      prefix: "นาย",
      fullname: "โดนลบ ถูกลืม",
      address: "213",
      moo: "8",
      soi: "02",
      street: "ห้วยฮัก",
      province: "เชียงใหม่",
      district: "สันทราย",
      subdistrict: "ป่าไผ่",
      zipcode: "50210"
    }
  ]);
  useEffect(() => {
    return () => {
      console.log("clean up ");
    };
  }, []);

  function addHolder(event, props) {
    event.preventDefault();
    console.log("props : ", props);
  }
  return (
    <>
      <MaterialTable
        title=""
        columns={columns}
        data={data}
        onRowclick={() => console.log("onRowclick.")}
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
        components={{
          Toolbar: props => (
            <div>
              <form className="holder-form p-4">
                <div className="form-row">
                  <div className="form-group col-md-2">
                    <label className="px-0 col-md-12">
                      {"ประเภทผู้ถือกรมธรรม์"}
                    </label>
                    <div className="pretty p-default p-curve mb-1">
                      <input
                        onClick={() => setIsPerson(true)}
                        type="radio"
                        name="personType"
                        checked={isPerson}
                      />
                      <div className="state p-primary-o">
                        <label>{"บุคคลธรรมดา"}</label>
                      </div>
                    </div>

                    <div className="pretty p-default p-curve">
                      <input
                        onClick={() => setIsPerson(false)}
                        type="radio"
                        name="personType"
                        checked={!isPerson}
                      />
                      <div className="state p-primary-o">
                        <label>{"นิติบุคคล"}</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="customerCode">{"รหัสลูกค้า"}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerCode"
                    />
                  </div>

                  <div className="form-group col-md-2">
                    <button className="btn btn-secondary mt-4" type="button">
                      <div className="d-flex justify-content-lg-center align-items-center">
                        <span className="material-icons">
                          <span className="material-icons">search</span>
                        </span>
                        {" CIS"}
                      </div>
                    </button>
                  </div>

                  {isPerson ? (
                    <>
                      <div className="form-group col-md-2">
                        <label className="px-0 col-md-12">{"ประเภทบัตร"}</label>
                        <div className="pretty p-default p-curve mb-1">
                          <input
                            onClick={() => setIsIDCard(true)}
                            type="radio"
                            name="cardType"
                            checked={isIDCard}
                          />
                          <div className="state p-primary-o">
                            <label>{"บัตรประจำตัวประชาชน"}</label>
                          </div>
                        </div>

                        <div className="pretty p-default p-curve">
                          <input
                            onClick={() => setIsIDCard(false)}
                            type="radio"
                            name="cardType"
                            checked={!isIDCard}
                          />
                          <div className="state p-primary-o">
                            <label>{"หนังสือเดินทาง"}</label>
                          </div>
                        </div>
                      </div>

                      {isIDCard ? (
                        <div className="form-group col-md-2">
                          <label htmlFor="cardId">
                            {"เลขบัตรประจำตัวประชาชน(13 หลัก)"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardId"
                          />
                        </div>
                      ) : (
                        <div className="form-group col-md-2">
                          <label htmlFor="passport">
                            {"เลขหนังสือเดินทาง"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="passport"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="form-group col-md-2">
                      <label htmlFor="taxId">
                        {"เลขบัตรประจำตัวผู้เสียภาษี"}
                      </label>
                      <input type="text" className="form-control" id="taxId" />
                    </div>
                  )}
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
                    <Select placeholder={"คำนำหน้าชื่อ"} options={prefix} />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="firstname">{"ชื่อ"}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                    />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="lastname">{"นามสกุล"}</label>
                    <input type="text" className="form-control" id="lastname" />
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
                    <label className="px-0 col-md-12">
                      {"สถานะการแต่งงาน"}
                    </label>
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
                    <input type="text" className="form-control" id="address" />
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
                    <input type="text" className="form-control" id="building" />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="moo">{"หมู่"}</label>
                    <input type="text" className="form-control" id="moo" />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="soi">{"ซอย"}</label>
                    <input type="text" className="form-control" id="soi" />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="street">{"ถนน"}</label>
                    <input type="text" className="form-control" id="street" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-2">
                    <label htmlFor="province">{"จังหวัด"}</label>
                    <Select
                      placeholder={"เลือกจังหวัด"}
                      options={mockingOptions}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="district">{"อำเภอ"}</label>
                    <Select
                      placeholder={"เลือกอำเภอ"}
                      options={mockingOptions}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="subdistrict">{"ตำบล"}</label>
                    <Select
                      placeholder={"เลือกตำบล"}
                      options={mockingOptions}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="zipcode">{"รหัสไปร์ษณีย์"}</label>
                    <input type="text" className="form-control" id="zipcode" />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="telephone">{"เบอร์โทรศัพท์"}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telephone"
                    />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="fax">{"เบอร์โทรสาร"}</label>
                    <input type="text" className="form-control" id="fax" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-2">
                    <label htmlFor="mobile">{"เบอร์มือถือ"}</label>
                    <input type="text" className="form-control" id="mobile" />
                  </div>

                  <div className="form-group col-md-2">
                    <label htmlFor="email">{"อีเมล์"}</label>
                    <input type="text" className="form-control" id="email" />
                  </div>
                </div>
              </form>
              <div className="d-flex justify-content-end">
                <button
                  onClick={event => addHolder(event, props)}
                  className="button button-viriyah mr-3"
                >
                  {"เพิ่มผู้ถือกรมธรรม์"}
                </button>
              </div>
              <MTableToolbar {...props} />
            </div>
          )
        }}
        options={{
          tableLayout: "auto",
          actionsColumnIndex: -1,
          paging: false,
          search: false,
          headerStyle: {
            whiteSpace: "nowrap",
            fontFamily:
              ' "db_sathorn_regular", "db_sathorn_bold", "db_thaitext_regular", "db_thaitext_bold", sans-serif ',
            fontSize: "1.2rem",
            fontWeight: "600",
            backgroundColor: "#0033a2",
            color: "#FFF"
          },
          cellStyle: {
            fontFamily:
              ' "db_sathorn_regular", "db_sathorn_bold", "db_thaitext_regular", "db_thaitext_bold", sans-serif ',
            fontSize: "1rem",
            whiteSpace: "nowrap"
          }
        }}
      />
    </>
  );
}

export default SingleHolderTable;
