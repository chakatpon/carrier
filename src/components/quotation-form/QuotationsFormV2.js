import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import Select from "react-select";
import { useForm, Controller, get } from "react-hook-form";
import Swal from "sweetalert2";

import PackageTable from "./PackageTable";
import DiscountTable from "./DiscountTable";
import getPremiumService from "../../libs/service.getPremium";
import getPropertyService from "../../libs/service.getProperty";
import getPackageService from "../../libs/service.getPackage";
import getCoverageService from "../../libs/service.getCoverage";
import getDiscountService from "../../libs/service.apiDiscount";
import getCountryService from "../../libs/service.apiCountry";
import getProvinceService from "../../libs/service.apiProvince";
import getCarTypeService from "../../libs/service.apiCarType";
import getUseCarService from "../../libs/service.apiUseCar";
import getCarNameService from "../../libs/service.apiCarName";
import getPreNameService from "../../libs/service.apiPreName";
import getMotorInfoService from "../../libs/service.apiMotorInfo";


import {
  grps,
  subGRPsCatagories,
  suminsureds,
  countries,
  mockingOptions,
  timeOptions,
  prefix,
  vmiInfoGroups,
  cmiInfoGroups,
  holderTypes
} from "../mocking/mocking";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "400px"
  }
};

export default function QuotationsFormV2() {
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
  const [grp, setGRP] = useState();
  const [subGRPs, setSubGRPs] = useState(subGRPsCatagories[1]);
  const [subGRP, setSubGRP] = useState();
  const [suminsured, setSuminsured] = useState();
  const [isMale, setIsMale] = useState(true);
  const [isDefineTime, setIsDefineTime] = useState(true);
  const [isDistrict, setIsDistrict] = useState(true);
  const [holderType, setHolderType] = useState(holderTypes[0]);
  const [policyPurchase, setPolicyPurchase] = useState(false);
  const [propertyList, setPropertyList] = useState([])
  const [packageList, setPackageList] = useState([])
  const [coverageList, setCoverageList] = useState([])
  const [discountList, setDiscountList] = useState([])
  const [time, setTime] = useState(timeOptions[0])
  const [cartype, setCarTypeList] = useState([])
  const [useOfCar, setUseCarList] = useState([])
  const [listProvince, setListProvince] = useState([]);
  const [listCountry, setListCountry] = useState([]);
  const [carNameList, setCarNameList] = useState([]);
  const [prenameList, setPreNameList] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({label: "????????????????????????????????????????????????????????????????????????", value: 0, key: 0})
  const [provinceRegister, setProvinceRegister] = useState([]); //select CarProvince
  const [prefix, setPrefix] = useState([]); //select Prefix

  //const [provinceRegister2, setProvinceRegister2] = useState(provinceRegister[0]);

  useEffect(() => {
    getProperty()
    getCountry()
    getProvince()
    getCarName()
    onChangeDate(startDate)
    getPreName()
    onGRPsChange()
    return () => {
      console.log("clean up.");
    };
  }, []);

  function numberWithCommas(num) {
    var x = num.toFixed(2);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function onGRPsChange(selected) {
    if(selected==null || selected==undefined){
      selected={ value: "1", label: "?????????????????????????????????????????????????????????????????????????????? 1" }
    }
    setGRP(selected);
    setSubGRPs(subGRPsCatagories[selected.value]);
    setSubGRP(subGRPsCatagories[selected.value]);
    onSubGRPsChange(subGRPsCatagories[selected.value][0]);
    setSuminsured({ value: "", label: "??????????????????????????????????????????" })
  }


  function onTimeChange(selected) {
    setTime(selected)
  }
  function onChangeToCountry(from_country) {
    if (from_country != "764") {
      document.getElementById('to_Country').style.display = "none";
    } else {
      document.getElementById('to_Country').style.display = "inline";
    }
  }

  function onChangeFromCountry(to_country) {
    if (to_country != "764") {
      document.getElementById('from_Country').style.display = "none";
    } else {
      document.getElementById('from_Country').style.display = "inline";
    }
  }


  //Display data from onGRPsChange()
  function onSubGRPsChange(selected) {
    document.getElementById("describe").value = selected.label + " ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????";
    setSubGRP(selected);
    
  }

  const submitForm = data => {
    // do something when submit success.
  };

  //onChangeDate() => set StartDate and EndDate
  const onChangeDate = async (startDate) => {
    const settingDate = new Date(startDate)
    settingDate.setDate(settingDate.getDate() + 365);
    setEndDate(settingDate);
    //Count Day from startDate - endDate
    const startDay = startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-');
    const endDay = settingDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].split('-');
    var startCal = new Date(startDay[0], startDay[1] - 1, startDay[2]);
    var endCal = new Date(endDay[0], endDay[1] - 1, endDay[2]);
    const daysDiff = (endCal - startCal) / 86400000;
    setStartDate(startDate)
    document.getElementById("coveragePeriod").value = daysDiff;


  }


  const getPremium = async () => {
    if (grp && suminsured) {
      try {
        const param = { grp: grp, suminsured: suminsured };
        const response = await getPremiumService(param);
        const net = numberWithCommas(response.data.net);
        const stamp = numberWithCommas(response.data.stamp);
        const vat = numberWithCommas(response.data.vat);
        const total = numberWithCommas(response.data.total);

        setValue("net", net);
        setValue("stamp", stamp);
        setValue("vat", vat);
        setValue("total", total);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "??????????????????????????????????????????",
          text: error,
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: "?????????????????????????????????"
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: "?????????????????????????????? ???????????????????????????????????? ????????? ???????????????????????????!",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  };

  //?????????????????? => getDiscount() => received packageCode value from getPackage()
  const getDiscount = async (packageCode) => {
    if (packageCode) {
      try {
        const param = { packageCode: packageCode };
        const response = await getDiscountService(param);
        setDiscountList(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "??????????????????????????????????????????",
          text: error,
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: "?????????????????????????????????"
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: "?????????????????????????????? ???????????????????????????????????? ????????? ???????????????????????????!",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  }

  //???????????????????????????????????? => getCoverage() => received packageCode value from getDiscount() or select in ddl of packageList
  const getCoverage = async (packageCode) => {
    if (packageCode) {
      try {
        const param = { packageCode: packageCode };
        const response = await getCoverageService(param);
        setCoverageList(response);
      } catch { }
    }

  }

  //getPackage => received suminsure value from ddl of suminsured
  const getPackage = async (select_suminsure) => {
    if (grp != null) {

      setSuminsured(select_suminsure)
      const ddlgrp = grp.value;
      const ddlsuminsure = select_suminsure.value;
      if (ddlgrp != "" && ddlsuminsure != "" && startDate != "") {
        try {

          setPackageList([]);
          //change DateTime format
          const dateTimes = startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[0].toString().trim();
          const param = { grp: ddlgrp, suminsured: ddlsuminsure, startDate: dateTimes };
          const response = await getPackageService(param);
          getCoverage(response[0].value)
          getDiscount((response[0].value))
          for (const res of response) {
            setPackageList(state => [res, ...state])
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "??????????????????????????????????????????",
            text: error,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "?????????????????????????????????"
          });
        }
      }
    } else {
      
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: "?????????????????????????????? ????????????????????????????????????",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
      setSuminsured({ value: "", label: "??????????????????????????????????????????" })
    }
  };

  const onChangePackage = async (selected) => {
    
  }

  const onChangeProperty = async (selected) => {
  }
  const onChangeCarType = async (selected) => {

    //getUseCar(selected)
  }

  //getProperty => Types of Transportation
  const getProperty = async () => {

    document.getElementById('carType').style.display = "none";
    document.getElementById('useOfCar').style.display = "none";
    try {

      const response = await getPropertyService();
      setPropertyList(response)
      /*for (const res of response) {
        console.log("Property : ",res)
        setPropertyList(state => [res, ...state])
      }*/
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  };

  const getCarType = async (selected) => {
    console.log("selected get CarType : ",selected)
    const propcode = selected;
    try {
      setCarTypeList([]);
      const param = { propcode: propcode };
      const response = await getCarTypeService(param);
      if (response.length > 0) {
        document.getElementById('carType').style.display = "inline";
        for (const res of response) {
          setCarTypeList(state => [res, ...state])
        }
      } else {

        document.getElementById('carType').style.display = "none";
        document.getElementById('useOfCar').style.display = "none";
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }

  }
  //getCarName() => get car band name
  const getCarName = async () => {
    try {
      const response = await getCarNameService();
      setCarNameList(response)


    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }

  }

  const getPreName = async() => {
    try{
      const prename = await getPreNameService();
      setPreNameList(prename)
    }catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  }


  const getUseCar = async (cartype_code) => {
    const type_code = cartype_code.value;
    try {
      setUseCarList([]);
      const param = { type_code: type_code };
      const response = await getUseCarService(param);
      if (response.length > 0) {
        document.getElementById('useOfCar').style.display = "inline";
        for (const res of response) {
          setUseCarList(state => [res, ...state])
        }
      } else {

        document.getElementById('useOfCar').style.display = "none";

      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  };




  //getCountry => Name of Countries
  const getCountry = async () => {

    try {

      const response = await getCountryService();

      setListCountry(response);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  }
  const getProvince = async () => {

    try {

      const response = await getProvinceService();
      setListProvince(response);
      //Test 22 December 2020
      setProvinceRegister(response)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  };



  /***** MotorModal Section Start *****/

  const [motorModalIsOpen, setMotorModalIsOpen] = useState(false);
  const [isCMI, setIsCMI] = useState(true);
  const [cmiInfo, setCMIInfo] = useState(cmiInfoGroups[0]);
  const [vmiInfo, setVMIInfo] = useState(vmiInfoGroups[0]);
  

  function openMotorModal() {
    setMotorModalIsOpen(true);
  }

  function afterOpenMotorModal() {
    // references are now sync'd and can be accessed.
  }

  function closeMotorModal() {
    var apply = "";
    var licence ="";
    var policyNo ="";
    // console.log("getVMI",vmiInfo.value)
    if(vmiInfo.value  === "??????????????????????????????"){
       apply = document.getElementById("notificationNo").value;
       //setapplyNo_VMI(apply)
       //console.log("14")
      //  console.log("??????????????????????????????????????? : " ,apply)
       getMotorInfo(apply,licence,policyNo)
       setMotorModalIsOpen(false);
       //return apply == null ? "" : apply;
    }else if(vmiInfo.value === "????????????????????????????????????????????????"){
      licence = document.getElementById("plateNo_VMI").value;
       //console.log("15")
       //setlicence_VMI(plateNo_VMI)
      //  console.log("????????????????????????????????? : ",licence)
       getMotorInfo(apply,licence,policyNo)
       setMotorModalIsOpen(false);
       //return licence== null ? "" : licence;
    }else if(vmiInfo.value === "?????????????????????????????????"){
      policyNo = document.getElementById("policyNo_VMI").value;
      
       //setpolicyNo_VMI(policyNo)
      //  console.log("?????????????????????????????????????????? : ",policyNo)
       //return policyNo== null ? "" : policyNo;
       getMotorInfo(apply,licence,policyNo)
       setMotorModalIsOpen(false);
    }
    
  }
  function onCMIInfoGroupChange(selected) {
    
    setCMIInfo(selected);
    
    
  }
  const getVMI_Info = async (vmiInfo) => {
    
      
      
      //getMotorInfo(apply,plateNo_VMI,policyNo)
      
      
    
  }
  const getMotorInfo = async (applyNo,licenceNo,policy) => {
    
    try {
      
      const apply = applyNo;
      const licence = licenceNo;
      const policyNo = policy;
      const response = await getMotorInfoService(apply,licence,policyNo);



      //??????????????????????????????????????????
      //console.log("response[0].province_code+response[0].province_desc : ", response[0].province_code+response[0].province_desc)
      const selectedProvince = { value: response[0].province_code, label: response[0].province_desc }
      setSelectedProvince(selectedProvince)
      document.getElementById("plateNo").value = response[0].licence1;
      document.getElementById("engineNo").value = response[0].chassis2;
      document.getElementById("chassis").value = response[0].chassis1;
      

      
      //????????????????????????????????????????????????????????????
      const prefix_select = {value:response[0].prefix_code, label: response[0].prename_desc}
      setPrefix(prefix_select)
      //document.getElementById("cardID").value = response[0].ident_card == null ? "" : response[0].ident_card;
      //console.log("response[0].ident_card",response[0].ident_card)
      document.getElementById("firstname").value = response[0].fname;
      document.getElementById("lastname").value = response[0].lname;
      document.getElementById("telephone").value = response[0].phone_no == null ? "" : response[0].phone_no;
      document.getElementById("email").value = response[0].e_mail == null ? "" : response[0].e_mail;



      //????????????????????????????????????????????????????????????????????????
      document.getElementById("address").value = response[0].home_no == null ? "" : response[0].home_no;
      document.getElementById("building").value = response[0].building == null ? "" : response[0].building;
      document.getElementById("moo").value = response[0].group_no == null ? "" : response[0].group_no;
      document.getElementById("soi").value = response[0].bystreet == null ? "" : response[0].bystreet;
      document.getElementById("street").value = response[0].street == null ? "" : response[0].street;
      document.getElementById("zipcode").value = response[0].postcode == null ? "" : response[0].postcode;
      
      document.getElementById("addressType").value = "????????????";
    

     
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        text: error,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });
    }
  };

  function onVMIInfoGroupChange(selected) {
    // console.log("getVMI",vmiInfo.value)
    setVMIInfo(selected);
    //console.log("SELECTED : ",selected)
    //const notificationNo = document.getElementById("notificationNo").value;
    //console.log("VMI : ",vmiInfo.notificationNo)
  }

  /***** MotorModal Section End *****/

  return (
    <div className="quotation-form">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">{"?????????????????????????????????"}</a>
          </li>
        </ol>
      </nav>

      <div className="quotation-topic">
        <h1 className="">{"?????????????????????????????????"}</h1>
      </div>

      <form id="quotation-form" onSubmit={handleSubmit(submitForm)}>
        <div className="form-row justify-content-end">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="version">{"???????????????????????????"}</label>
            <input
              readOnly={true}
              type="text"
              className="form-control"
              id="version"
              value="v1.0"
            />
          </div>
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="quotationNo">{"????????????????????????????????????????????????"}</label>
            <input
              readOnly={true}
              type="text"
              className="form-control"
              id="quotationNo"
              value="000001"
            />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"??????????????????????????????????????????"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label className="px-0 col-md-12">{"??????????????????"}</label>
            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => setIsDefineTime(true)}
                type="radio"
                name="trip"
                defaultChecked={isDefineTime}
              />
              <div className="state p-primary-o">
                <label>{"????????????????????????????????????"}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve">
              <input
                onClick={() => setIsDefineTime(false)}
                type="radio"
                name="trip"
              />
              <div className="state p-primary-o">
                <label>{"?????????????????????????????????????????????????????????"}</label>
              </div>
            </div>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2 p-0">
            <label className="px-1 col-md-12" htmlFor="startDate">
              {"?????????????????????????????????????????????????????????????????????"}
            </label>
            <DatePicker
              selected={startDate}
              //onChange={date => setStartDate(date)}
              onChange={date => onChangeDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              showMonthDropdown
              showYearDropdown
              className="form-control col-md-12"
            />
          </div>
          <div className="form-group col-sm-6 col-md-6 col-lg-2 p-0">
            <label className="px-1 col-md-12" htmlFor="endDate">
              {"???????????????????????????????????????????????????????????????????????????"}
            </label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showMonthDropdown
              showYearDropdown
              className="form-control col-md-12"
            />
          </div>
          {isDefineTime ? (
            <>
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="coveragePeriod">{"?????????????????????????????????????????????????????????"}</label>
                <input disabled="true"

                  type="text"
                  className={`form-control ${errors.coveragePeriod ? "is-invalid" : ""
                    }`}
                  name="coveragePeriod"
                  id="coveragePeriod"
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="time">{"????????????"}</label>

                <Controller

                  name="time"
                  rules={{ required: false }}
                  control={control}
                  render={({ onChange, onBlur, value, name }) => (
                    <Select
                      name={name}
                      placeholder={"???????????????????????????"}
                      className={`${errors.time ? "select-is-invalid" : ""}`}
                      value={time}
                      options={timeOptions}
                      onChange={select => onTimeChange(select)}
                    />
                  )}
                ></Controller>
              </div>
            </>
          ) : null}
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
          <label className="px-0 col-md-12">{"????????????????????????????????????"}</label>
         
            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => onGRPsChange(grps[0])}
                type="radio"
                name="grps[0].label"
                defaultChecked={isDefineTime}
              />
              <div className="state p-primary-o mb-1">
                <label>{grps[0].label}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => onGRPsChange(grps[1])}
                type="radio"
                name="grps[0].label"
              />
              <div className="state p-primary-o mb-1">
                <label>{grps[1].label}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => onGRPsChange(grps[2])}
                type="radio"
                name="grps[0].label"
              />
              <div className="state p-primary-o mb-1">
                <label>{grps[2].label}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => onGRPsChange(grps[3])}
                type="radio"
                name="grps[0].label"
              />
              <div className="state p-primary-o mb-1">
                <label>{grps[3].label}</label>
              </div>
            </div>

            <div className="pretty p-default p-curve mb-1">
              <input
                onClick={() => onGRPsChange(grps[4])}
                type="radio"
                name="grps[0].label"
              />
              <div className="state p-primary-o mb-1">
                <label>{grps[4].label}</label>
              </div>
            </div>

          </div>
            {/* <Controller
              name="grp"
              rules={{ required: true }}
              control={control}
              render={({ onChange, onBlur, value, name }) => (
                <Select
                  name={name}
                  placeholder={"???????????????????????????????????????????????????"}
                  className={`${errors.grp ? "select-is-invalid" : ""}`}
                  value={grp}
                  options={grps}
                  onChange={select => onGRPsChange(select)}
                // onClick ={select => onGRPsClick(select)}
                />
              )}
            ></Controller> */}
            <div className="form-group col-sm-12 col-md-12 col-lg-10">
            <div className="form-row">
                      <div className="form-group col-sm-8 col-md-8 col-lg-8">
                        <label htmlFor="subGRP">{"????????????????????????????????????????????????"}</label>

                        <Controller
                          name="subGRP"
                          rules={{ required: true }}
                          control={control}
                          render={({ onChange, onBlur, value, name }) => (
                            <Select
                              name
                              placeholder={"???????????????????????????????????????????????????????????????"}
                              className={`${errors.subGRP ? "select-is-invalid" : ""}`}
                              value={subGRP}
                              options={subGRPs}
                              onChange={select => onSubGRPsChange(select)}
                            />
                          )}
                        ></Controller>
                      </div>
                      <div className="form-group col-sm-4 col-md-4 col-lg-2">
                        <label htmlFor="suminsured">{"???????????????????????????"}</label>
                        <Controller
                          name="suminsured"
                          rules={{ required: true }}
                          control={control}
                          render={({ onChange, onBlur, value, name }) => (
                            <Select
                              name={name}
                              value={suminsured}
                              placeholder={"??????????????????????????????????????????"}
                              className={`${errors.suminsured ? "select-is-invalid" : ""}`}
                              options={suminsureds}
                              onChange={select => getPackage(select)}

                            />
                          )}
                        ></Controller>
                      </div>
                      
            </div>
            <div className="form-row">
            <div className="form-group col-sm-12 col-md-12 col-lg-10"></div>
          <div className="form-group col-md-8">
            <label>{"??????????????????????????????"}</label>
            <textarea
            disabled="true"
              type="text"
              name="describe"
              
              id="describe"
              className={`form-control ${errors.describe ? "is-invalid" : ""
                } describe`}

              ref={register({ required: false })}
            />
          </div>
            </div>
            </div>
        </div>

        {/* <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2"></div>
          <div className="form-group col-md-8">
            <label>{"??????????????????????????????"}</label>
            <textarea
            disabled="true"
              type="text"
              name="describe"
              id="describe"
              className={`form-control ${errors.describe ? "is-invalid" : ""
                } describe`}
              ref={register({ required: false })}
            />
          </div>
        </div> */}

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="propertyList">{"??????????????????????????????????????????"}</label>
            <Controller
              name="propertyList"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                name="propertyList"
                placeholder={"?????????????????????????????????????????????????????????"}
                  options={propertyList.map((item1, index) => {
                    return {
                      label: item1.name,
                      value: item1.code,
                      key: index
                    };
                  })}
                  onChange={value => getCarType(value.value)}
                  className="form-control-select"
                />
            )}
            ></Controller>
          </div>

            <div className="form-group col-sm-6 col-md-6 col-lg-2" id="carType" >
              <label htmlFor="carType">{"?????????????????????????????????"}</label>
              <Controller
                name="carType"
                rules={{ required: false }}
                control={control}
                render={({ onChange, onBlur, value, name }) => (
                  <Select
                    placeholder={"????????????????????????????????????????????????"}
                    options={cartype}
                    onChange={(selected) => { getUseCar(selected) }}
                    className={`${errors.carType ? "select-is-invalid" : ""
                      }`}

                  />
                )}
              ></Controller>
            </div>

            <div className="form-group col-sm-6 col-md-6 col-lg-2" id="useOfCar">
              <label htmlFor="useOfCar">{"????????????????????????"}</label>
              <Controller
                name="useOfCar"
                rules={{ required: false }}
                control={control}
                render={props => (
                  <Select
                    placeholder={"???????????????????????????????????????"}
                    options={useOfCar}
                    className={`${errors.carType ? "select-is-invalid" : ""}`}
                    {...props}
                  />
                )}
              ></Controller>
            </div>
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="carBrand">{"????????????????????????"}</label>
            <Controller
              name="carBrand"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  id="carBrand"
                  placeholder={"???????????????????????????????????????"}

                  options={carNameList.map((item1, index) => {
                    return {
                      label: item1.carname_desc,
                      value: item1.carname_desc,
                      key: index
                    };
                  })}
                  className="form-control-select"
                />
              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="plateNo">{"????????????????????????????????????"}</label>
            <input
              type="text"
              className="form-control"
              id="plateNo"
              name="plateNo"
              className={`form-control ${errors.plateNo ? "is-invalid" : ""}`}
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="carProvince">{"?????????????????????????????????????????????????????????"}</label>
            <Controller
              name="carProvince"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  id="car_Province"
                  placeholder={"????????????????????????????????????"}
                  value={selectedProvince}
                  onChange={e => {setSelectedProvince(e)}}
                  options={provinceRegister.map((item1, index) => { 
                    return {
                      label: item1.province_desc,
                      value: item1.province_code,
                      key: index
                    };
                  })}

                  className="form-control-select"
                />
              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="carYear">{"??????????????????????????????????????????"}</label>
            <Controller
              name="carYear"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  placeholder={"?????????????????????????????????????????????????????????"}
                  options={mockingOptions}
                  className={`${errors.carYear ? "select-is-invalid" : ""}`}
                  {...props}
                />
              )}
            ></Controller>
          </div>

          {/* Motor Search Button Start */}
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <button
              className="btn btn-secondary mt-4"
              type="button"
              onClick={openMotorModal}
            >
              <div className="d-flex justify-content-lg-center align-items-center">
                <span className="material-icons">
                  <span className="material-icons">search</span>
                </span>
                {" ?????????????????????????????????????????? Motor"}
              </div>
            </button>
            <Modal
              isOpen={motorModalIsOpen}
              onAfterOpen={afterOpenMotorModal}
              onRequestClose={closeMotorModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="quotation-subtopic">
                <h4>{"?????????????????????????????????????????? Motor"}</h4>
              </div>
              <form className="modal-form">
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label className="px-0 col-md-12">{"??????????????????"}</label>
                    <div className="pretty p-default p-curve mb-1">
                      <input
                        onClick={() => setIsCMI(true)}
                        type="radio"
                        name="motorType"
                        defaultChecked={isCMI}
                      />
                      <div className="state p-primary-o">
                        <label>{"???????????????????????????"}</label>
                      </div>
                    </div>

                    <div className="pretty p-default p-curve">
                      <input
                        onClick={() => setIsCMI(false)}
                        type="radio"
                        name="motorType"
                        defaultChecked={!isCMI}
                      />
                      <div className="state p-primary-o">
                        <label>{"??????????????????????????????"}</label>
                      </div>
                    </div>
                  </div>
                </div>
                {isCMI ? (
                  <React.Fragment>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="cmiGroup">{"???????????????????????????"}</label>
                        <Select
                          id="cmiGroup"
                          placeholder={"?????????????????????????????????"}
                          options={cmiInfoGroups}
                          value={cmiInfo}
                          onChange={select => onCMIInfoGroupChange(select)}
                        />
                      </div>
                    </div>
                    {cmiInfo.value === "????????????????????????????????????????????????" ? (
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="plateNo">{"????????????????????????????????????????????????"}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="plateNo"
                          />
                        </div>
                        <div className="form-group col-md-12">
                          <label htmlFor="province">
                            {"?????????????????????????????????????????????????????????"}
                          </label>
                          <Select
                            placeholder={"????????????????????????????????????????????????????????????????????????"}
                            options={mockingOptions}
                          />
                        </div>
                      </div>
                    ) : cmiInfo.value === "?????????????????????????????????" ? (
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="policyNo">{"?????????????????????????????????"}</label>
                          <input
                            type="text"
                            className="form-control"
                            id="policyNo"
                          />
                        </div>
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="vmiGroup">{"??????????????????????????????"}</label>
                          <Select
                            id="vmiGroup"
                            placeholder={"?????????????????????????????????"}
                            options={vmiInfoGroups}
                            //value={vmiInfo}
                            onChange={select => onVMIInfoGroupChange(select)}
                          />
                        </div>
                      </div>

                      {vmiInfo.value === "????????????????????????????????????????????????" ? (
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="plateNo">{"????????????????????????????????????????????????"}</label>
                            <input
                              type="text"
                              className="form-control"
                              id="plateNo_VMI"
                              
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="province">
                              {"?????????????????????????????????????????????????????????"}
                            </label>
                            <Select
                              placeholder={"????????????????????????????????????????????????????????????????????????"}
                              options={mockingOptions}
                            />
                          </div>
                        </div>
                      ) : vmiInfo.value === "?????????????????????????????????" ? (
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="policyNo">{"?????????????????????????????????"}</label>
                            <input
                              type="text"
                              className="form-control"
                              id="policyNo_VMI"
                              
                            />
                          </div>
                        </div>
                      ) : vmiInfo.value === "??????????????????????????????" ? (
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="notificationNo">{"??????????????????????????????"}</label>
                            <input
                              type="text"
                              className="form-control"
                              id="notificationNo"
                              
                            />
                          </div>
                        </div>
                      ) : null}
                    </React.Fragment>
                  )}
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <button
                      className="btn btn-secondary mt-4"
                      type="button"
                      //onClick={vmiInfo=>closeMotorModal(vmiInfo)}
                      //onChange={select => onGRPsChange(select)}
                      onClick={() => closeMotorModal()}
                    >
                      <div className="d-flex justify-content-lg-center align-items-center">
                        <span className="material-icons">
                          <span className="material-icons">search</span>
                        </span>
                        {" ???????????????"}
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
          {/* Motor Search Button End */}
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="engineNo">{"??????????????????????????????????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.engineNo ? "is-invalid" : ""}`}
              id="engineNo"
              name="engineNo"
              ref={register({ required: false })}
            />
          </div>
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="chassis">{"???????????????????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.chassis ? "is-invalid" : ""}`}
              id="chassis"
              name="chassis"
              ref={register({ required: false })}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="fromCountry">{"????????? ??????????????????"}</label>
            <Controller
              name="fromCountry"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  id="countries"
                  placeholder={"?????????????????????????????????"}
                  options={listCountry.map((item1, index) => {
                    return {
                      label: item1.name,
                      value: item1.code,
                      key: index
                    };
                  })}
                  onChange={value => onChangeFromCountry(value.value)}
                  className="form-control-select"
                />

              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2" id="from_Country">
            <label htmlFor="fromProvince">{"?????????????????????/?????????"}</label>
            <Controller
              name="fromProvince"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  id="fromProvince"
                  placeholder={"????????????????????????????????????"}
                  options={listProvince.map((item1, index) => {
                    return {
                      label: item1.province_desc,
                      value: item1.province_code,
                      key: index
                    };
                  })}

                  className="form-control-select"
                />

              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2 p-0">
            <label className="px-1 col-md-12" htmlFor="carrierStartDate">
              {"??????????????????????????????????????????????????????"}
            </label>
            <DatePicker
              selected={carrierStartDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={carrierStartDate}
              endDate={carrierEndDate}
              showMonthDropdown
              showYearDropdown
              className="form-control col-md-12"
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="toCountry">{"????????? ??????????????????"}</label>
            <Controller
              name="toCountry"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  id="countries"
                  placeholder={"?????????????????????????????????"}
                  options={listCountry.map((item1, index) => {
                    return {
                      label: item1.name,
                      value: item1.code,
                      key: index
                    };
                  })}
                  onChange={value => onChangeToCountry(value.value)}
                  className="form-control-select"
                />

              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2" id="to_Country">
            <label htmlFor="toCountry">{"?????????????????????/?????????"}</label>
            <Controller
              name="toProvince"
              rules={{ required: false }}
              control={control}
              render={props => (
                <Select
                  id="toProvince"
                  placeholder={"????????????????????????????????????"}
                  options={listProvince.map((item1, index) => {
                    return {
                      label: item1.province_desc,
                      value: item1.province_code,
                      key: index
                    };
                  })}

                  className="form-control-select"
                />

              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2 p-0">
            <label className="px-1 col-md-12" htmlFor="carrierEndDate">
              {"????????????????????????????????????????????????????????????"}
            </label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showMonthDropdown
              showYearDropdown
              className="form-control col-md-12"
            />
          </div>
        </div>

        <h4>{"????????????????????????????????????"}</h4>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="plateNo">{"??????????????????????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.trailerPlateNo ? "is-invalid" : ""
                }`}
              id="trailerPlateNo"
              name="trailerPlateNo"
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="engineNo">{"???????????????????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.trailerEngineNo ? "is-invalid" : ""
                }`}
              id="trailerEngineNo"
              name="trailerEngineNo"
              ref={register({ required: false })}
            />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"?????????????????????"}</h4>

        </div>

        <label htmlFor="packageList">{"????????????????????????????????????"}</label>

        <Controller
          name="packageList"
          rules={{ required: true }}
          control={control}
          render={({ onChange, onBlur, value, name }) => (
            <Select
              name
              placeholder={"????????????????????????????????????"}
              className={`${errors.packageList ? "select-is-invalid" : ""}`}
              value={packageList}
              options={packageList}
              defaultValues={packageList}
              onChange={select => getCoverage(select.value)}
            />
          )}
        ></Controller>


        <div className="quotation-subtopic">
          <h4>{"????????????????????????????????????"}</h4>
        </div>
        <div className="form-row">
          <div className="form-group col-sm-12 col-md-12 col-lg-12">
            {(coverageList.length > 1) ? <PackageTable coverage={coverageList}></PackageTable> : <PackageTable></PackageTable>}


          </div>
        </div>










        <div className="quotation-subtopic">
          <h4>{"????????????????????????????????????????????????????????????"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="deduction">{"???????????????????????????????????????????????????????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.deduction ? "is-invalid" : ""}`}
              id="deduction"
              name="deduction"
              ref={register({ required: false })}
            />
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"?????????????????????????????????"}</h4>
        </div>
        <div className="form-row">
          <div className="col-md-12">

            {(discountList.length > 1) ? <DiscountTable discount={discountList}></DiscountTable> : <DiscountTable />}
          </div>
        </div>

        <div className="quotation-subtopic">
          <h4>{"??????????????????????????????????????????"}</h4>
        </div>
        <div className="form-row d-flex">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="premuimRate">{"?????????????????????????????????????????????????????????"}</label>
            <input
              type="text"
              className="form-control"
              id="premiumRate"
              name="premiumRate"
              readOnly
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="premuim">{"??????????????????????????????????????????"}</label>
            <input
              type="text"
              className="form-control"
              id="net"
              name="net"
              readOnly
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="duty">{"????????????"}</label>
            <input
              type="text"
              className="form-control"
              id="stamp"
              name="stamp"
              readOnly
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="tax">{"????????????"}</label>
            <input
              type="text"
              className="form-control"
              id="vat"
              name="vat"
              readOnly
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="totalPremium">{"??????????????????????????????????????????"}</label>
            <input
              type="text"
              className="form-control"
              id="total"
              name="total"
              readOnly
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <button
              type="button"
              onClick={() => getPremium()}
              className="btn btn-secondary mt-4"
            >
              <div className="d-flex justify-content-lg-center align-items-center">
                <span className="material-icons">
                  <span className="material-icons">calculate</span>
                </span>
                {" ????????????????????????????????????????????????"}
              </div>
            </button>
          </div>
        </div>
        <div className="quotation-subtopic">
          <h4>{"????????????????????????????????????????????????????????????"}</h4>
        </div>

        <div className="form-row">
          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="prefix">{"????????????????????????????????????"}</label>
            <span className="required">*</span>
            <Controller
              name="prefix"
              rules={{ required: true }}
              control={control}
              render={props => (
                <Select
                  id="prefix"
                  placeholder={"???????????????????????????????????????????????????"}
                  value={prefix}
                  options={prenameList.map((item1, index) => {
                    return {
                      label: item1.prefix_name,
                      value: item1.prefix_code,
                      key: index
                    };
                  })}

                  className="form-control-select"
                />

              )}
            ></Controller>
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="firstname">{"????????????"}</label>
            <span className="required">*</span>
            <input
              type="text"
              className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
              id="firstname"
              name="firstname"
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="lastname">{"?????????????????????"}</label>
            <span className="required">*</span>
            <input
              type="text"
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
              id="lastname"
              name="lastname"
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="telephone">{"???????????????????????????????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.telephone ? "is-invalid" : ""}`}
              id="telephone"
              name="telephone"
              ref={register({ required: false })}
            />
          </div>

          <div className="form-group col-sm-6 col-md-6 col-lg-2">
            <label htmlFor="email">{"???????????????"}</label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              ref={register({ required: false })}
            />
          </div>
        </div>

        {/* Mocking-Session End */}

        <div className="form-row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-6 col-sm-6 col-md-6 col-lg-2">
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1xr_4BYUsZ5uemkM-6watIMsZal6liP0z/view?usp=sharing"
              type="submit"
              className="button button-viriyah w-140px"
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">
                  <span className="material-icons">visibility</span>
                </span>
                <span className="ml-1">{"??????????????????????????????????????????"}</span>
              </div>
            </a>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-2">
            <button className="button button-viriyah w-140px">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">print</span>
                <span className="ml-1">{"?????????????????????????????????????????????"}</span>
              </div>
            </button>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-2">
            <button className="button button-viriyah w-140px">
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">restore_page</span>
                <span className="ml-1">{"??????????????????"}</span>
              </div>
            </button>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-2">
            <button
              type="button"
              onClick={() => setPolicyPurchase(!policyPurchase)}
              className="button button-viriyah w-140px"
            >
              <div className="d-flex align-items-center justify-content-center">
                <span className="material-icons">receipt</span>
                <span className="ml-1">{"????????????????????????????????????"}</span>
              </div>
            </button>
          </div>
        </div>

        {policyPurchase ? (
          <div className="holder-section">
            <div className="quotation-subtopic">
              <h4>{"????????????????????????????????????????????????????????????????????????"}</h4>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="holderTypes">{"????????????????????????????????????????????????????????????"}</label>
                <Controller
                  name="holderType"
                  rules={{ required: false }}
                  control={control}
                  render={({ onChange, onBlur, value, name }) => (
                    <Select
                      name={name}
                      placeholder={"???????????????????????????????????????????????????????????????????????????"}
                      className={`${errors.holderType ? "select-is-invalid" : ""
                        }`}
                      onChange={select => setHolderType(select)}
                      // value={holderType}
                      options={holderTypes}
                    />
                  )}
                ></Controller>
              </div>
              {holderType.value == "individual" ? (
                <div className="form-group col-sm-6 col-md-6 col-lg-2">
                  <label htmlFor="cardID">{"??????????????????????????????????????????????????????????????????"}</label>
                  <input
                    type="text"
                    name="cardID"
                    id="cardID"
                    className={`form-control ${errors.cardID ? "is-invalid" : ""
                      }`}
                    ref={register({ required: false })}
                  />
                </div>
              ) : holderType.value == "taxPerson" ||
                holderType.value == "juristic" ? (
                    <div className="form-group col-sm-6 col-md-6 col-lg-2">
                      <label htmlFor="taxID">{"??????????????????????????????????????????????????????????????????"}</label>
                      <input
                        type="text"
                        name="taxID"
                        id="taxID"
                        className={`form-control ${errors.taxID ? "is-invalid" : ""
                          }`}
                        ref={register({ required: false })}
                      />
                    </div>
                  ) : holderType.value == "alien" ? (
                    <div className="form-group col-sm-6 col-md-6 col-lg-2">
                      <label htmlFor="docNo">
                        {"??????????????????????????????????????????????????????????????????/????????????????????????????????????????????????????????????"}
                      </label>
                      <input
                        name="docNo"
                        id="docNo"
                        className={`form-control ${errors.docNo ? "is-invalid" : ""
                          }`}
                        ref={register({ required: false })}
                      />
                    </div>
                  ) : null}
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6 col-lg-2 p-0">
                <label className="px-1 col-md-12" htmlFor="birthDate">
                  {"?????????????????????"}
                </label>
                <DatePicker
                  selected={birthDate}
                  onChange={date => setBirthDate(date)}
                  className="form-control col-md-12"
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label className="px-0 col-md-12">{"?????????"}</label>
                <div className="pretty p-default p-curve mb-1">
                  <input
                    onClick={() => setIsMale(true)}
                    type="radio"
                    name="gender"
                    defaultChecked={isMale}
                  />
                  <div className="state p-primary-o">
                    <label>{"?????????"}</label>
                  </div>
                </div>

                <div className="pretty p-default p-curve">
                  <input
                    onClick={() => setIsMale(false)}
                    type="radio"
                    name="gender"
                  />
                  <div className="state p-primary-o">
                    <label>{"?????????????????????"}</label>
                  </div>
                </div>
              </div>

              {/* <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="marriedStatus">{"?????????????????????????????????????????????"}</label>
                <input
                  name="marriedStatus"
                  id="marriedStatus"
                  className={`form-control ${errors.marriedStatus ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div> */}

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="career">{"???????????????"}</label>
                <Controller
                  name="career"
                  rules={{ required: true }}
                  control={control}
                  render={props => (
                    <Select
                      placeholder={"??????????????????????????????"}
                      options={mockingOptions}
                      className={`${errors.career ? "select-is-invalid" : ""}`}
                      {...props}
                    />
                  )}
                ></Controller>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="addressType">{"???????????????????????????????????????"}</label>
                <input
                  type="text"
                  name="addressType"
                  id="addressType"
                  
                  className={`form-control ${errors.addressType ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              
                {/* <Controller
                  name="addressType"
                  rules={{ required: true }}
                  control={control}
                  render={props => (
                    <Select
                      placeholder={"??????????????????????????????????????????????????????"}
                      options={mockingOptions}
                      className={`${errors.addressType ? "select-is-invalid" : ""
                        }`}
                      {...props}
                    />
                  )}
                ></Controller> */}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="address">{"??????????????????????????????"}</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={`form-control ${errors.address ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="building">{"???????????????/????????????????????????"}</label>
                <input
                  type="text"
                  name="building"
                  id="building"
                  className={`form-control ${errors.building ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="moo">{"????????????"}</label>
                <input
                  type="text"
                  name="moo"
                  id="moo"
                  className={`form-control ${errors.moo ? "is-invalid" : ""}`}
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="soi">{"?????????"}</label>
                <input
                  type="text"
                  name="soi"
                  id="soi"
                  className={`form-control ${errors.soi ? "is-invalid" : ""}`}
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="street">{"?????????"}</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className={`form-control ${errors.street ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="subdistrict">{"????????????"}</label>
                {/* <Select placeholder={"???????????????????????????"} options={mockingOptions} /> */}

                <Controller
                  name="subdistrict"
                  rules={{ required: false }}
                  control={control}
                  render={props => (
                    <Select
                      placeholder={"???????????????????????????"}
                      options={mockingOptions}
                      className={`${errors.subdistrict ? "select-is-invalid" : ""
                        }`}
                      {...props}
                    />
                  )}
                ></Controller>
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                {/* <label htmlFor="district">{"???????????????/???????????????????????????"}</label> */}
                <div className="pretty p-default p-curve mb-1">
                  <input
                    onClick={() => setIsDistrict(true)}
                    type="radio"
                    name="districtType"
                    defaultChecked={isDistrict}
                  />
                  <div className="state p-primary-o">
                    <label>{"???????????????"}</label>
                  </div>
                </div>

                <div className="pretty p-default p-curve">
                  <input
                    onClick={() => setIsDistrict(false)}
                    type="radio"
                    name="districtType"
                  />
                  <div className="state p-primary-o">
                    <label>{"???????????????????????????"}</label>
                  </div>
                </div>

                {isDistrict ? (
                  <Controller
                    name="district"
                    rules={{ required: false }}
                    control={control}
                    render={props => (
                      <Select
                        placeholder={"??????????????????????????????"}
                        options={mockingOptions}
                        className={`mt-1 ${errors.district ? "select-is-invalid" : ""
                          }`}
                        {...props}
                      />
                    )}
                  ></Controller>
                ) : (
                    <Controller
                      name="minorDistrict"
                      rules={{ required: false }}
                      control={control}
                      render={props => (
                        <Select
                          placeholder={"??????????????????????????????????????????"}
                          options={mockingOptions}
                          className={`mt-1 ${errors.minorDistrict ? "select-is-invalid" : ""
                            }`}
                          {...props}
                        />
                      )}
                    ></Controller>
                  )}
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="province">{"?????????????????????"}</label>
                {/* <Select placeholder={"????????????????????????????????????"} options={mockingOptions} /> */}
                <Controller
                  name="province"
                  rules={{ required: false }}
                  control={control}
                  render={props => (
                    <Select
                      id="province"
                      placeholder={"????????????????????????????????????"}
                      options={listProvince.map((item1, index) => {
                        return {
                          label: item1.province_desc,
                          value: item1.province_code,
                          key: index
                        };
                      })}
                    />
                  )}
                ></Controller>
              </div>
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="zipcode">{"????????????????????????????????????"}</label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  className={`form-control ${errors.zipcode ? "is-invalid" : ""
                    }`}
                  ref={register({ required: true })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <button type="button" className="btn btn-danger mt-4">
                  <div className="d-flex justify-content-lg-center align-items-center">
                    <span className="material-icons">
                      <span className="material-icons">send</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="telephone">{"???????????????????????????????????????"}</label>
                <input
                  type="text"
                  name="telephone"
                  id="telephone"
                  className={`form-control ${errors.telephone ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div>
              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="fax">{"?????????????????????????????????"}</label>
                <input
                  type="text"
                  name="fax"
                  id="fax"
                  className={`form-control ${errors.fax ? "is-invalid" : ""}`}
                  ref={register({ required: true })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="mobile">{"?????????????????????????????????"}</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={`form-control ${errors.mobile ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div>

              <div className="form-group col-sm-6 col-md-6 col-lg-2">
                <label htmlFor="holderEmail">{"???????????????"}</label>
                <input
                  type="text"
                  name="holderEmail"
                  id="holderEmail"
                  className={`form-control ${errors.holderEmail ? "is-invalid" : ""
                    }`}
                  ref={register({ required: false })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group d-flex align-items-center justify-content-center col-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                <button className="button button-viriyah w-140px">
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="material-icons">save_alt</span>
                    <span className="ml-1">{"????????????????????????????????????"}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
