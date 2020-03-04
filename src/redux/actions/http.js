import axios from "axios";

axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    console.log('errr', error);
    if (error && error.response && 400 === error.response.status) {
      if (error.response !== '') return Promise.resolve(error.response);
    }
    if (error && error.response && 404 === error.response.status) {
      if (error.response !== '') return Promise.resolve(error.response);
    }
    else if (error && error.response && 403 === error.response.status) {
    //   common.showWarningMessage('Please send proper data.');
    }
    else if (error && error.response && 500 === error.response.status) {
    //   common.showErrorMessage('Internal server error');
    }
    else if (error && error.response && 401 === error.response.status) {
    //   common.showErrorMessage('UnAuthorized.');
      localStorage.clear()
      window.location.href = '/'
    }
    else {
      return Promise.reject(error);
    }
  });
                
  
  export const setJwt = jwt => {
    axios.defaults.headers.common["Authorization"] =jwt;
  };
  
  export const removeJwt = () => {
    delete axios.defaults.headers.common["Authorization"];
  };
  
  export const getJwt = () => {
    return localStorage.getItem("token");
  };
  
  export const setMultipart = () => {
    axios.defaults.headers.common["Type"] = "multipart/form-data";
  };
  
  export default { axios: axios, getJwt, setJwt, removeJwt, setMultipart }; 
