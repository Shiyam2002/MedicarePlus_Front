import React, { Component } from "react";

class DeletePatient extends Component {
  state = {
    patientID: "",
    message: "",
    error: "",
  };

  // Handle input changes
  handleChange = (event) => {
    this.setState({ patientID: event.target.value });
  };

  // Handle delete request
  handleDelete = async () => {
    const { patientID } = this.state;

    // Validation: Check if ID is not empty
    if (!patientID.trim()) {
      this.setState({ error: "Patient ID is required.", message: "" });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/deletePatient/${patientID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        this.setState({
          message: `Patient with ID ${patientID} was deleted successfully.`,
          error: "",
        });
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to delete patient.",
          message: "",
        });
      }
    } catch (error) {
      this.setState({
        error: "An error occurred while deleting the patient.",
        message: "",
      });
    }
  };

  render() {
    const { patientID, message, error } = this.state;

    return (
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Delete Patient</h2>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="patientID">Patient ID:</label>
          <input
            type="text"
            id="patientID"
            value={patientID}
            onChange={this.handleChange}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          onClick={this.handleDelete}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete Patient
        </button>
        {message && (
          <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
        )}
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
      </div>
    );
  }
}

export default DeletePatient;
