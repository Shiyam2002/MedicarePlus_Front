import React, { Component } from "react";

class UpdatePatientByName extends Component {
  state = {
    name: "",
    patients: [],
    selectedPatient: null,
    updatedPatient: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      patientDob: "",
      employmentStatus: "", // Default employment status
      annualIncome: "", // Default annual income
      address: {
        patientDoor: "", // Default door number
        patientStreet: "", // Default street name
        cityID: "", // Default city ID
        stateID: "", // Default state ID
        countryID: "", // Default country ID
      },
      insurance: {
        insuranceID: "", // Default insurance ID
        insuranceProvider: "", // Default insurance provider
        policyNumber: "", // Default policy number
        coverageDetails: "",
      }
    },
    message: "",
    error: "",
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

        if (responseData.Data && Array.isArray(responseData.Data)) {
          this.setState({ patients: responseData.Data, error: "", message: "" });
        } else {
          this.setState({
            error: "No patients found with the given name.",
            patients: [],
            message: "",
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
    this.setState({
      selectedPatient: patient,
      updatedPatient: { ...patient }, // Populate the form with current data
      error: "",
      message: ""
    });
  };

  // Handle update request
  updatePatient = async () => {
    const { selectedPatient, updatedPatient } = this.state;

    if (!selectedPatient) {
      this.setState({
        error: "Please select a patient to update.",
        message: "",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/updatePatient/${selectedPatient.patientID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (response.ok) {
        this.setState({
          message: `Patient with ID ${selectedPatient.patientID} updated successfully.`,
          error: "",
        });
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to update patient.",
          message: "",
        });
      }
    } catch (error) {
      this.setState({
        error: "An error occurred while updating the patient.",
        message: "",
      });
    }
  };

  // Handle field changes for updating patient
  handleFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      updatedPatient: {
        ...prevState.updatedPatient,
        [name]: value,
      },
    }));
  };

  render() {
    const { name, patients, selectedPatient, updatedPatient, message, error } = this.state;

    return (
      <div className="container mt-4">
        <h2>Update Patient by Name</h2>
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
          className="button-26 mt-2"
          onClick={this.fetchPatientsByName}
          
        >
          Fetch Patients
        </button>
        

        {patients.length > 0 && (
          <div className="mt-4">
            <h4>Select a Patient to Update</h4>
            <div className="row">
              {patients.map((patient) => (
                <div className="col-md-4" key={patient.patientID}>
                  <div
                    className={`card ${selectedPatient && selectedPatient.patientID === patient.patientID ? "border-dark" : ""}`}
                    onClick={() => this.selectPatient(patient)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
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
            <h4>Update Patient Details</h4>
            <div className="form-group">
            <h4> Patient Details</h4>
              <label htmlFor="patientName">Name:</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-control"
                value={updatedPatient.patientName}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientEmail">Email:</label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                className="form-control"
                value={updatedPatient.patientEmail}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientPhone">Phone:</label>
              <input
                type="text"
                id="patientPhone"
                name="patientPhone"
                className="form-control"
                value={updatedPatient.patientPhone}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">DOB:</label>
              <input
                type="date"
                id="patientDob"
                name="patientDob"
                className="form-control"
                value={updatedPatient.patientDob}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientEmploymentStatus">Employment Status:</label>
              <input
                type="text"
                id="employmentStatus"
                name="employmentStatus"
                className="form-control"
                value={updatedPatient.employmentStatus}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Annual Income:</label>
              <input
                type="number"
                id="annualIncome"
                name="annualIncome"
                className="form-control"
                value={updatedPatient.annualIncome}
                onChange={this.handleFieldChange}
              />
            </div>
            <h4> Address Details</h4>
            <div className="form-group">
              <label htmlFor="patientDob">Door No:</label>
              <input
                type="text"
                id="patientDoorNo"
                name="patientDoorNo"
                className="form-control"
                value={updatedPatient.address.patientDoor}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Street :</label>
              <input
                type="text"
                id="patientStreet"
                name="patientStreet"
                className="form-control"
                value={updatedPatient.address.patientStreet}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">City:</label>
              <input
                type="text"
                id="patientCity"
                name="patientCity"
                className="form-control"
                value={updatedPatient.address.cityID}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">State:</label>
              <input
                type="text"
                id="patientState"
                name="patientState"
                className="form-control"
                value={updatedPatient.address.stateID}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Country:</label>
              <input
                type="text"
                id="patientCountry"
                name="patientCountry"
                className="form-control"
                value={updatedPatient.address.countryID}
                onChange={this.handleFieldChange}
              />
            </div>
            <h4> Insurance Details</h4>
            <div className="form-group">
              <label htmlFor="patientDob">Insurance ID:</label>
              <input
                type="text"
                id="patientInsuranceID"
                name="patientInsuranceID"
                className="form-control"
                value={updatedPatient.insurance.insuranceID}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Insurance Provider:</label>
              <input
                type="text"
                id="patientInsuranceProvider"
                name="patientInsuranceProvider"
                className="form-control"
                value={updatedPatient.insurance.insuranceProvider}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Policy Number:</label>
              <input
                type="text"
                id="patientInsurancePolicyNumber"
                name="patientInsurancePolicyNumber"
                className="form-control"
                value={updatedPatient.insurance.policyNumber}
                onChange={this.handleFieldChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Coverage Details:</label>
              <input
                type="text"
                id="CoverageDetails"
                name="CoverageDetails"
                className="form-control"
                value={updatedPatient.insurance.coverageDetails}
                onChange={this.handleFieldChange}
              />
            </div>
            <button className="btn  mt-2" onClick={this.updatePatient} style={{
                    backgroundColor: "#1A1A1A",
                    color: "#fff"}}>
              Update Patient
            </button>
          </div>
        )}

        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    );
  }
}

export default UpdatePatientByName;