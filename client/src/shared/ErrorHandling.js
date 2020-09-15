import React from "react";

export const handleError = (error, setStatus) => {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */

    console.log(error.response);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    setStatus("error");
  } else if (error.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */

    setStatus("error");
    // console.log(error);
    console.log(error.request);
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log("Error", error);
    //    setStatus("error");
  }
};

export const showErrormessage = (msgRef, setStatus, errors) => {
  const summary = (
    <span>
      {" "}
      <strong>Error</strong>
    </span>
  );
  msgRef.current.show({
    severity: "error",
    life: 6000,
    summary: summary,
    detail:
      (errors &&
        errors.response &&
        errors.response.data &&
        errors.response.data.detail) ||
      (errors &&
        errors.response &&
        errors.response.data &&
        errors.response.data.error &&
        errors.response.data.error.message) ||
      (errors && errors.response && errors.response.data)
  });

  setStatus("");
};

export const showBackendErrormessage = (msgRef, errors) => {
  const summary = (
    <span>
      {" "}
      <strong>Error</strong>
    </span>
  );
  msgRef.current.show({
    severity: "error",
    life: 6000,
    summary: summary,
    detail:
      (errors &&
        errors.response &&
        errors.response.data &&
        errors.response.data.detail) ||
      (errors &&
        errors.response &&
        errors.response.data &&
        errors.response.data.error &&
        errors.response.data.error.message) ||
      (errors && errors.response && errors.response.data)
  });

};

export const showValidationErrormessage = (msgRef, errors) => {
  const summary = (
    <span>
      {" "}
      <strong>Error</strong>
    </span>
  );
  msgRef.current.show({
    severity: "error",
    life: 6000,
    summary: summary,
    // detail: errors && JSON.stringify(Object.values(errors))
    detail: errors
  });
};
