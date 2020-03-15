import axios from "axios";

let baseUrl = "http://45.32.215.211:3000/";
function post(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${baseUrl}${url}`,
      data: data,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        console.log(err.status);
        reject(err);
      });
  });
  return promise;
}

function get(url) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${baseUrl}${url}`,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
  return promise;
}

function deleteData(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: `${baseUrl}${url}`,
      data: data
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
  return promise;
}

function patchData(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "patch",
      url: `${baseUrl}${url}`,
      data: data
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function putData(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `${baseUrl}${url}`,
      data: data,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
  return promise;
}

function refreshToken() {
  console.log("Va a refrescar el token");
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "http://localhost:3000/auth/refresh",
      data: {
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("refresh_token")
      }
    })
      .then(msg => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.setItem("access_token", msg.data.access_token);
        localStorage.setItem("refresh_token", msg.data.refresh_token);
        resolve(1);
      })
      .catch(err => {
        console.log("marco un error");
        reject(err);
        console.log(err);
      });
  });
  return promise;
}

export default {
  post,
  get,
  refreshToken,
  deleteData,
  putData,
  patchData
};
