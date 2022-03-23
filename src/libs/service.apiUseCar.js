const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getUseCarService = async function (params) {
  try {
    const type_code = params.type_code;
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_USECAR.URL}?type_code=${type_code}`
    });
    //Remove prop_code column
    for(const result of response.data){
        delete result.type_code;
        console.log("Result Remove : ",result)
    }
    const useCarlist = response.data;
   //Change key name (use_detail --> label) and value name (use_code --> value) in propertyList
   const output = useCarlist.map(s => {
    if (s.hasOwnProperty("use_code") || s.hasOwnProperty("use_detail")) {
      s.value = s.use_code;
      s.label = s.use_detail;
      delete s.use_code;
      delete s.use_detail;
    }
    return s;
  })
    console.log("Use Car List : ",useCarlist);
    
    return useCarlist;
  } catch (error) { 
    throw new Error(error);
  }
};
export default getUseCarService;
