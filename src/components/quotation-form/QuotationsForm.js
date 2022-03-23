import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

import {
  categories,
  subCategories,
  insuranceFunds,
  countries,
  packages,
  mockingOptions
} from "./mocking";

export default function QuotationsForm() {
  const getYearRange = startYear => {
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    // console.log("years : ", years);
    return years;
  };
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));
  const [carrierStartDate, setCarrierStartDate] = useState(
    new Date("2014/02/08")
  );
  const [carrierEndDate, setCarrierEndDate] = useState(new Date("2014/02/10"));
  const [categoryValue, setCategoryValue] = useState(categories[0]);
  const [subCategory, setSubcategory] = useState(subCategories[1]);
  const [subCategoryValue, setSubcategoryValue] = useState(subCategory[0]);
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
            <a href="#">{"รายการใบเสนอราคา"}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {"สร้างใบเสนอราคา"}
          </li>
        </ol>
      </nav>
      <div className="quotation-topic">
        <h1 className="">{"สร้างใบเสนอราคา"}</h1>
      </div>

      <form id="quotation-form">
        {/* ---------- ข้อมูลสินค้า ---------- */}
        <div className="quotation-subtopic">
          <h4>{"ข้อมูลสินค้า"}</h4>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="catagories">{"ประเภทสินค้า"}</label>
            <Select
              placeholder={"เลือกประเภทสินค้า"}
              value={categoryValue}
              options={categories}
              onChange={event => onCategoriesChange(event)}
            />
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="subCatagories">{"ประเภทสินค้าย่อย"}</label>
            <Select
              placeholder={"เลือกประเภทสินค้าย่อย"}
              value={subCategoryValue}
              options={subCategory}
              onChange={event => onSubcategoriesChange(event)}
            />
          </div>

          <div className="form-group col-md-6">
            <label>{"หัวข้อหลัก"}</label>
            <textarea type="text" className="form-control describe" />
          </div>
        </div>

        {/* ---------- ข้อมูลการขนส่ง ---------- */}
        <div className="quotation-subtopic">
          <h4>{"ข้อมูลการขนส่ง"}</h4>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label className="px-0 col-md-12">{"ประเภท"}</label>
            <div className="pretty p-default p-curve mb-1">
              <input type="radio" name="trip" checked />
              <div className="state p-primary-o">
                <label>{"แบบกำหนดเวลา"}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve">
              <input type="radio" name="trip" />
              <div className="state p-primary-o">
                <label>{"แบบขนส่งเฉพาะเที่ยว"}</label>
              </div>
            </div>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="insuranceFunds">{"ทุนประกัน"}</label>
            <Select placeholder={"เลือกทุนประกัน"} options={insuranceFunds} />
          </div>

          <div className="form-group col-md-3 p-0">
            <label className="px-1 col-md-12" htmlFor="startDate">
              {"วันที่เพิ่มความคุ้มครอง"}
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
          <div className="form-group col-md-3 p-0">
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
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
            <label className="px-0 col-md-12">{"การขนส่ง"}</label>
            <div className="pretty p-default p-curve mb-1">
              <input type="radio" name="carrier" checked />
              <div className="state p-primary-o">
                <label>{"แบบเดี่ยว"}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve">
              <input type="radio" name="carrier" />
              <div className="state p-primary-o">
                <label>{"แบบ Fleet"}</label>
              </div>
            </div>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="carrierType">{"ประเภทการขนส่ง"}</label>
            <Select
              placeholder={"เลือกประเภทการขนส่ง"}
              options={mockingOptions}
            />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="otherType">{"รูปแบบอื่นๆ"}</label>
            <Select
              placeholder={"เลือกการขนส่งรูปแบบอื่น"}
              options={mockingOptions}
            />
          </div>
        </div>

        {/* ---------- ข้อมูลพาหนะ ---------- */}
        <div className="quotation-subtopic">
          <h4>{"ข้อมูลพาหนะ"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="plateNo">{"เลขทะเบียนรถ"}</label>
            <input type="text" className="form-control" id="plateNo" />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="province">{"จังหวัดที่จดทะเบียน"}</label>
            <Select
              placeholder={"จังหวัดที่จดทะเบียน"}
              options={mockingOptions}
            />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="carYear">{"ปีที่จดทะเบียน"}</label>
            <Select placeholder={"ปีที่จดทะเบียน"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="carbrand">{"ยี่ห้อรถ"}</label>
            <Select placeholder={"ยี่ห้อรถ"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-3">
            <label for="engineNo">{"เลขเครื่องยนต์"}</label>
            <input type="text" className="form-control" id="engineNo" />
          </div>

          <div className="form-group col-md-3">
            <label for="chassis">{"เลขตัวถัง"}</label>
            <input type="text" className="form-control" id="chassis" />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"ขนส่ง จาก"}</h4>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="country">{"ประเทศ"}</label>
            <Select placeholder={"เลือกประเทศ"} options={countries} />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="province">{"จังหวัด/เขต"}</label>
            <Select placeholder={"เลือกจังหวัด/เขต"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-3 p-0">
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

          <div className="form-group col-md-3">
            <label className="px-0 col-md-12">{"กรณีพิเศษ"}</label>

            <div class="pretty p-default p-curve">
              <input type="checkbox" />
              <div class="state p-primary-o">
                <label>{"To be declared"}</label>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- ขนส่ง ไปถึง ---------- */}
        <div className="quotation-subtopic">
          <h4>{"ขนส่ง ไปถึง"}</h4>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="country">{"ประเทศ"}</label>
            <Select placeholder={"เลือกประเทศ"} options={countries} />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="province">{"จังหวัด/เขต"}</label>
            <Select placeholder={"เลือกจังหวัด/เขต"} options={mockingOptions} />
          </div>

          <div className="form-group col-md-3 p-0">
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

          <div className="form-group col-md-3">
            <label className="px-0 col-md-12">{"กรณีพิเศษ"}</label>

            <div class="pretty p-default p-curve">
              <input type="checkbox" />
              <div class="state p-primary-o">
                <label>{"To be declared"}</label>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- โปรโมชั่น ---------- */}
        <div className="quotation-subtopic">
          <h4>{"โปรโมชั่น"}</h4>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
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

          <div className="form-group col-md-3">
            <label htmlFor="package">{"ส่วนลดพิเศษ"}</label>
            <div>
              <button type="button" className="btn btn-success mr-2">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="material-icons">add_shopping_cart</span>
                  <span className="ml-1">{"เพิ่ม"}</span>
                </div>
              </button>
              <button type="button" className="btn btn-warning mr-2">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="material-icons">edit</span>
                  <span className="ml-1">{"แก้ไข"}</span>
                </div>
              </button>
              <button type="button" className="btn btn-danger mr-2">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="material-icons">delete_forever</span>
                  <span className="ml-1">{"ลบ"}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ---------- เบี้ยประกันภัย ---------- */}
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
        </div>

        <div className="form-row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-md-3">
            <button type="submit" className="button button-viriyah w-60">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">
                  <span className="material-icons">visibility</span>
                </span>
                <span className="ml-1">{"ขอดูใบเสนอราคา"}</span>
              </div>
            </button>
          </div>
          <div className="col-md-3">
            <button className="button button-viriyah w-60">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">print</span>
                <span className="ml-1">{"พิมพ์ใบเสนอราคา"}</span>
              </div>
            </button>
          </div>
          <div className="col-md-3">
            <button className="button button-viriyah w-60">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">restore_page</span>
                <span className="ml-1">{"รีเซ็ต"}</span>
              </div>
            </button>
          </div>
          <div className="col-md-3">
            <button className="button button-viriyah w-60">
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
