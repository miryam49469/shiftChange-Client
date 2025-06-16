import { React, useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { getMyRequests,UpdateOfferSwap } from '../axiosDataPage‏'
import './AllChanges.css';
import { Button } from "primereact/button";
function AllChanges() {
    const [inProgressSwaps, setInProgressSwaps] = useState([ ]);



    const getSeverity = (status) => {
        switch (status) {
            case 'נדחה': return 'danger';
            case 'אושר': return 'success';
            case 'הוצע להחלפה': return 'warning';
            default: return null;
        }
    };
    const aproveS = async (row) => {
        row.status="אושר"
        const res  = await UpdateOfferSwap(row)
        alert("ההחלפה הושלמה בהצלחה")
        getAllMyRequest();
    }
    const removeS = async (row) => {
        row.requested_to=null;
        row.status=null;
        row.shift_id=null;
        const  res  = await UpdateOfferSwap(row)
        alert("הבקשה נדחתה")
        getAllMyRequest();
    }
    const statusBodyTemplate = (row) => {
        if (row.status == "ממתין לאישור" && row.employee_name != "מרים סלומון") {
            return <div>
                <Tag value={row.status} severity={getSeverity(row.status)} />

                <button onClick={() =>  aproveS(row) }>  אשר</button>
                <button onClick={() =>  removeS(row) }>  דחה</button>

            </div>
        }
        return <Tag value={row.status} severity={getSeverity(row.status)} />

    };
    const rowStyle = (row) => {
        return row.employee_name === "מרים סלומון" ? 'miriam-row' : '';
    };
    useEffect(() => {
        if (inProgressSwaps.length > 0) {
            const sorted = [...inProgressSwaps].sort((a, b) => {
                const A = a.employee_name === "מרים סלומון";
                const B = b.employee_name === "מרים סלומון";

                if (A && !B)
                    return -1;
                if (!A && B)
                    return 1;
                return 0;
            });

            setInProgressSwaps(sorted);
        }
    }, []);
    const getAllMyRequest = async () => {
        const res  = await getMyRequests()
        const myRequests = res.data.filter(r => r.employee_name === "מרים סלומון" || r.requested_to === "מרים סלומון")
        const sorted = [...myRequests].sort((a, b) => {
            const A = a.employee_name === "מרים סלומון";
            const B = b.employee_name === "מרים סלומון";

            if (A && !B)
                return -1;
            if (!A && B)
                return 1;
            return 0;
        });

        setInProgressSwaps(sorted);
    };
    useEffect(() => {
        getAllMyRequest()
    }, [])
    return (
        <div className="card">
            <DataTable rowClassName={rowStyle} value={inProgressSwaps} tableStyle={{ minWidth: '50rem' }}>
                <Column field="employee_name" header="שם העובד" />
                <Column field="date" header="תאריך" />
                <Column field="shift_type" header="סוג משמרת" />
                <Column field="status" header="סטטוס" body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
}

export default AllChanges;
