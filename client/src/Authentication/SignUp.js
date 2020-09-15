import React, { useRef, useEffect, useContext } from "react";

import { Field, withFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Messages } from "primereact/messages";
import { Panel } from "primereact/panel";
import {
  CustomComponent
} from "../shared/CustomFormComponents_SingleColumn";
import { EnumContext } from "../context/EnumContext";
// import { Button } from "primereact/button";
import { Button } from 'semantic-ui-react'
import axios from "axios";
// import { EnumContext } from "../context/EnumContext";

// import { DisplayFormikState } from "../shared/formik-helper";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required("Required")
    // password: Yup.string().required("Required")
  }),

  mapPropsToValues: props => ({
    email: "",
    password: "",
    user: {},
    login:""
  }),

  handleSubmit: (values, { setStatus, setFieldValue, setSubmitting }) => {
    const payload = {
      ...values
    };
    const { login, user, ...rest} = payload;
    console.log(payload);
    
            axios({
                method: "post",
                url: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/signup/insert/myaccount`,
                data: rest,
                headers: { Accept: "application/json" }
              })
                .then(function(response) {
                    setStatus("success");
                  console.log(response);
                })
                .catch(function(error) {
                  console.log(error);
                //   setStatus("failed");
                });
            }
            
});

const LoginPage = props => {
  const {
    values,
   setFieldValue,
    handleSubmit,
   
    setStatus
   
  } = props;
  const msgRef = useRef(null);
  const {
    isLoggedIn,
    setIsLoggedIn,
    setPageTitle,
    setLoginRequired,
    validUser
  } = useContext(EnumContext);

  const showError = (msgRef, setStatus) => {
    msgRef.current.show({
      severity: "warn",
      summary: "Invalid email or password",
      detail: ""
    });
    setStatus("");
  };

  useEffect(() => {
    console.log("Inside Login useEffect");
    console.log(props.status);
    setPageTitle("Signup here!!!");
    if (props.status === "success") {
      console.log(props.status);
      setIsLoggedIn(!isLoggedIn);
     
      setLoginRequired(false);
    }

    props.status === "failed" && showError(msgRef, setStatus);

    return () => {
      setPageTitle("");
    };
  }, [props.status]);

  return (
    <div
      style={{
        margin: "auto",
        width: "70%",

        padding: "10px",
      }}
    >
      <Messages ref={msgRef}> </Messages>
      {props.status === "success" && (
        <Redirect push to="/" />
      )}
      <Panel header="Create  new account">
        <form onSubmit={handleSubmit}>
          <div className=" p-fluid " />
          <div className="p-grid p-align-center">
            <Field
              value={values.email}
              label="Email"
              name="email"
              widget={InputText}
              component={CustomComponent}
              req={true}
            />
          </div>
          <div className="p-grid p-align-center">
            <Field
              value={values.password}
              label="Password"
              name="password"
              widget={Password}
              feedback={false}
              component={CustomComponent}
              req={true}
            />
          </div>

          <div align="right">
          <Button
              basic
              color="grey"
              onClick={(e) => {
                window.location.hash = "/loginPage";
              }}
            >
              Login
            </Button>
            <Button primary onClick={(e) => {
                setFieldValue("login", "signup");
              }}>
              Signup
            </Button>

          

          </div>
        </form>
      </Panel>
    </div>
  );
};

const MyEnhancedForm2 = formikEnhancer(LoginPage);

export default MyEnhancedForm2;
