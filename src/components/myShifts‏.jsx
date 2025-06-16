import { React, useState, createContext, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from "primereact/inputtextarea";
import { updateShift,getMyShifts,offerSwap } from '../axiosDataPage‏'
function MyShifts() {
  const [shifts, setShifts] = useState([
  ]);
  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [shift, setShift] = useState({});
  const [send, setSend] = useState(false);
  let newRequest = {
    date:shift.date,
    shift_type: shift.shift_type,
    employee_name: "מרים סלומון",
    requestedShiftId: shift.id,
    comment: comment,
    status: "הוצע להחלפה",
    offeredShiftId: null,
    confirmed: false,
    requested_to:null
  };

  const footerContent = (
    <div>
      <Button label="שליחה" icon="pi pi-check" onClick={() => { setVisible(false); setSend(true) }} autoFocus />
    </div>
  );
  const wantToChange = (row) => {
    setShift(row)
    setVisible(true)
  }

  const statusBodyTemplate = (row) => {
    if (row.status != "רגיל" || row.shiftType == "לילה")
      return <Button disabled label="החלף" icon="pi pi-plus" severity="success" onClick={() => wantToChange(row)} />
    return <Button label="החלף" icon="pi pi-plus" severity="success" onClick={() => wantToChange(row)} />

  }
  const sendRequest = async () => {
    try{
      let newShift={
        ...shift,
       "status" :"הוצע להחלפה"
      }
      console.log(newShift);
      
    const res1 = await updateShift(newShift)
    const res2 = await offerSwap(newRequest)

    alert("הבקשה נכנסה למערכת ")
    setSend(false)
    setComment("")
  }
    catch(e){

    }
  }
  const getDetails=async()=>{
    const {data} = await getMyShifts()
    const myShifts = data.filter(r => r.employee_name === "מרים סלומון" )
    setShifts(myShifts)
  }
  useEffect(()=>{
getDetails()
  },[])
  useEffect(() => {
    if (send) {
      sendRequest()
    }
  }, [send])
  return (
    <div className="card">
      <DataTable value={shifts} tableStyle={{ minWidth: '50rem' }}>
        <Column field="date" header="תאריך"></Column>
        <Column field="shiftType" header="סוג משמרת"></Column>
        <Column field="status" header="סטטוס"></Column>
        {<Column header="בקש להחלפה" body={statusBodyTemplate}></Column>}
      </DataTable>
      {visible && <div className="card flex justify-content-center">
        <Dialog visible={visible} footer={footerContent} style={{ width: '50rem' }} onHide={() => { if (!visible) return; setVisible(false); }}>
          <div className="card flex justify-content-center">
            <InputTextarea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder="הכנס הערה " rows={5} cols={30} />
          </div>
        </Dialog>
      </div>}
    </div>
  );
}

export default MyShifts;
