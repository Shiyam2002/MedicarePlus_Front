import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class CancelAppointment extends Component {
  state = {
    appointmentID: "",
    message: "",
    error: "",
    noDataFound: false, // New state to track if no data is found
  };

  // Handle input changes
  handleChange = (event) => {
    this.setState({
      appointmentID: event.target.value,
      noDataFound: false, // Reset no data state on input change
    });
  };

  // Handle cancel request
  handleCancel = async () => {
    const { appointmentID } = this.state;

    // Validation: Check if ID is not empty
    if (!appointmentID.trim()) {
      this.setState({ error: "Appointment ID is required.", message: "", noDataFound: false });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/Appointment/Delete/${appointmentID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        this.setState({
          message: `Appointment with ID ${appointmentID} was canceled successfully.`,
          error: "",
          noDataFound: false,
        });
      } else if (response.status === 400) {
        // Handle no appointment found
        this.setState({
          error: "",
          message: "",
          noDataFound: true,
        });
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to cancel the appointment.",
          message: "",
          noDataFound: false,
        });
      }
    } catch (error) {
      this.setState({
        error: "An error occurred while canceling the appointment.",
        message: "",
        noDataFound: false,
      });
    }
  };

  render() {
    const { appointmentID, message, error, noDataFound } = this.state;

    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-dark text-white text-center">
            <h3>Cancel Appointment</h3>
          </div>
          <div className="card-body">
            <div className="form-group mb-3">
              <label htmlFor="appointmentID" className="form-label">
                Appointment ID:
              </label>
              <input
                type="text"
                id="appointmentID"
                value={appointmentID}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter Appointment ID"
              />
              {noDataFound && (
                <div className="text-danger mt-2">No data found for the given Appointment ID.</div>
              )}
            </div>
            <div className="d-grid">
              <button
                onClick={this.handleCancel}
                className="btn btn-dark btn-block"
              >
                Cancel Appointment
              </button>
            </div>
            {message && (
              <div className="alert alert-success mt-3" role="alert">
                {message}
              </div>
            )}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CancelAppointment;
