import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Login from './component/account/Login';
import Home from './component/home/Home';
import DataProvider from "./context/DataProvider";
import CreatePost from './component/create/CreatePost';
import DetailView from './component/details/detailView';
import Update from "./component/create/Update";
import Open from "./component/opening/Open"
import Signup from './component/account/Signup';

const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate replace to='/open' />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='web-app'>
      <DataProvider>
        <Router>
          <Routes>
          <Route path="/open" element={<Open />}/>
            <Route path="/login" element={<Login isUserAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup isUserAuthenticated={setIsAuthenticated} />} />
           <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/details/:id" element={<DetailView />} />
              <Route path="/update/:id" element={<Update />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
