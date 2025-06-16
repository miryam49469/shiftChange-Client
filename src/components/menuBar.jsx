import { React,useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,Routes, Route, Link,useLocation,useNavigate } from 'react-router-dom';

import { Menubar } from 'primereact/menubar';
function MenuBar() {
    const navigate=useNavigate();
    const items = [
        {
            label: 'המשמרות שלי',
            icon: 'pi pi-user',
            command: () => {
                navigate('./')
            }
            },
        {
            label: 'בקשות פתוחות להחלפה ',
            icon: 'pi pi-search',
            command: () => {
                navigate('./openRequests')

            }
        },
        {
            label: 'כל ההחלפות',
            icon: 'pi pi-sync',
            command: () => {
                navigate('./allChanges')

            }
        }]
 return ( 
    <div className="card">
    <Menubar model={items} />
</div>
 );
}

export default MenuBar;
