import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link, withRouter } from "react-router-dom";

function QuotationsTable(props) {
  useEffect(() => {
    return () => {
      console.log("clean up props : ", props);
    };
  }, []);

  const createQuotation = () => {
    props.history.push("/create-quotaion");
  };

  const editQuotation = () => {
    console.log("editQuotation");
    // props.history.push("/edit-quotaion");
  };
  const [columns, setColumns] = useState([
    {
      title: "ลำดับ",
      field: "order",
      type: "numeric",
      width: 80
    },

    {
      title: "เลขที่ใบเสนอราคา",
      field: "quotationNo"
    },
    {
      title: "เลขที่ใบคำขอ",
      field: "documentNo"
    },
    {
      title: "เลขที่หนังสือคุ้มครอง",
      field: "coverageNo"
    },
    {
      title: "เลขที่กรมธรรม์",
      field: "policyNo"
    },
    {
      title: "ประเภทประกันภัย",
      field: "insuranceType"
    },
    {
      title: "ประเภทกรมธรรม์",
      field: "policyType"
    },
    {
      title: "ประเภทการขนส่ง",
      field: "carrierType"
    },
    {
      title: "ชื่อผู้เอาประกัน",
      field: "fullname"
    }
  ]);

  const [data, setData] = useState([
    {
      order: 1,
      fullname: "นาย คนแรก และคนสุดท้าย",
      quotationNo: "000001",
      documentNo: "000001",
      coverageNo: "000001",
      policyNo: "XXXXX/YY/ZZZZZZZ",
      insuranceType: "Motor",
      policyType: "VMI",
      carrierType: "แบบเดี่ยว"
    },
    {
      order: 2,
      fullname: "นาย สดใส ร่าเริง",
      quotationNo: "000002",
      documentNo: "000002",
      coverageNo: "000002",
      policyNo: "XXXXX/YY/ZZZZZZZ",
      insuranceType: "Motor",
      policyType: "VMI",
      carrierType: "แบบเดี่ยว"
    },
    {
      order: 3,
      fullname: "นาย ตากฝน เปียกปอน",
      quotationNo: "000003",
      documentNo: "000003",
      coverageNo: "000003",
      policyNo: "XXXXX/YY/ZZZZZZZ",
      insuranceType: "Motor",
      policyType: "VMI",
      carrierType: "แบบเดี่ยว"
    },
    {
      order: 4,
      fullname: "นาย โดนลบ ถูกลืม",
      quotationNo: "000004",
      documentNo: "000004",
      coverageNo: "000004",
      policyNo: "XXXXX/YY/ZZZZZZZ",
      insuranceType: "Motor",
      policyType: "VMI",
      carrierType: "แบบเดี่ยว"
    }
  ]);

  return (
    <MaterialTable
      title=""
      columns={columns}
      data={data}
      onRowClick={() => editQuotation()}
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
            <MTableToolbar {...props} />
            <div className="d-flex justify-content-end mb-1">
              <button
                onClick={createQuotation}
                className="button button-viriyah"
              >
                {"สอบถามเบี้ย"}
              </button>
            </div>
          </div>
        )
      }}
      options={{
        tableLayout: "auto",
        actionsColumnIndex: -1,
        paginationPosition: "top",
        searchFieldAlignment: "left",
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

export default withRouter(QuotationsTable);
