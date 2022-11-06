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
      if (resp.status === 204) {
        const response = { status: true, alreadySent: true };
        return response;
      } else return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 204) {
        const response = { status: true, alreadySent: true };
        return response;
      }
      if (err.response.status === 500 || err.response.status === 401) {
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
  async addEvent(eventData) {
    try {
      const resp = await Axios({
        method: "post",
        url: this.backendURL + `/org/event`,
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
        data: eventData,
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
  async getEvent(eventData) {
    try {
      const resp = await Axios({
        method: "get",
        url: this.backendURL + `/org/event`,
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        return "err";
      }
      if (err.response.status === 500 || err.response.status === 401) {
        return "err";
      }
      return err.response.data;
    }
  }
}
