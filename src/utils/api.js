import Axios from "axios";
export default class Api {
  backendURL = "https://ebpf.benro.dev";
  constructor(token) {
    this.jwt = token;
  }
  async signup(signupData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/auth/login`,
        data: signupData,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 400) {
        return "err";
      }
      return err.response.data;
    }
  }
  async verify(OTPData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/auth/verify`,
        data: OTPData,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 400) {
        return "err";
      }
      return err.response.data;
    }
  }
}