import React from 'react';
import './App.css';
import './sass_styles/app.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeComp } from './components/homecomp/homecomp';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <HomeComp />
            </>} />

          <Route path='/expenseadd' element={
            <>

            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App