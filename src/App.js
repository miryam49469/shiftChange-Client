import { React,useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,Routes, Route, Link,useLocation,useNavigate } from 'react-router-dom';
import MyShifts from "./components/myShifts‏";
import OpenRequestsForExchange from "./components/openRequestsForExchange‏";
import AllChanges from "./components/allChanges‏";
import MenuBar from "./components/menuBar";
function App() {
 
 return ( 
 <>
 <MenuBar></MenuBar>
        <Routes>
          <Route path='/' element={<MyShifts  />}></Route>
          <Route path='/openRequests' element={<OpenRequestsForExchange  />}></Route> 
        <Route path='/allChanges' element={<AllChanges  />}></Route>

        </Routes>
</>
 );
}

export default App;
