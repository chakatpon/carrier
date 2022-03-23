import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function TestTable() {
  useEffect(() => {
    return () => {
      console.log("clean up");
    };
  }, []);

  const initialData = [
    {
      coverage: "ความคุ้มครอง A",
      condition: "เงื่อนไข A",
      amount: 2400,
      premiumRate: 6,
      premium: 40000
    }
  ];
  const [data, setData] = useState(initialData);

  const addColumn = () => {
    const newColumn = {
      coverage: "ความคุ้มครอง B",
      condition: "เงื่อนไข B",
      amount: 4800,
      premiumRate: 6,
      premium: 80000
    };
    setData(state => [...state, newColumn]);
  };

  const editColumn = () => {
    console.log("edit Column.");
  };

  const removeColumn = () => {
    console.log("remove column.");
  };

  return (
    <div style={{ width: "100%" }}>
      <MaterialTable
        columns={[
          { title: "ความคุ้มครอง", field: "coverage", type: "string" },
          { title: "เงื่อนไข", field: "condition" },
          {
            title: "จำนวนเงินความคุ้มครอง",
            field: "amount",
            type: "numeric"
          },
          {
            title: "อัตราเบี้ย(%)",
            field: "premiumRate",
            type: "numeric"
          },
          {
            title: "ค่าเบี้ย",
            field: "premium",
            type: "numeric"
          }
        ]}
        data={data}
        title="แพ็คเกจ"
      />
      <button className="btn btn-success" onClick={addColumn}>
        {"เพิ่ม"}
      </button>
      <button className="btn btn-warning" onClick={editColumn}>
        {"แก้ไข"}
      </button>
      <button className="btn btn-danger" onClick={removeColumn}>
        {"ลบ"}
      </button>
    </div>
  );
}
