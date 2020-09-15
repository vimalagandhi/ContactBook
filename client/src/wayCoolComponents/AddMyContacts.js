import React, { useEffect} from "react";
import { Field, withFormik } from "formik";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { CustomComponent } from "../shared/CustomFormComponents";
import { Growl } from "primereact/growl";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    fullname: Yup.string().required("Fullname is required!"),
    email: Yup.string().required("Email is required!"),
    phone: Yup.string().required("Phone is required!"),
    company: Yup.string().required("Company is required!"),
    address: Yup.string().required("Address is required!")
  }),

  mapPropsToValues: props => ({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    id:props.data.id
  }),

  handleSubmit: (values, { setStatus, resetForm }) => {
    const payload = {
      ...values
    };
    const { id,type, ...rest } = payload;
    const token=localStorage.getItem("userToken");

    if(values.type==="ADD"){ 
    axios({
      method: "post",
      url: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/insert/mycontacts`,
      data: rest,
      headers: { Accept: "application/json",Authorization:`Bearer ${token}` },
    })
      .then(function(response) {
        setStatus("success");
        resetForm();
        setTimeout(function() {
          window.location.hash = "/listMyContacts";
        }, 1000);
      })
      .catch(function(error) {
        console.log(error);
        setStatus("error");
      });
  }
  
}
});

const MyForm2 = props => {

  const msgRef = (null);
  const {
    values,
    handleSubmit,
    setStatus
  } = props;

  const showSucessmessage = (msgRef, setStatus) => {
    setStatus("");
    props.close()
  };

  const showErrormessage = (msgRef, setStatus) => {
    setStatus("");
    props.close()
  };

  useEffect(() => {
    values.type = props.type
  }, [props.type])
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        {props.status === "success" && showSucessmessage(msgRef, setStatus)}
        {props.status === "error" && showErrormessage(msgRef, setStatus)}

        {props.status === "success"}
        {props.status === "error"}
        <Growl ref={msgRef}> </Growl>

        <div className="p-grid">
          <Field
            value={values.fullname}
            label="Fullname"
            name="fullname"
            widget={InputText}
            component={CustomComponent}
            req={true}
          />
          <Field
            value={values.email}
            label="Email"
            name="email"
            widget={InputText}
            component={CustomComponent}
            req={true}
          />
          <Field
            value={values.phone}
            label="Phone"
            name="phone"
            widget={InputText}
            component={CustomComponent}
            req={true}
          />

          <Field
            value={values.company}
            label="Company"
            name="company"
            widget={InputText}
            component={CustomComponent}
            req={true}
          />
          <Field
            value={values.address}
            label="Address"
            name="address"
            widget={InputText}
            component={CustomComponent}
            req={true}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button basic color="grey" onClick={(e) => props.close()}>
            Cancel
          </Button>

          <Button type="submit" color="green">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

const MyEnhancedForm2 = formikEnhancer(MyForm2);

export default MyEnhancedForm2;
