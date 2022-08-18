import Navbar from "./Components/Header/Navbar/Navbar";
import Login from "./Components/account/Login";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AddCustomers from "./Components/Customer/AddCustomers";
import AllCustomers from "./Components/Customer/AllCustomers";
import EditCustomers from "./Components/Customer/EditCustomers";
import Home from "./Components/Home/Home";
import DetailView from "./Components/Customer/DetailView";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Customer/Form";
// import Dashboard from "./Components/Dashboard/Dashboard";

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
    :(
    <Navigate replace to={'/login'}/>
  )
}

function App() {
  const [isAuthenticated, isAdminAuthenticated]= useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login isAdminAuthenticated={isAdminAuthenticated} />} />
        {/* Private Route */}
        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Dashboard /> } />
            </Route>
        <Route path='/all' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/all' element={<AllCustomers />} />
            </Route>
        <Route path='/home' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/home' element={<Home />} />
            </Route>
        <Route path="/addcustomers" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/addcustomers" element={<AddCustomers/>}/>
        </Route>
        <Route path="/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/edit/:id" element={<EditCustomers/>}/>
        </Route>
        <Route path="/detailview/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/detailview/:id" element={<DetailView/>}/>
        </Route>
        <Route path="/form" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/form" element={<Form/>}/>
        </Route>
      </Routes>
      
     
      
    </BrowserRouter>
  );
}

export default App;
