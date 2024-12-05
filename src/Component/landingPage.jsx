import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

export default class LandingPage extends Component {
  render() {
    return (
      
      <div style={{ fontFamily: "Poppins, sans-serif" }}>
        {/* Navigation Menu */}
        <header className="d-flex justify-content-between align-items-center p-3 bg-black text-white">
          <div>
            <NavLink className="navbar-brand text-white fs-4" to="/">
              MediCare+
            </NavLink>
          </div>
          <nav>
            <NavLink
              className="text-white me-3"
              to="/"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
            <NavLink
              className="text-white me-3"
              to="/about"
              style={{ textDecoration: "none" }}
            >
              About Us
            </NavLink>
            <NavLink
              className="text-white me-3"
              to="/contact"
              style={{ textDecoration: "none" }}
            >
              Contact Us
            </NavLink>
            <NavLink className="btn btn-outline-light" to="/login">
              Login
            </NavLink>
          </nav>
        </header>

        {/* Hero Section */}
        <section
          className="text-center py-5 text-white"
          style={{
            backgroundColor: "#000",
            backgroundImage: `url("https://source.unsplash.com/1920x1080/?hospital,monochrome")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="display-4 fw-bold">Modern Healthcare, Simplified</h1>
          <p className="fs-5 mt-3">
            Manage appointments with ease, anytime, anywhere.
          </p>
          <NavLink className="btn btn-outline-light btn-lg mt-4" to="/login">
            Get Started
          </NavLink>  
        </section>

        {/* Services Section */}
        <section className="py-5 bg-black text-black">
          <div className="container">
            <h3 className="text-center mb-4">Our Core Services</h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <div className="p-4 border rounded border-light shadow-sm">
                  <h5>Doctor Consultation</h5>
                  <p>
                    Book consultations with our certified specialists for your
                    healthcare needs.
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="p-4 border rounded border-light shadow-sm">
                  <h5>Follow-up Reminders</h5>
                  <p>
                    Never miss an appointment with automated follow-up
                    reminders.
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="p-4 border rounded border-light shadow-sm">
                  <h5>Patient Dashboard</h5>
                  <p>
                    Track your medical history and upcoming appointments in one
                    place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-5 bg-light text-black">
          <div className="container">
            <h3 className="text-center mb-4">How It Works</h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <div className="p-4 border rounded shadow-sm">
                  <h5>Step 1</h5>
                  <p>Register on our platform with easy process.</p>
                </div>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="p-4 border rounded shadow-sm">
                  <h5>Step 2</h5>
                  <p>
                    Choose your preferred doctor and schedule your appointment.
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="p-4 border rounded shadow-sm">
                  <h5>Step 3</h5>
                  <p>Receive reminders and attend your appointment hassle-free.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-5 bg-black text-black">
          <div className="container">
            <h3 className="text-center mb-4">What Our Patients Say</h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <blockquote className="blockquote text-black">
                  <p>"An incredibly intuitive system for booking appointments."</p>
                  <footer className="blockquote-footer text-black">
                    Emily Carter, <cite>Patient</cite>
                  </footer>
                </blockquote>
              </div>
              <div className="col-md-4 text-center mb-4">
                <blockquote className="blockquote text-black">
                  <p>
                    "Perfectly designed to meet modern hospital requirements."
                  </p>
                  <footer className="blockquote-footer text-black">
                    Dr. Daniel Smith, <cite>Physician</cite>
                  </footer>
                </blockquote>
              </div>
              <div className="col-md-4 text-center mb-4">
                <blockquote className="blockquote text-black">
                  <p>"A complete game-changer for managing our appointments."</p>
                  <footer className="blockquote-footer text-black">
                    Sarah Johnson, <cite>Admin</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-5 bg-light text-black">
          <div className="container">
            <h3 className="text-center mb-4">Get In Touch</h3>
            <div className="row">
              <div className="col-md-6 text-center mb-4">
                <h5>Email</h5>
                <p>
                  Reach us at:{" "}
                  <a href="mailto:support@medicare.com">support@medicare.com</a>
                </p>
              </div>
              <div className="col-md-6 text-center mb-4">
                <h5>Phone</h5>
                <p>
                  Call us: <strong>+91 9876543210</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />

      </div>
    );
  }
}
