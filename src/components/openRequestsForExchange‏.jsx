import { React, useState, createContext, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from "primereact/inputtextarea";
import {getMyRequests,UpdateOfferSwap} from '../axiosDataPage‏'
function OpenRequestsForExchange() {
    const [requests, setRequests] = useState([
      
    ]
    );
     
      const wantToChange = async(row) => {
row.status="אושר"
        const {res} = await UpdateOfferSwap(row)
        // const {res2} = await aprove(row)

        getAllMyRequest()
      }
    
      const change = (row) => {
          return <Button  label="הצע להחליף איתי משמרת"  severity="success" onClick={()=>wantToChange(row)} />
    
      }
      const getAllMyRequest = async() => {
        const res = await getMyRequests()
        const allRequest=res.data.filter(r => r.requested_to===""&&r.status==="הוצע להחלפה"&&r.employee_name!="מרים סלומון")
        setRequests(allRequest)
      }
      useEffect(()=>{
        getAllMyRequest()
    },[])
      return (
        <div className="card">
          <DataTable value={requests} tableStyle={{ minWidth: '50rem' }}>
            <Column field="employee_name" header="שם העובד"></Column>
            <Column field="date" header="תאריך"></Column>
            <Column field="shift_type" header="סוג משמרת"></Column>
            <Column field="comment" header="הערות"></Column>
            {<Column  body={change}></Column>}
          </DataTable>
        </div>
      );
    }

export default OpenRequestsForExchange;
