import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";

export default function PackageTable(coverage) {
  useEffect(() => {
    console.log("Table");
    return () => {
      console.log("clean up.");
    };
  }, []);
 // console.log("coverage1 : ",coverage)
  const setTest2 = () =>
  {

      //console.log('setTest2 data',data);
     //console.log('setTest2 coverage',coverage);
      //console.log('setTest2 coverage.coverageList',coverage.coverage);
       if(coverage.coverage!=null)
       {
          //console.log('setTest2 coverage.coverageList =',coverage.coverage);

          const arrayCoverageList = coverage.coverage;
          const keyValueCoverage = arrayCoverageList.map(arrayCoverageList => [arrayCoverageList.crLiabilityCode, arrayCoverageList]);
          const newCoverage = new Map(keyValueCoverage);

         // console.log('setTest222 newCoverage  =', newCoverage);
         // console.log('setTest2 newCoverage L001 =', (newCoverage.get("L001")));
          //console.log('setTest2 newCoverage L001  minSI=', (newCoverage.get("L001")).minSI);
          for(const tp of data)
          {
            //console.log('tp.crLiabilityCode=', tp.crLiabilityCode);
            
            
            tp.coverageAmount =((newCoverage.get(tp.crLiabilityCode)).minSI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
            if(tp.coverageAmount!=0 && tp.coverageAmount!=""){
           // console.log('tp.crLiabilityCode=',tp.crLiabilityCode);
           // console.log('tp.coverageAmount=',tp.coverageAmount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
           // console.log('(newCoverage.get(tp.crLiabilityCode)).minSI=',(newCoverage.get(tp.crLiabilityCode)).minSI.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
            }else{
              tp.coverageAmount = "-";
              tp.condition = "ไม่คุ้มครอง";
           //   console.log('tp.crLiabilityCode=',tp.crLiabilityCode);
           //   console.log('tp.coverageAmount=',tp.coverageAmount);
           //   console.log('(newCoverage.get(tp.crLiabilityCode)).minSI=',(newCoverage.get(tp.crLiabilityCode)).minSI);


            }
            
          }
    
       }

      return  data;
  }

 
  const [columns, setColumns] = useState([
    {
      title: "ความคุ้มครอง",
      field: "coverage"
    },
    {
      title: "เงื่อนไข",
      field: "condition"
    },
    {
      title: "จำนวนเงินตามความคุ้มครอง",
      field: "coverageAmount"
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
  ]);

  const [data, setData] = useState([
    {
      crLiabilityCode : "L001",
      coverage: "จำนวนเงินจำกัดความรับผิดรวม",
      condition: "คุ้มครอง",
      coverageAmount: "200,000",
      premiumRate: 0.135,
      premium: 1350
    },
    {
      crLiabilityCode : "L002",
      coverage: "จำนวนเงินจำกัดความรับผิดต่อการเรียกร้องต่ออุบัติแต่ละครั้ง",
      condition: "คุ้มครอง",
      coverageAmount: "200,000",
      premiumRate: 0,
      premium: 0
    },
    {
      crLiabilityCode : "L003",
      coverage: "จำนวนเงินจำกัดความรับผิดต่อหนึ่งยานพาหนะ",
      condition: "คุ้มครอง",
      coverageAmount: "200,000",
      premiumRate: 0,
      premium: 0
    },
    {
      crLiabilityCode : "L004",
      coverage:
        "จำนวนเงินจำกัดความรับผิดเพื่อการส่งมอบชักช้าต่อการเรียกร้องหรือต่ออุบัติเหตุแต่ละครั้งและต่อหนึ่งยานพาหนะ",
      condition: "ไม่คุ้มครอง",
      coverageAmount: "200,000",
      premiumRate: 0,
      premium: 0
    }
  ]);
 
 
  return (
    <MaterialTable
      title=""
      columns={columns}
      data={setTest2()}
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
          textAlign:'"left","left","right","right","right"',
          fontSize: "1rem",
          whiteSpace: "nowrap"

          
         
        }
      }}
      
    />
  );
}
