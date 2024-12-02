import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
      isSignUp: false,
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  toggleForm = () => {
    this.setState({
      isSignUp: !this.state.isSignUp,
      errorMessage: "",
      successMessage: "",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password, isSignUp } = this.state;

    if (!username || !password) {
      this.setState({ errorMessage: "Both fields are required" });
      return;
    }

    const url = isSignUp
      ? "http://localhost:8080/Authentication/register"
      : "http://localhost:8080/Authentication/login";

    const payload = { userName: username, password: password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.response || "An error occurred");
      }

      const data = await response.json();

      if (isSignUp) {
        this.setState({
          successMessage: "User created successfully. Please log in.",
          errorMessage: "",
        });
      } else {
        this.setState({ successMessage: "Login Successful!", errorMessage: "" });
        this.props.onLogin();
        window.location.href = "/home";
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, successMessage: "" });
    }
  };

  render() {
    const { username, password, errorMessage, successMessage, isSignUp } = this.state;

    return (
      <div style={{ backgroundColor: "#f4f3ee", minHeight: "120vh" }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "5px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <NavLink className="navbar-brand text-white fs-5" to="/">
              MediCare+
            </NavLink>
            <p style={{ fontSize: "0.7rem", margin: "0", color: "#ddd" }}>
              Your Health, Our Priority
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="d-flex flex-column flex-lg-row" style={{ height: "calc(100vh - 80px)" }}>
          {/* Left Section */}
          <div


          >
            <img src="rb_739.png" style={{
              width: "800px",
              height: "500px"
            }}></img>

          </div>

          {/* Right Section */}
          <div
            style={{
              flex: "3",
              backgroundColor: "#463f3a",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
            }}
          >
            <div
              className="card shadow-sm"
              style={{
                width: "100%",
                maxWidth: "350px",
                padding: "1.5rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                color: "#463f3a",
              }}
            >
              <h4 className="text-center mb-3 fw-bold">
                {isSignUp ? "Sign Up" : "Sign In"}
              </h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={this.handleInputChange}
                    style={{ borderRadius: "4px" }}
                    aria-label="Enter username"
                  />
                  <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={this.handleInputChange}
                    style={{ borderRadius: "4px" }}
                    aria-label="Enter password"
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-2"
                  style={{
                    backgroundColor: "#007bff",
                    borderRadius: "4px",
                    border: "none",
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    padding: "8px 0",
                  }}
                >
                  {isSignUp ? "Sign Up" : "Log In"}
                </button>
              </form>

              {errorMessage && (
                <div
                  className="alert alert-danger text-center"
                  style={{
                    fontSize: "0.85rem",
                    borderRadius: "4px",
                  }}
                >
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div
                  className="alert alert-success text-center"
                  style={{
                    fontSize: "0.85rem",
                    borderRadius: "4px",
                  }}
                >
                  {successMessage}
                </div>
              )}

              <div className="text-center mt-2">
                <button
                  className="btn btn-link"
                  onClick={this.toggleForm}
                  style={{
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    color: "#007bff",
                  }}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
            padding: "8px 15px",
            fontSize: "0.75rem",
            marginTop: "auto",
          }}
        >
          <div>
            <a
              href="#about"
              style={{ color: "#007bff", textDecoration: "none", marginRight: "10px" }}
            >
              About Us
            </a>
            <a
              href="#contact"
              style={{ color: "#007bff", textDecoration: "none", marginRight: "10px" }}
            >
              Contact
            </a>
            <a
              href="#privacy"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Privacy Policy
            </a>
          </div>
          <p className="mt-1">© 2024 MediCare+. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}
