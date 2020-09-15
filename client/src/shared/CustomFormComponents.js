import React from "react";

import Select from "react-select";

const CustomSelect = ({
  field, // { name, value, onChange, onBlur }
  form: { values, touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div style={{ margin: "1rem 0" }}>
    <label htmlFor={field.name}>{props.label}</label>
    <Select
      {...field}
      {...props}
      id={field.name}
      options={props.options}
      isMulti={props.isMulti}
      onChange={value => setFieldValue(field.name, value)}
      onBlur={() => setFieldTouched(field.name, true)}
    />

    {errorMsg(touched, field, errors)}
  </div>
);

const errorMsg = (touched, field, errors) => {
  return (
    touched[field.name] &&
    errors[field.name] && (
      <div style={{ color: "red", marginTop: ".05rem" }}>
        {errors[field.name]}
      </div>
    )
  );
};

const comp = (component, field, props, touched, errors, values) => {
  const { widget, ...rest } = props;
  const COMPONENT_NAME = component;
  return (
    <>
      <div className="p-col-12 p-md-2 p-lg-2">
        <label
          htmlFor={field.name}
          style={{
            color: "#504a4a",
            float: "left",
            marginLeft: "2px"
          }}
        >
          {props.label}
          {props.req ? <span style={{ color: "red" }}>* </span> : null}
        </label>
      </div>
      {COMPONENT_NAME.name !== "InputTextarea" ? (
        <>
          <div className="p-col-12 p-md-4 p-lg-4">
            <COMPONENT_NAME
              {...field}
              {...rest}
              id={field.name}
              style={
                touched[field.name] && errors[field.name]
                  ? {
                      fontWeight: "bold",

                      border: "1px  solid red",

                      borderRadius: "3px",

                      marginBottom: "5px"
                    }
                  : {
                      fontWeight: "bold",

                      border: "1px  solid #d2d2d2",

                      borderRadius: "1px",

                      marginBottom: "5px"
                    }
              }
            />
            {errorMsg(touched, field, errors)}
          </div>
        </>
      ) : (
        <div className="p-col-12 p-md-9 p-lg-9">
          <COMPONENT_NAME
            {...field}
            {...rest}
            id={field.name}
            style={
              touched[field.name] && errors[field.name]
                ? {
                    fontWeight: "bold",

                    border: "1px  solid red",

                    borderRadius: "1px",

                    marginBottom: "10px"
                  }
                : {
                    fontWeight: "500px",
                    border: "1px  solid #d2d2d2",

                    borderRadius: "1px",

                    marginBottom: "10px"
                  }
            }
          />
          {errorMsg(touched, field, errors)}
        </div>
      )}
    </>
  );
};

export const CustomComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, values }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => comp(props.widget, field, props, touched, errors, values);

export default CustomSelect;
