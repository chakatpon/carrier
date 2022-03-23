import React, { useState } from "react";
import MaterialTable from "material-table";

export default function DocumentTable() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    {
      title: "ชื่อแหล่งอ้างอิง",
      field: "docName"
    },
    {
      title: "ประเภทเอกสาร",
      field: "docType",
      initialEditValue: "initial edit value"
    },
    {
      title: "เลขที่เอกสาร",
      field: "docNo",
      type: "numeric"
    }
  ]);

  const [data, setData] = useState([
    { docName: "MockingA", docType: "TypeA", docNo: 1111 },
    { docName: "MockingB", docType: "TypeB", docNo: 2222 }
  ]);

  return (
    <MaterialTable
      title=""
      columns={columns}
      data={data}
      options={{
        tableLayout: "auto",
        actionsColumnIndex: -1,
        paginationPosition: "top",
        search: false,
        paging: false,
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
      onRowClick={() => console.log("Row has clicked .")}
      editable={{
        // onRowAdd: newData =>
        //   new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       setData([...data, newData]);

        //       resolve();
        //     }, 1000);
        //   }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
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
    />
  );
}
