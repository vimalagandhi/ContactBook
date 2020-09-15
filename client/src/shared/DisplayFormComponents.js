import React from "react";

export const DisplayFieldSingles = props => {
  const { fieldName, label } = props;

  return (
    <>
      <div className="p-col-12 p-md-4 p-lg-4">
        <label
          style={{
            color: "#504a4a",
            float: "left",
            marginBottom: "16px"
          }}
          htmlFor={fieldName}
        >
          {label}
        </label>
      </div>

      <div
        className="p-col-12 p-md-6 p-lg-6"
        style={{
          fontWeight: "bold",
          backgroundColor: "#fafafa",
          marginBottom: "16px"
        }}
      >
        {fieldName}
      </div>
    </>
  );
};
