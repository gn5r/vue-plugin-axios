const axiosBase = require("axios");

let axios;

function createInstance(options = undefined) {
  const axios = axiosBase.create({});
}
