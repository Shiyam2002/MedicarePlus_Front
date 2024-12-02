import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom"; // Correct import

export default class HomePage extends Component {
  render() {
    return (
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage: "linear-gradient(to bottom right, #eef2f3, #8e9eab)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#343a40",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Welcome to Appointment Scheduling
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#6c757d",
            marginTop: "10px",
            maxWidth: "600px",
          }}
        >
          Easily manage appointments for your healthcare needs. Streamline your
          scheduling process, connect with professionals, and stay organized.
        </p>
        <img
          src="rb_8496.png"
          alt="Hospital"
          style={{
            width: "300px",
            height: "200px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
          }}
        />
        <NavLink
          className="btn btn-primary mt-4"
          to="/appointment"
          aria-label="Book an Appointment"
        >
          Book an Appointment
        </NavLink>
      </div>
    );
  }
}
