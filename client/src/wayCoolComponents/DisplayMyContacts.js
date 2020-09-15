import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  DisplayFieldSingles,
} from "../shared/DisplayFormComponents";
import {
  Label,
  Header,
  Segment,
} from "semantic-ui-react";
import { showBackendErrormessage } from "../shared/ErrorHandling";

const DisplayContacts = (props) => {
  const msgRef = useRef(null);
  const [
    selectedRecord,
    setSelectedRecord,
  ] = useState([]);

  let fetchId = props.selectedRequest ? props.selectedRequest : 1;
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/get/DisplayContacts/${fetchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSelectedRecord({ ...response.data[0] });
      })
      .catch((error) => {
        showBackendErrormessage(msgRef, error);
      });
  }, [fetchId]);

  const {
    fullname,
    email,
    phone,
    company,
    address
  } = selectedRecord;

  let firstLetter = fullname && fullname.charAt(0).toUpperCase();

  return (
    <>
      <Segment clearing attached>
        <div className= "header-center">
          <Label circular color="green">
            {firstLetter}
          </Label>{" "}

        <Header style={{ marginBottom: "-5px" }} as="h2">
          {fullname}
        </Header>

        </div>
      </Segment>

      <Segment attached>
        <div className="p-grid">
          <DisplayFieldSingles label="Fullname" fieldName={fullname} />
          <DisplayFieldSingles label="Email" fieldName={email} />
          <DisplayFieldSingles label="Phone" fieldName={phone} />
          <DisplayFieldSingles label="Company" fieldName={company} />
       
          <DisplayFieldSingles
            fieldName={address}
            label="Address"
          />
        </div>
        
      </Segment>
    </>
  );
};
export default DisplayContacts;
