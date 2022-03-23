import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import PackageTable from "./PackageTable";
import DiscountTable from "./DiscountTable";
import DocumentTable from "./DocumentTable";
import SingleHolderTable from "../quotation-form/SingleHolderTable";

import {
  categories,
  subCategories,
  insuranceFunds,
  countries,
  mockingOptions,
  timeOptions,
  prefix
} from "../mocking/mocking";

export default function QuotationsEditV2() {
  const getYearRange = startYear => {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };
  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [carrierStartDate, setCarrierStartDate] = useState(new Date());
  const [carrierEndDate, setCarrierEndDate] = useState(new Date());
  const [categoryValue, setCategoryValue] = useState(categories[0]);
  const [subCategory, setSubcategory] = useState(subCategories[1]);
  const [subCategoryValue, setSubcategoryValue] = useState(subCategory[0]);
  const [isMale, setIsMale] = useState(true);
  const [isMaried, setIsMaried] = useState(true);
  const [isDefineTime, setIsDefineTime] = useState(true);
  const [isSingleHolder, setIsSingleHolder] = useState(true);
  const [isPerson, setIsPerson] = useState(true);
  const [isIDCard, setIsIDCard] = useState(true);
  const years = getYearRange(1990);
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม"
  ];
  useEffect(() => {
    return () => {
      console.log("clean up.");
    };
  }, []);

  function onCategoriesChange(selected) {
    setSubcategory(subCategories[selected.value]);
    setCategoryValue(selected);
    setSubcategoryValue(subCategories[selected.value][0]);
  }

  function onSubcategoriesChange(selected) {
    setSubcategoryValue(selected);
  }

  return (
    <div className="quotation-form">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">{"แก้ใขใบเสนอราคา"}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {"สร้างใบเสนอราคา"}
          </li>
        </ol>
      </nav>

      <div className="quotation-topic">
        <h1 className="">{"แก้ใขใบเสนอราคา"}</h1>
      </div>

      <form id="quotation-form">
        <div className="form-row justify-content-end">
          <div className="form-group col-md-2">
            <label htmlFor="version">{"เวอร์ชั่น"}</label>
            <input
              readOnly={true}
              type="text"
              className="form-control"
              id="version"
              value="v1.0"
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="quotationNo">{"เลขที่ใบเสนอราคา"}</label>
            <input
              readOnly={true}
              type="text"
              className="form-control"
              id="quotationNo"
              value="000001"
            />
          </div>
        </div>

        {/* Hidden-Session Start */}

        {/* <div className="quotation-subtopic">
          <h4>{"ข้อมูลผู้ถือกรมธรรม์"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="px-0 col-md-12">{"ผู้ถือกรมธรรม์"}</label>
            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => setIsSingleHolder(true)}
                type="radio"
                name="holder"
                checked={isSingleHolder}
              />
              <div className="state p-primary-o">
                <label>{"เดี่ยว"}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve">
              <input
                onClick={() => setIsSingleHolder(false)}
                type="radio"
                name="holder"
              />
              <div className="state p-primary-o">
                <label>{"มากกว่าหนึ่ง"}</label>
              </div>
            </div>
          </div>
        </div>

        

        {isSingleHolder ? (
          <>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label className="px-0 col-md-12">
                  {"ประเภทผู้ถือกรมธรรม์"}
                </label>
                <div className="pretty p-default p-curve mb-1">
                  <input
                    onClick={() => setIsPerson(true)}
                    type="radio"
                    name="holderType"
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
                    name="holderType"
                  />
                  <div className="state p-primary-o">
                    <label>{"นิติบุคคล"}</label>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="customerCode">{"รหัสลูกค้า"}</label>
                <input type="text" className="form-control" id="customerCode" />
              </div>

              <div className="form-group col-md-2">
                <button class="btn btn-secondary mt-4" type="button">
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
                      <input type="text" className="form-control" id="cardId" />
                    </div>
                  ) : (
                    <div className="form-group col-md-2">
                      <label htmlFor="passport">{"เลขหนังสือเดินทาง"}</label>
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
                  <label htmlFor="taxId">{"เลขบัตรประจำตัวผู้เสียภาษี"}</label>
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
                <input type="text" className="form-control" id="firstname" />
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
                <button class="btn btn-secondary mt-4" type="button">
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
                <Select placeholder={"เลือกจังหวัด"} options={mockingOptions} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="district">{"อำเภอ"}</label>
                <Select placeholder={"เลือกอำเภอ"} options={mockingOptions} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="subdistrict">{"ตำบล"}</label>
                <Select placeholder={"เลือกตำบล"} options={mockingOptions} />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="zipcode">{"รหัสไปร์ษณีย์"}</label>
                <input type="text" className="form-control" id="zipcode" />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="telephone">{"เบอร์โทรศัพท์"}</label>
                <input type="text" className="form-control" id="telephone" />
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
                <label htmlFor="email">{"อีเมล"}</label>
                <input type="text" className="form-control" id="email" />
              </div>
            </div>
          </>
        ) : (
          <SingleHolderTable />
        )}

         */}

        {/* Hidden-Session End */}

        <div className="quotation-subtopic">
          <h4>{"ข้อมูลการขนส่ง"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label className="px-0 col-md-12">{"ประเภท"}</label>
            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => setIsDefineTime(true)}
                type="radio"
                name="trip"
                checked={isDefineTime}
              />
              <div className="state p-primary-o">
                <label>{"แบบกำหนดเวลา"}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve">
              <input
                onClick={() => setIsDefineTime(false)}
                type="radio"
                name="trip"
              />
              <div className="state p-primary-o">
                <label>{"แบบขนส่งเฉพาะเที่ยว"}</label>
              </div>
            </div>
          </div>

          <div className="form-group col-md-2 p-0">
            <label className="px-1 col-md-12" htmlFor="startDate">
              {"วันที่เริ่มความคุ้มครอง"}
            </label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control col-md-12"
            />
          </div>
          <div className="form-group col-md-2 p-0">
            <label className="px-1 col-md-12" for="endDate">
              {"วันที่สิ้นสุดความคุ้มครอง"}
            </label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control col-md-12"
            />
          </div>
          {isDefineTime ? (
            <>
              <div className="form-group col-md-2">
                <label htmlFor="coveragePeriod">{"จำนวนวันที่คุ้มครอง"}</label>
                <input
                  type="text"
                  className="form-control"
                  id="coveragePeriod"
                />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="time">{"เวลา"}</label>
                <Select placeholder={"เลือกเวลา"} options={timeOptions} />
              </div>
            </>
          ) : null}

          <div className="form-group col-md-2">
            <label htmlFor="insuranceFunds">{"ทุนประกัน"}</label>
            <Select placeholder={"เลือกทุนประกัน"} options={insuranceFunds} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="catagories">{"ประเภทสินค้า"}</label>
            <Select
              placeholder={"เลือกประเภทสินค้า"}
              value={categoryValue}
              options={categories}
              onChange={event => onCategoriesChange(event)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="subCatagories">{"ประเภทสินค้าย่อย"}</label>
            <Select
              placeholder={"เลือกประเภทสินค้าย่อย"}
              value={subCategoryValue}
              options={subCategory}
              onChange={event => onSubcategoriesChange(event)}
            />
          </div>

          <div className="form-group col-md-4">
            <label>{"หัวข้อหลัก"}</label>
            <textarea type="text" className="form-control describe" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="carrierType">{"ประเภทการขนส่ง"}</label>
            <Select
              placeholder={"เลือกประเภทการขนส่ง"}
              options={mockingOptions}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="subCarrierType">{"ประเภทการขนส่งย่อย"}</label>
            <Select
              placeholder={"เลือกประเภทการขนส่งย่อย"}
              options={mockingOptions}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="carType">{"ลักษณะรถ"}</label>
            <Select placeholder={"ลักษณะรถ"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="carProvince">{"จังหวัดที่จดทะเบียน"}</label>
            <Select
              placeholder={"จังหวัดที่จดทะเบียน"}
              options={mockingOptions}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="carYear">{"ปีที่จดทะเบียน"}</label>
            <Select placeholder={"ปีที่จดทะเบียน"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="carbrand">{"ยี่ห้อรถ"}</label>
            <Select placeholder={"ยี่ห้อรถ"} options={mockingOptions} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label for="HAirway">{"House Airway Bill"}</label>
            <input type="text" className="form-control" id="HAirway" />
          </div>

          <div className="form-group col-md-2">
            <label for="MAirway">{"Master Airway Bill"}</label>
            <input type="text" className="form-control" id="MAirway" />
          </div>

          <div className="form-group col-md-4">
            <button class="btn btn-secondary mt-4" type="button">
              <div className="d-flex justify-content-lg-center align-items-center">
                <span className="material-icons">
                  <span className="material-icons">search</span>
                </span>
                {" ค้นหาข้อมูลจาก Motor"}
              </div>
            </button>
            {/* <label for="chassis">{"ค้นหาข้อมูลรถยนต์จากเลขตัวถัง"}</label> */}
            {/* <input type="text" className="form-control" id="chassis" /> */}
            {/* <div class="input-group mt-4">
              <input
                type="text"
                class="form-control"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-secondary" type="button">
                  {"ค้นหาข้อมูลรถยนต์จากเลขตัวถัง"}
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="country">{"จาก ประเทศ"}</label>
            <Select placeholder={"เลือกประเทศ"} options={countries} />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="province">{"จังหวัด/เขต"}</label>
            <Select placeholder={"เลือกจังหวัด/เขต"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-2 p-0">
            <label className="px-1 col-md-12" htmlFor="carrierStartDate">
              {"วันที่เริ่มเดินทาง"}
            </label>
            <DatePicker
              selected={carrierStartDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={carrierStartDate}
              endDate={carrierEndDate}
              className="form-control col-md-12"
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="country">{"ถึง ประเทศ"}</label>
            <Select placeholder={"เลือกประเทศ"} options={countries} />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="province">{"จังหวัด/เขต"}</label>
            <Select placeholder={"เลือกจังหวัด/เขต"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-2 p-0">
            <label className="px-1 col-md-12" htmlFor="carrierEndDate">
              {"วันที่สิ้นสุดเดินทาง"}
            </label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control col-md-12"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label for="plateNo">{"เลขทะเบียนรถพ่วง"}</label>
            <input type="text" className="form-control" id="plateNo" />
          </div>

          <div className="form-group col-md-2">
            <label for="engineNo">{"เลขตัวถังรถพ่วง"}</label>
            <input type="text" className="form-control" id="engineNo" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label for="deductible">{"ค่าความเสียหายส่วนแรก"}</label>
            <input type="text" className="form-control" id="deductible" />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"แพ็คเกจ"}</h4>
        </div>

        {/* <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="package">{"แพ็คเกจ"}</label>
            <input type="text" className="form-control" id="packageName" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="package">{"รายละเอียด"}</label>
            <input type="text" className="form-control" id="packageDescript" />
          </div>

          <div className="form-group col-md-2">
            <button className="button button-viriyah mt-4">
              {"เลือกแพ็คเกจ"}
            </button>
          </div>
        </div> */}

        <div className="form-row">
          <div className="col-md-12">
            <PackageTable />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"ส่วนลดพิเศษ"}</h4>
        </div>
        <div className="form-row">
          <div className="col-md-12">
            <DiscountTable />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"เบี้ยประกันภัย"}</h4>
        </div>
        <div className="form-row d-flex">
          <div className="form-group col-md-2">
            <label for="chassis">{"อัตราเบี้ยประกันภัย"}</label>
            <input type="text" className="form-control" id="chassis" />
          </div>

          <div className="form-group col-md-2">
            <label for="chassis">{"เบี้ยประกันภัย"}</label>
            <input type="text" className="form-control" id="chassis" />
          </div>

          <div className="form-group col-md-2">
            <label for="chassis">{"อากร"}</label>
            <input type="text" className="form-control" id="chassis" />
          </div>

          <div className="form-group col-md-2">
            <label for="chassis">{"ภาษี"}</label>
            <input type="text" className="form-control" id="chassis" />
          </div>

          <div className="form-group col-md-2">
            <label for="chassis">{"เบี้ยประกันรวม"}</label>
            <input type="text" className="form-control" id="chassis" />
          </div>

          <div className="form-group col-md-2">
            <button class="btn btn-secondary mt-4" type="button">
              <div className="d-flex justify-content-lg-center align-items-center">
                <span className="material-icons">
                  <span className="material-icons">calculate</span>
                </span>
                {" คำนวณเบี้ยประกัน"}
              </div>
            </button>
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"แหล่งอ้างอิง"}</h4>
        </div>
        <div className="form-row">
          <div className="col-md-12">
            <DocumentTable />
          </div>
        </div>

        {/* Mocking-Session Start */}

        <div className="quotation-subtopic">
          <h4>{"ข้อมูลผู้ถือกรมธรรม์"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="prefix">{"คำนำหน้าชื่อ"}</label>
            <Select placeholder={"คำนำหน้าชื่อ"} options={prefix} />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="firstname">{"ชื่อ"}</label>
            <input type="text" className="form-control" id="firstname" />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="lastname">{"นามสกุล"}</label>
            <input type="text" className="form-control" id="lastname" />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="telephone">{"เบอร์โทรศัพท์"}</label>
            <input type="text" className="form-control" id="telephone" />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="email">{"อีเมล"}</label>
            <input type="text" className="form-control" id="email" />
          </div>
        </div>

        {/* Mocking-Session End */}

        <div className="form-row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-6 col-md-2">
            <button type="submit" className="button button-viriyah w-140px">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">
                  <span className="material-icons">visibility</span>
                </span>
                <span className="ml-1">{"ขอดูใบเสนอราคา"}</span>
              </div>
            </button>
          </div>
          <div className="col-6 col-md-2">
            <button className="button button-viriyah w-140px">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">print</span>
                <span className="ml-1">{"พิมพ์ใบเสนอราคา"}</span>
              </div>
            </button>
          </div>
          <div className="col-6 col-md-2">
            <button className="button button-viriyah w-140px">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">restore_page</span>
                <span className="ml-1">{"รีเซ็ต"}</span>
              </div>
            </button>
          </div>
          <div className="col-6 col-md-2">
            <button className="button button-viriyah w-140px">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">receipt</span>
                <span className="ml-1">{"ขอซื้อกรมธรรม์"}</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
