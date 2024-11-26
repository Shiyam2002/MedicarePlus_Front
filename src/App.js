import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Navibar from './Component/Navibar';
import Footer from './Component/Footer';
import { Route, NavLink, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddPatient from './Component/AddPatient';
import FetchById from './Component/FetchById';
import FetchAll from './Component/FetchAll';
import DeletePatient from './Component/DeletePatient';
import UpdatePatient from './Component/UpdatePatient';
import AdComponent from './Component/AdComponent';

class App extends Component {
  render() {
    return (
              <Router>
        <div className="app-container">
          <div className='content-wrap'>
          <Container fluid style={{ paddingLeft: 0, paddingRight: 0, flexGrow: 1 }}>
            <Row>
              <Navibar />
            </Row>
            <Row className="flex-grow-1" style={{ backgroundColor: 'lightgray', height: '80vh' }}>
              <Col xs={2} style={{ height: '800px', backgroundColor: '#C4A381', color: '#BBD686' }}>
                <ul>
                  <li>
                    <NavLink className="navlink" to="/addPatient">
                      Add Patient
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink" to="/fetchById">
                      Fetch By ID
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink" to="/fetchAll">
                      Fetch All
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink" to="/updatePatient">
                    Update Patient
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="navlink" to="/deleteProvider">
                      Delete Patient
                    </NavLink>
                  </li>
                </ul>
              </Col>
              <Col xs={7} style={{ backgroundColor: 'white' }}>
              
                <Routes>
                  <Route path="/addPatient" element={<AddPatient />} />
                  <Route path="/fetchById" element={<FetchById />} />
                  <Route path="/fetchAll" element={<FetchAll />} />
                  <Route path="/deleteProvider" element={<DeletePatient />} />
                  <Route path="/updatePatient" element={<UpdatePatient />} />
                </Routes>
              </Col>
              <Col xs={3} style={{ backgroundColor: '#EEF1BD ', color: '#B2675E' }}>
                <AdComponent />
              </Col>
            </Row>
            <Row>
              
            </Row>
          </Container>
          </div>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;