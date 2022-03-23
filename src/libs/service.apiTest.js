const axios = require("axios");

const apiTestService = async function (params) {
  try {
    const response = await axios(params);

    // Transform response to easy-to-use structure
    // - easier to change and test later
    // - no copy-pasted transformation code everywhere
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiTestService;
