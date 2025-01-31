import React, { Component } from "react";

class DeletePatientByName extends Component {
  constructor(props) {
    super(props);
    this.updateFormRef = React.createRef(); // Ref for the update form
  }
  state = {
    name: "",
    patients: [],
    selectedPatient: null,
    message: "",
    error: "",
  };

  scrollToUpdateForm = () => {
    if (this.updateFormRef.current) {
      this.updateFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle input changes
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  // Fetch patients by name
  fetchPatientsByName = async () => {
    const { name } = this.state;

    // Validation: Check if name is not empty
    if (!name.trim()) {
      this.setState({ error: "Patient name is required.", message: "" });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/fetchByName/${name}`
      );

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.Data && Array.isArray(responseData.Data) && responseData.Data.length > 0) {
          this.setState({ patients: responseData.Data, error: "", message: "" });
        } else {
          this.setState({
            patients: [], // Clear patient list
            message: "No data found.", // Show no data message
            error: "", // Clear any previous error
          });
        }
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to fetch patients.",
          patients: [],
          message: "",
        });
      }
    } catch (error) {
      this.setState({
        error: "An error occurred while fetching patients.",
        patients: [],
        message: "",
      });
    }
  };

  // Handle selecting a patient
  selectPatient = (patient) => {
    console.log("Selected Patient ID:", patient.patientID); // Log the ID
    this.setState({ selectedPatient: patient, error: "", message: "" });
    this.scrollToUpdateForm();
  };

  // Handle delete request
  deletePatient = async () => {
    const { selectedPatient } = this.state;

    if (!selectedPatient) {
      this.setState({
        error: "Please select a patient to delete.",
        message: "",
      });
      return;
    }

    const patientID = selectedPatient.patientID;

    console.log("Deleting Patient ID:", patientID); // Log the ID being deleted

    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/deletePatient/${patientID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        this.setState({
          message: `Patient ${selectedPatient.patientName} deleted successfully.`,
          error: "",
          patients: [],
          selectedPatient: null,
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
    const { name, patients, selectedPatient, message, error } = this.state;

    return (
      <div className="container mt-4">
        <h2>Delete Patient by Name</h2>
        <div className="form-group">
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <button
          className="button-26"
          onClick={this.fetchPatientsByName} // Corrected usage
        >
          Fetch Patients
        </button>
        
        

        {patients.length > 0 && (
          <div className="mt-4">
            <h4>Select a Patient to Delete</h4>
            <div className="row">
              {patients.map((patient) => (
                <div className="col-md-4" key={patient.patientID}>
                  <div
                    className={`card ${selectedPatient &&
                      selectedPatient.patientID === patient.patientID
                      ? "border-dark"
                      : ""
                      }`}
                    onClick={() => this.selectPatient(patient)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body" ref={this.updateFormRef}>
                      <h5 className="card-title">{patient.patientName}</h5>
                      <p className="card-text">Email: {patient.patientEmail}</p>
                      <p className="card-text">Phone: {patient.patientPhone}</p>
                      <p className="card-text">DOB: {patient.patientDob}</p>
                      <p className="card-text">
                        Address: {patient.address.patientStreet},{" "}
                        {patient.address.patientDoor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPatient && (
          <div className="mt-4">
            <h4>Selected Patient</h4>
            <p>Name: {selectedPatient.patientName}</p>
            <p>Email: {selectedPatient.patientEmail}</p>
            <p>Phone: {selectedPatient.patientPhone}</p>
            <button className="btn btn-dark" onClick={this.deletePatient}>
              Delete Selected Patient
            </button>
          </div>
        )}

        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    );
  }
}

export default DeletePatientByName;
