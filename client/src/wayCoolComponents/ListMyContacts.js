import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { EnumContext } from "../context/EnumContext";
import { InputText } from "primereact/inputtext";
import {  Grid } from "semantic-ui-react";
import { showBackendErrormessage } from "../shared/ErrorHandling";
import { Growl } from "primereact/growl";
import { Button } from "semantic-ui-react";
import AddContactDialog from "./AddMyContacts";
import SendMessageDialog from "./SendMessage";
import {Dialog} from 'primereact/dialog';
import DisplayMyContacts from "./DisplayMyContacts";
import { TabView, TabPanel } from 'primereact/tabview';
import DisplayMessages from "./DisplayMessages";

const MyContacts = (props) => {
  const [request, setRequest] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [msgDialog, setMsgDialog] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [dialogFooterOption, setDialogFooterOption] = useState("ADD");
  const [selectedRow, setSelectedRow] = useState([]);

  const hideMethod = () => {
    setContactDialog(false);
    setSelectedRow([]);
  };

  const hideMethodMsg = () => {
    setMsgDialog(false);
    setSelectedRow([]);
  };

  const {
    selectedRequest,
    setSelectedRequest,
    setPageTitle,
    validUser,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(EnumContext);
  const msgRef=useRef(null);
  setPageTitle(`My Contacts of ${validUser.user.email}`);

  useEffect(() => {
    setIsLoggedIn(!isLoggedIn);
  }, []);

  const action1 = () => {
    setDialogFooterOption("ADD")
    setContactDialog(true)
  }

  const msgAction = (rowData, column) => {
    return (
      <div>
          <span
            style={{ fontSize: "1.5em" }}
            className="pi pi-envelope"
            onClick={(e) => setMsgDialog(true)}
          />
                
      </div>
    );
  };
  var header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <i className="pi pi-search" style={{ margin: "4px 4px 0 0" }} />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Global Search"
          size="50"
        />
      </div>

      <Button
        size="tiny"
        onClick={action1}
        color="blue"
        icon="add"
      >
        + New Contacts
      </Button>
    </div>
  );

  useEffect(() => {
    console.log(validUser.user.email);
    if (validUser.message === "VALID_USER") {
      axios
        .get(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/get/mycontacts/${validUser.user.email}`)
        .then((response) => {
          setRequest(response.data);
        })
        .catch((error) => {
          showBackendErrormessage(msgRef, error)
        });
    }
   
  }, [validUser.message, selectedRequest, contactDialog]);

  const deleteContact = (id) => {
    let deleteId = id;
      axios
        .delete(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/common/delete/mycontact/${deleteId}`)
        .then((response) => {
          setRequest(response.data);
        })
        .catch((error) => {
          showBackendErrormessage(msgRef, error)
        });
  }

  const action = (rowData, column) => {
    return (
      <div>
          <span
            style={{ fontSize: "1.5em" }}
            className="pi pi-trash"
            onClick={(e) => deleteContact(rowData.id)}
          />
        
      </div>
    );
  };

  return (
<>
               
    <segment>
    <TabView>
      <TabPanel header="Contact">
       <Grid> <Grid.Column stretched width={9}>

      <Growl ref={msgRef}> </Growl>
     
      <DataTable
        value={request}
        responsive={true}
        resizableColumns={true}
        columnResizeMode="fit"
        selectionMode="single"
        selection={selectedRequest}
        onSelectionChange={(e) => {
          console.log(e.value);
          setSelectedRequest(e.value);
        }}
        sortMode="multiple"
        paginator={true}
        rows={10}
        header={header}
        globalFilter={globalFilter}
        emptyMessage="No records found"
      >
        <Column
          field="fullname"
          header="Fullname"
          style={{ width: "120px", textAlign: "center" }}
          sortable={true}
        />
        <Column
          field="email"
          header="Email"
          style={{ width: "110px", textAlign: "center" }}
          sortable={true}
        />

        <Column
          field="company"
          header="Company"
          style={{ width: "150px", textAlign: "center" }}
          sortable={true}
        />
        
        <Column body={action} style={{ textAlign: "center", width: "6em" }} />
      </DataTable>
      <Dialog
          visible={contactDialog}
          style={{width: '50vw'}}
          header={dialogFooterOption==="ADD"}
          modal={true}
          onHide={hideMethod}
        >
          <AddContactDialog 
          data={selectedRow}
          close={hideMethod}
          type={dialogFooterOption}
          />
        </Dialog>
       
        </Grid.Column>
        <Grid.Column stretched width={7}>
        <DisplayMyContacts selectedRequest= {selectedRequest.id}/>
        </Grid.Column>
      </Grid>
      </TabPanel>

      <TabPanel header="Message">
      <Grid> 
        <Grid.Column stretched width={9}>
          <DataTable
        value={request}
        responsive={true}
        resizableColumns={true}
        columnResizeMode="fit"
        selectionMode="single"
        selection={selectedRequest}
        onSelectionChange={(e) => {
          console.log(e.value);
          setSelectedRequest(e.value);
        }}
        sortMode="multiple"
        paginator={true}
        rows={10}
        globalFilter={globalFilter}
        emptyMessage="No records found"
      >
        <Column
          field="fullname"
          header="Fullname"
          style={{ width: "120px", textAlign: "center" }}
          sortable={true}
        />
        <Column
          field="email"
          header="Email"
          style={{ width: "110px", textAlign: "center" }}
          sortable={true}
        />
      
        <Column body={msgAction} style={{ textAlign: "center", width: "6em" }} />
      </DataTable>

      <Dialog
          visible={msgDialog}
          style={{width: '50vw'}}
          header={dialogFooterOption==="ADD"}
          modal={true}
          onHide={hideMethodMsg}
        >
          <SendMessageDialog 
          data={selectedRow}
          close={hideMethodMsg}
          type={dialogFooterOption}
          email={selectedRequest.email}
          />
        </Dialog>

      </Grid.Column>

      <Grid.Column stretched width={7}>
        <DisplayMessages selectedRequest= {selectedRequest.email} acc= {selectedRequest.account}/>
        </Grid.Column>

      </Grid>
          </TabPanel>
          </TabView>
    </segment>
    </>
  );
};

export default MyContacts;
