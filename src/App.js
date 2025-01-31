import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { Route, NavLink, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Footer from "./Component/Footer";
import AddPatient from "./Component/Patient/AddPatient";
import FetchById from "./Component/Patient/FetchById";
import FetchAll from "./Component/Patient/FetchAll";
import DeletePatient from "./Component/Patient/DeletePatient";
import UpdatePatient from "./Component/Patient/UpdatePatient";
import AdComponent from "./Component/AdComponent";
import LoginPage from "./Component/LoginPage";
import LandingPage from "./Component/LandingPage"
import Reports from "./Component/Patient/Reports";
import HomePage from "./Component/HomePage";
import Appointment from "./Component/Appointment/Appointment";
import AllAppointments from "./Component/Appointment/AllAppointment";
import CancelAppointment from "./Component/Appointment/CancelAppointment";
import UpdateAppointment from "./Component/Appointment/UpdateAppointment";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    };
  }

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
    localStorage.setItem("isLoggedIn", "true");
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    localStorage.removeItem("isLoggedIn");
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <div className="app-container">
          {/* Navbar */}
          {isLoggedIn && (
            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/home" className="mx-1">MediCare+</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">

                  {/* <div className="dropdown">
                    <button
                      className="btn btn-dark dropdown-toggle mr-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown" // Note: Use `data-bs-toggle` for Bootstrap 5
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Appointment Reports
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#">
                        Patient Appointment Lists
                      </a>
                      <a className="dropdown-item" href="#">
                        Appointments for a Date
                      </a>
                      <a className="dropdown-item" href="#">
                        Status reports
                      </a>
                      <NavLink to="/addPatient" className="nav-link ">Patient Appointment Lists</NavLink>
                      <NavLink to="/addPatient" className="nav-link ">Appointments for a Date</NavLink>
                      <NavLink to="/addPatient" className="nav-link ">Status reports</NavLink>
                    </div>
                  </div> */}

                  <Button
                    variant="outline-light"
                    onClick={this.handleLogout}
                    className="mr-3"
                    size="sm"
                  >
                    Logout
                  </Button>

                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}

          {/* Main Container */}
          <Container className="content-container" fluid>
            <Row className="flex-grow-1">
              {isLoggedIn ? (
                <>
                  <Col xs={12} md={3} lg={2} className="sidebar">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li className="nav-item">
                        <NavLink to="/addPatient" className="nav-link">Add Patient</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/fetchById" className="nav-link">Fetch By Name</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/fetchAll" className="nav-link">Fetch All</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/updatePatient" className="nav-link">Update Patient</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/deleteProvider" className="nav-link">Delete Patient</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/reports" className="nav-link">Reports</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/appointment" className="nav-link">Appointment</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/allAppointment" className="nav-link">All Appointments</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/cancelAppointment" className="nav-link">Cancel Appointment</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/updateAppointment" className="nav-link">Update Appointment</NavLink>
                      </li>
                    </ul>
                  </Col>

                  {/* Main Content */}
                  <Col xs={8} className="main-content">
                    <Routes>
                      <Route path="/addPatient" element={<AddPatient />} />
                      <Route path="/fetchById" element={<FetchById />} />
                      <Route path="/fetchAll" element={<FetchAll />} />
                      <Route path="/updatePatient" element={<UpdatePatient />} />
                      <Route path="/deleteProvider" element={<DeletePatient />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/appointment" element={<Appointment />} />
                      <Route path="/allAppointment" element={<AllAppointments />} />
                      <Route path="/cancelAppointment" element={<CancelAppointment />} />
                      <Route path="/updateAppointment" element={<UpdateAppointment />} />
                    </Routes>
                  </Col>

                  {/* Ad Component */}
                  <Col xs={2} className="ads-section mt-3" style={{
                    backgroundColor: "#343a40",
                    color: "white",
                    padding: "15px",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                     height: "auto",
                    overflowY: "auto",
                    marginTop: "10px"
                  }}>
                    <AdComponent />
                  </Col>
                </>
              ) : (
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage onLogin={this.handleLogin} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              )}
            </Row>
          </Container>

          {/* Footer */}
          {isLoggedIn && <Footer />}
        </div>
      </Router>
    );
  }
}

export default App;
