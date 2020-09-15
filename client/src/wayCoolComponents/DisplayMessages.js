import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Growl } from "primereact/growl";
import {
  DisplayFieldSingles,
} from "../shared/DisplayFormComponents";
import {
  Header,
  Segment,
} from "semantic-ui-react";
import { showBackendErrormessage } from "../shared/ErrorHandling";

const DisplayMsg = (props) => {
  const msgRef = useRef(null);
  const [
    selectedRecord,
    setSelectedRecord,
  ] = useState([]);

  const [messages, setMessages] = useState([]);
  const [accMessages, setAccMessages] = useState([]);

  let fetchId = props.selectedRequest ? props.selectedRequest : 1;
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/get/DisplayMessages/${fetchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
          console.log(response.data);

          setMessages(response.data);
        setSelectedRecord({ ...response.data[0] });
      })
      .catch((error) => {
        showBackendErrormessage(msgRef, error);
      });
  }, [fetchId]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/get/DisplayMsg/${props.acc}/${fetchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
          console.log(response.data);
          setAccMessages(response.data);
      })
      .catch((error) => {
        showBackendErrormessage(msgRef, error);
      });
  }, [fetchId]);

    let msgArray = messages.map((x) => ({ received: x.receiced_message}));
    let accMsgArray = accMessages.map((x) => ({ received: x.receiced_message}));

    return (
    <>
      <Growl ref={msgRef}> </Growl>
      <Segment clearing attached>
      <Header style={{ marginBottom: "-5px" }} as="h2">
         My messages
        </Header>
        <br/>
        <div className="p-grid">
           
            {accMessages.map((item, index )=> {
                return <DisplayFieldSingles label="Received:" fieldName={accMsgArray[index].received} />
            })}
            {messages.map((item, index )=> {
                return <DisplayFieldSingles label="Sent:" fieldName={msgArray[index].received} />
            })}
        </div>
        
      </Segment>
    </>
  );
};
export default DisplayMsg;
