import React, {useEffect} from "react";
import { Field, withFormik } from "formik";
import { Button } from "semantic-ui-react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { CustomComponent } from "../shared/CustomFormComponents";
import { Growl } from "primereact/growl";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    receiced_message: Yup.string().required("Message is required!")
  }),

  mapPropsToValues: props => ({
    receiced_message: "",
    email:props.email
  }),

  handleSubmit: (values, { setStatus, resetForm }) => {
    const payload = {
      ...values
    };
    console.log(payload);
    const { type, ...rest } = payload;
    const token=localStorage.getItem("userToken");

    if(values.type==="ADD"){ 
    axios({
      method: "post",
      url: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/insert/messages`,
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
            value={values.receiced_message}
            label="Message"
            name="receiced_message"
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
            Send
          </Button>
        </div>
      </form>
    </>
  );
};

const MyEnhancedForm2 = formikEnhancer(MyForm2);

export default MyEnhancedForm2;
