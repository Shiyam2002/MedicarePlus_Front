import React, { Component } from "react";
import "../CSS/FetchByID.css"; // Ensure the CSS file is imported correctly

export default class UpdatePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: "", // ID entered by the user
      patientData: null, // Data fetched from the API
      updatedData: {
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        patientDob: "",
        employmentStatus: "",
        annualIncome: "",
        address: {
          patientDoor: "",
          patientStreet: "",
          cityID: "",
          stateID: "",
          countryID: "",
        },
        insurance: {
          insuranceID: "",
          insuranceProvider: "",
          coverageDetails: "",
          policyNumber: "",
        },
      },
      isPatientExist: false,
      loading: false, // For loading state
      error: null, // For error state
      responseMessage: "", // Response message from API
      status: "", // Status from API
    };
  }

  // Function to fetch patient by ID using Promise
  fetchPatientById = (id) => {
    this.setState({ loading: true, error: null, responseMessage: "", status: "" }); // Reset loading and errors

    fetch(`http://localhost:8080/api/patient/id/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Patient not found");
        }
        return response.json();
      })
      .then((data) => {
        const { Response, Status, Data } = data;

        this.setState({
          patientData: Data || this.state.patientData,
          responseMessage: Response,
          status: Status,
          loading: false,
          isPatientExist: true,
        });
        this.populateForm(Data); // Populate the form with fetched data
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
          isPatientExist: false,
          patientData: null,
        });
      });
  };

  // Populate form with fetched data
  populateForm = (data) => {
    this.setState({
      updatedData: {
        patientName: data.patientName || "",
        patientEmail: data.patientEmail || "",
        patientPhone: data.patientPhone || "",
        patientDob: data.patientDob || "",
        employmentStatus: data.employmentStatus || "",
        annualIncome: data.annualIncome || "",
        address: {
          patientDoor: data.address?.patientDoor || "",
          patientStreet: data.address?.patientStreet || "",
          cityID: data.address?.cityID || "",
          stateID: data.address?.stateID || "",
          countryID: data.address?.countryID || "",
        },
        insurance: {
          insuranceID: data.insurance?.insuranceID || "",
          insuranceProvider: data.insurance?.insuranceProvider || "",
          coverageDetails: data.insurance?.coverageDetails || "",
          policyNumber: data.insurance?.policyNumber || "",
        },
      },
    });
  };

  // Handle input field changes for both main fields and nested fields (address, insurance)
  handleInputChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split(".");

    if (subKey) {
      // Handles nested fields like address and insurance
      this.setState((prevState) => ({
        updatedData: {
          ...prevState.updatedData,
          [mainKey]: {
            ...prevState.updatedData[mainKey],
            [subKey]: value,
          },
        },
      }));
    } else {
      // Handles top-level fields
      this.setState((prevState) => ({
        updatedData: {
          ...prevState.updatedData,
          [name]: value,
        },
      }));
    }
  };

  // Update patient details via API
  updatePatientDetails = () => {
    const { updatedData, patientId } = this.state;

    fetch(`http://localhost:8080/api/patient/updatePatient/${patientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert("Patient updated successfully!");
        } else {
          alert("Error updating patient!");
        }
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
        alert("An error occurred while updating the patient.");
      });
  };

  // Handle patient ID change
  handleIdChange = (e) => {
    this.setState({ patientId: e.target.value });
  };

  // Handle form submission to fetch patient data
  handleSubmit = (event) => {
    event.preventDefault();
    const { patientId } = this.state;
    if (patientId) {
      this.fetchPatientById(patientId);
    } else {
      alert("Please enter a valid Patient ID");
    }
  };

  render() {
    const { isPatientExist, patientData, updatedData, loading, error, responseMessage, status } = this.state;

    return (
      <div className="container">
        <h2>Update Patient Details</h2>

        {/* Input for Patient ID */}
        <div className="form-group">
          <label>Patient ID:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.patientId}
            onChange={this.handleIdChange}
            placeholder="Enter patient ID"
          />
          <button onClick={this.handleSubmit} className="btn btn-primary mt-2">
            Fetch Patient Details
          </button>
        </div>

        {loading && <p className="loading">Loading...</p>} {/* Show loading state */}
        {error && <p className="error">{error}</p>} {/* Show error message */}
        
        {/* Show Response and Status from API */}
        {responseMessage && <p className="responseMessage"><strong>Response:</strong> {responseMessage}</p>}
        {status && <p className="responseMessage"><strong>Status:</strong> {status}</p>}

        {isPatientExist ? (
          <>
            {/* Display Current Patient Details */}
            {/* <div className="current-details mt-4">
              <h3>Current Patient Details</h3>
              <p><strong>Name:</strong> {patientData.patientName}</p>
              <p><strong>Email:</strong> {patientData.patientEmail}</p>
              <p><strong>Phone:</strong> {patientData.patientPhone}</p>
              <p><strong>DOB:</strong> {patientData.patientDob}</p>
              <p><strong>Employment Status:</strong> {patientData.employmentStatus}</p>
              <p><strong>Annual Income:</strong> ₹{patientData.annualIncome}</p>
              <h4>Address</h4>
              <p><strong>Door:</strong> {patientData.address?.patientDoor}</p>
              <p><strong>Street:</strong> {patientData.address?.patientStreet}</p>
              <p><strong>City ID:</strong> {patientData.address?.cityID}</p>
              <p><strong>State ID:</strong> {patientData.address?.stateID}</p>
              <p><strong>Country ID:</strong> {patientData.address?.countryID}</p>
              <h4>Insurance</h4>
              <p><strong>Insurance ID:</strong> {patientData.insurance?.insuranceID}</p>
              <p><strong>Provider:</strong> {patientData.insurance?.insuranceProvider}</p>
              <p><strong>Coverage Details:</strong> {patientData.insurance?.coverageDetails}</p>
              <p><strong>Policy Number:</strong> {patientData.insurance?.policyNumber}</p>
            </div> */}

            {/* Editable Fields */}
            <form onSubmit={this.updatePatientDetails} className="mt-4">
              <h3>Edit Patient Details</h3>

              {/* Basic Patient Details */}
              <div className="form-group">
                <label>Patient Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="patientName"
                  value={updatedData.patientName}
                  onChange={this.handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="patientEmail"
                  value={updatedData.patientEmail}
                  onChange={this.handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  name="patientPhone"
                  value={updatedData.patientPhone}
                  onChange={this.handleInputChange}
                  placeholder="Enter phone"
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  name="patientDob"
                  value={updatedData.patientDob}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Employment Status:</label>
                <input
                  type="text"
                  className="form-control"
                  name="employmentStatus"
                  value={updatedData.employmentStatus}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Annual Income:</label>
                <input
                  type="number"
                  className="form-control"
                  name="annualIncome"
                  value={updatedData.annualIncome}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              {/* Address Details */}
              <h4>Address</h4>
              <div className="form-group">
                <label>Door:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address.patientDoor"
                  value={updatedData.address.patientDoor}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Street:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address.patientStreet"
                  value={updatedData.address.patientStreet}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address.cityID"
                  value={updatedData.address.cityID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>State ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address.stateID"
                  value={updatedData.address.stateID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Country ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address.countryID"
                  value={updatedData.address.countryID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              {/* Insurance Details */}
              <h4>Insurance</h4>
              <div className="form-group">
                <label>Insurance ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurance.insuranceID"
                  value={updatedData.insurance.insuranceID}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Provider:</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurance.insuranceProvider"
                  value={updatedData.insurance.insuranceProvider}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Coverage Details:</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurance.coverageDetails"
                  value={updatedData.insurance.coverageDetails}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Policy Number:</label>
                <input
                  type="text"
                  className="form-control"
                  name="insurance.policyNumber"
                  value={updatedData.insurance.policyNumber}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success mt-3">
                Update Patient Details
              </button>
            </form>
          </>
        ) : (
          <p className="no-patient">No patient found with the given ID.</p>
        )}
      </div>
    );
  }
}
