import React, { useState } from "react";
import MaterialTable from "material-table";

export default function DiscountTable(discount) {
  const { useState } = React;
  const discountData= () =>
  {
    if(discount.discount!=null)
      {
        const arrayDiscountList = discount.discount;
        for(const dd of arrayDiscountList){
          dd["minMax"] = dd.minPer+"-"+dd.maxPer;
          dd = arrayDiscountList;
        }
        const keyValueDiscount = arrayDiscountList.map(arrayDiscountList => [arrayDiscountList.discount_code, arrayDiscountList]);
        const newDiscount = new Map(keyValueDiscount);
        for(const addDiscount of data)
          {
            addDiscount.minMax =(newDiscount.get(addDiscount.discount_code).minMax);
          
            
          }
      }
      return  data;
  }
  const [columns, setColumns] = useState([
    {
      title: "ลำดับ",
      field: "order",
      type: "numeric",
      width: 120
    },
    {
      title: "ส่วนลดพิเศษ",
      field: "discount",
      initialEditValue: "-"
    },
    {
      title: "รายละเอียด",
      field: "descript",
      initialEditValue: "-"
    },
    {
      title: "เปอร์เซ็นต์",
      field: "percentage",
      type: "numeric"
    },
    {
      title: "อัตราขั้นต่ำ - สูงสุด",
      field: "minMax"
    }
  ]);

  const [data, setData] = useState([
    {
      discount_code:"0001",
      order: 1,
      discount: "0001",
      descript: "ส่วนลดประวัติดีรถยนต์คันที่เอาประกันภัย (L/Rรถยนต์ ไม่เกิน 60% )",
      percentage: 0,
      minMax: "0-9"
    },
    {
      discount_code:"0002",
      order: 2,
      discount: "0002",
      descript: "ส่วนลด GPS",
      //percentage: <input type="text" className="perDiscount"/>,
      percentage: 0,
      minMax: "9-99"
    },
    {
      discount_code:"0003",
      order: 3,
      discount: "0003",
      descript: "ส่วนลดประกันกลุ่มตามเกณฑ์  สำหรับรถกลุ่มตั้งแต่ 10 คันขึ้นไป",
      percentage: 0,
      minMax: "99-999"
    },
    {
      discount_code:"0004",
      order: 4,
      discount: "0004",
      descript: "ส่วนลดกรณีรถมีประกันภัยภาคสมัครใจกับบริษัทฯ",
      percentage: 0,
      minMax: "99-999"
    },
    {
      discount_code:"0005",
      order: 5,
      discount: "0005",
      descript: "ส่วนลดรถบรรทุก 4 ล้อ,6 ล้อ,10 ล้อที่มีลักษณะเป็นตู้ทึบ (ตู้เย็น)",
      percentage: 0,
      minMax: "99-999"
    },
    {
      discount_code:"0006",
      order: 6,
      discount: "0006",
      descript: "ส่วนลดแรกเข้า",
      percentage: 0,
      minMax: "99-999"
    },
    {
      discount_code:"0007",
      order: 7,
      discount: "0007",
      descript: "ส่วนลดประกันกลุ่มตามเกณฑ์  สำหรับรถกลุ่มตั้งแต่ 3-10 คัน",
      percentage: 0,
      minMax: "99-999"
    },
    {
      discount_code:"0008",
      order: 8,
      discount: "0008",
      descript: "ส่วนลดรถบรรทุก 4 ล้อ,6 ล้อ,10 ล้อที่มีลักษณะเป็นตู้ทึบ (ตู้แห้ง)",
      percentage: 0,
      minMax: "99-999"
    },
    {
      discount_code:"0009",
      order: 9,
      discount: "0009",
      descript: "ส่วนลด Q Mark",
      percentage: 0,
      minMax: "99-999"
    }
  ]);

  return (
    <MaterialTable
      toolbar={true}
      columns={columns}
      data={discountData()}
      options={{
        tableLayout: "auto",
        actionsColumnIndex: -1,
        paginationPosition: "top",
        search: false,
        paging: false,
        showTitle: false,
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
  );
}
