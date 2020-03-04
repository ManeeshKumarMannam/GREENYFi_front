import axios from 'axios'
import http from "./http";


export const commonApiCall = ( url, method, data, dispatchType = null, isAuthorized = false, isMultipart = false ) => dispatch => {
  if (isAuthorized) http.setJwt(http.getJwt());
//   else http.removeJwt();
//   if (isMultipart) http.setMultipart();
  return new Promise((resolve, reject) => {
      axios({ method, url, data })
      .then(response => {
        if (response && response.status === 200) {
        //   consoleLog(response.data.data, "response.data.data");
        //   if (dispatchType === "CONSUMER_DETAILS") {
        //     const payload = { data: response.data.data, details: data };
        //     dispatch({ type: dispatchType, payload });
        //   }
        //   if (dispatchType !== null) {
        //     const payload = { data: response.data.data };
        //     dispatch({ type: dispatchType, payload });
        //   }
          const responseData = response.data;
          resolve(responseData);
        // } else if (response && response.status === 404) {
        //   consoleLog(404, "called");
        //   const responseData = response.data;
        //   resolve(responseData);
        // } else if (response && response.status === 400) {
        //   consoleLog(400, "called");
        //   const responseData = response.data;
        //   resolve(responseData);
        // } else {
        //   const responseData = response.data;
        //   resolve(responseData);
        //   // typeof (data.message ? data.message : 'error') === "string" ? common.showErrorMessage(data.message ? data.message : 'error') : common.showWarningMessage("Something went wrong! ")
        }
      })
      .catch(error => {
        // this.showErrorMessage(error);
        console.log("error is ", error);
        reject(error);
      });
  });
};
