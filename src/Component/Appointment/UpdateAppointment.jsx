import React, { Component } from "react";

class UpdateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentID: "",
      appointmentDetails: null,
      error: null,
      message: null,
      loading: false,
      updateLoading: false,
    };
  }

  // Fetch appointment details by ID
  fetchAppointmentDetails = async () => {
    const { appointmentID } = this.state;

    if (!appointmentID) {
      this.setState({ error: "Please enter a valid Appointment ID." });
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `http://localhost:8080/Appointment/id/${appointmentID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch appointment details.");
      }
      const data = await response.json();
      console.log("Fetched Data:", data);

      if (data.Status === "ACCEPTED") {
        this.setState({ appointmentDetails: data.Data, loading: false });
      } else {
        this.setState({ error: data.Response, loading: false });
      }
    } catch (error) {
      console.error("Error:", error);
      this.setState({ error: error.message, loading: false });
    }
  };

  // Handle change in form fields
  handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");
    const updatedDetails = { ...this.state.appointmentDetails };

    let current = updatedDetails;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    this.setState({ appointmentDetails: updatedDetails });
  };

  // Update appointment details
  updateAppointment = async () => {
    const { appointmentDetails } = this.state;

    if (!appointmentDetails) {
      this.setState({ error: "No appointment details to update." });
      return;
    }

    this.setState({ updateLoading: true, error: null });

    try {
      const response = await fetch("http://localhost:8080/Appointment/Update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to update appointment details.");
      }

      const data = await response.json();
      console.log("Updated Data:", data);

      if (response.ok) {
        this.setState({
          message: `Appointment updated successfully.`,
          error: "",
        });
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to update patient.",
          message: "",
        });
      }
      
      //alert("Appointment updated successfully!");
      this.setState({ updateLoading: false });
    } catch (error) {
      console.error("Error:", error);
      this.setState({ error: error.message, updateLoading: false });
    }
  };

  render() {
    const {
      appointmentID,
      appointmentDetails,
      error,
      loading,
      updateLoading,
      message,
    } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="text-center">Update Appointment</h2>

        {/* Input for Appointment ID */}
        <div className="form-group mb-4">
          <label>Appointment ID:</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={appointmentID}
              onChange={(e) => this.setState({ appointmentID: e.target.value })}
              placeholder="Enter Appointment ID"
            />
            <button
              className="button-26"
              onClick={this.fetchAppointmentDetails}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Details"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Display Appointment Details */}
        {appointmentDetails && (
          <form className="border p-4 rounded shadow-sm bg-light">
            <h4>Edit Appointment Details</h4>
            <div className="form-group mb-3">
              <label>Date of Appointment:</label>
              <input
                type="date"
                className="form-control"
                name="dateOfAppointment"
                value={appointmentDetails.dateOfAppointment || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Time of Appointment:</label>
              <input
                type="time"
                className="form-control"
                name="timeOfAppointment"
                value={appointmentDetails.timeOfAppointment || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Status:</label>
              <select
                className="form-control p-1"
                name="status"
                value={appointmentDetails.status || ""}
                onChange={this.handleChange}
                
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Patient Details */}
            <h5>Patient Details</h5>
            <div className="form-group mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="patient.patientName"
                value={appointmentDetails.patient.patientName || ""}
                onChange={this.handleChange}
                disabled
              />
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="patient.patientEmail"
                value={appointmentDetails.patient.patientEmail || ""}
                onChange={this.handleChange}
                disabled
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone:</label>
              <input
                type="number"
                className="form-control"
                name="patient.patientPhone"
                value={appointmentDetails.patient.patientPhone || ""}
                onChange={this.handleChange}
                disabled
              />
            </div>

            <button
              type="button"
              className="btn btn-dark mt-5 w-99 "
              onClick={this.updateAppointment}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update Appointment"}
            </button>
            {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        )}
      </div>
    );
  }
}

export default UpdateAppointment;
