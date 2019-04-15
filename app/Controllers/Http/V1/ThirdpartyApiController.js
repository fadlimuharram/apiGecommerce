"use strict";
const Env = use("Env");
const axios = require("axios");
const { parse, stringify } = require("flatted/cjs");

class ThirdpartyApiController {
  async getProvince({ response }) {
    return axios
      .get(Env.get("RAJAONGKIR_URL") + "province", {
        headers: {
          key: Env.get("RAJAONGKIR_API_KEY")
        }
      })
      .then(res => {
        return response.json({ data: res.data });
      })
      .catch(e => {
        console.log("err", e);
      });
  }

  async getCity({ response, params }) {
    return axios
      .get(Env.get("RAJAONGKIR_URL") + "city?province=" + params.id, {
        headers: {
          key: Env.get("RAJAONGKIR_API_KEY")
        }
      })
      .then(res => {
        return response.json({ data: res.data });
      })
      .catch(e => {
        console.log("err", e);
      });
  }

  // async getPrice({ response, params }){

  // }
}

module.exports = ThirdpartyApiController;
