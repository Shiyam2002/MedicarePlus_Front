import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Footer from "./Component/Footer";
import AddPatient from "./Component/AddPatient";
import FetchById from "./Component/FetchById";
import FetchAll from "./Component/FetchAll";
import DeletePatient from "./Component/DeletePatient";
import UpdatePatient from "./Component/UpdatePatient";
import AdComponent from "./Component/AdComponent";
import LoginPage from "./Component/LoginPage";
import LandingPage from "./Component/landingPage";
import Reports from "./Component/Reports";

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
        <div
          className="app-container"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Navbar */}
          {isLoggedIn && (
            <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/" className="mx-1">MediCare+</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto ">
                  <Button
                    variant="outline-light"
                    onClick={this.handleLogout}
                    className="ml-3"
                    size="sm" /* Smaller button */
                  >
                    Logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}

          {/* Main Container */}
          <Container
            fluid
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              flexGrow: 1,
              backgroundColor: isLoggedIn ? "lightgray" : "white",
            }}
          >
            <Row className="flex-grow-1">
              {isLoggedIn ? (
                <>
                  {/* Sidebar */}
                  <Col
                    xs={12}
                    md={3}
                    lg={2}
                    className="sidebar" // Apply the sidebar class here
                  >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/addPatient"
                        >
                          Add Patient
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/fetchById"
                        >
                          Fetch By ID
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/fetchAll"
                        >
                          Fetch All
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/updatePatient"
                        >
                          Update Patient
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/deleteProvider"
                        >
                          Delete Patient
                        </NavLink>
                      </li>
                      <li className="nav-item mb-3">
                        <NavLink
                          className="nav-link text-white p-3 rounded-3"
                          to="/reports"
                        >
                          Reports
                        </NavLink>
                      </li>
                    </ul>
                  </Col>

                  {/* Main Content */}
                  <Col xs={8} style={{ backgroundColor: "white" }}>
                    <Routes>
                      <Route path="/addPatient" element={<AddPatient />} />
                      <Route path="/fetchById" element={<FetchById />} />
                      <Route path="/fetchAll" element={<FetchAll />} />
                      <Route
                        path="/updatePatient"
                        element={<UpdatePatient />}
                      />
                      <Route path="/deleteProvider" element={<DeletePatient />} />
                      <Route path="/reports" element={<Reports />} />
                    </Routes>
                  </Col>

                  {/* Ads */}
                  <Col
                    xs={2}
                    style={{
                      backgroundColor: "#EEF1BD",
                      color: "#B2675E",
                    }}
                  >
                    <AdComponent />
                  </Col>
                </>
              ) : (
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/login"
                    element={<LoginPage onLogin={this.handleLogin} />}
                  />
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
