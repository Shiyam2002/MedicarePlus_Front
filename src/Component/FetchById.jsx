import React, { Component } from "react";
import "../CSS/FetchByID.css"; // Make sure the CSS file is imported correctly

export default class FetchPatientById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: "", // ID to search for
      patientDetails: {
        patientName: "", // Default name
        password: "", // Default password
        patientEmail: "", // Default email
        patientPhone: "", // Default phone number
        patientDob: "", // Default date of birth
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
          coverageDetails: "", // Default coverage details
        },
      },
      loading: false, // Loading state to show spinner or message
      error: null, // Error state for failed fetch
      responseMessage: "", // Response message from the API
      status: "", // Status from the API
    };
  }

  // Function to fetch patient by ID using Promise
  fetchPatientById = (id) => {
    this.setState({ loading: true, error: null, responseMessage: "", status: "" }); // Reset loading and errors

    // Return a Promise
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/api/patient/id/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Patient not found or API error");
          }
          return response.json();
        })
        .then((data) => {
          const { Response, Status, Data } = data;

          this.setState({
            patientDetails: Data || this.state.patientDetails,
            responseMessage: Response,
            status: Status,
            loading: false,
          });
          resolve(data); // Resolve the Promise with fetched data
        })
        .catch((error) => {
          this.setState({
            loading: false,
            error: error.message,
          });
          reject(error); // Reject the Promise with an error
        });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { patientId } = this.state;
    if (patientId) {
      this.fetchPatientById(patientId)
        .then((data) => {
          console.log("Fetch successful:", data);
        })
        .catch((error) => {
          console.error("Fetch failed:", error.message);
        });
    } else {
      alert("Please enter a valid Patient ID");
    }
  };

  handleChange = (event) => {
    this.setState({ patientId: event.target.value });
  };

  render() {
    const { patientId, patientDetails, loading, error, responseMessage, status } = this.state;

    return (
      <div className="container">
        <h1>Fetch Patient Details by ID</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Patient ID</label>
            <input
              type="text"
              name="patientId"
              value={patientId}
              onChange={this.handleChange}
              placeholder="Enter Patient ID"
              required
            />
            <button type="submit" className="fetch-button">Fetch Patient</button>
          </div>
        </form>

        {loading && <p className="loading">Loading...</p>} {/* Show loading state */}
        {error && <p className="error">{error}</p>} {/* Show error message */}
        
        {/* Show Response and Status from API */}
        {responseMessage && <p className="responseMessage"><strong>Response:</strong> {responseMessage}</p>}
        {status && <p className="responseMessage"><strong>Status:</strong> {status}</p>}

        {/* Display patient details in card layout */}
        {patientDetails && (
          <div className="card">
            <h2>Patient Details</h2>
            <div className="card-content">
              <p><strong>Name:</strong> {patientDetails.patientName}</p>
              <p><strong>Password:</strong> {patientDetails.password}</p>
              <p><strong>Email:</strong> {patientDetails.patientEmail}</p>
              <p><strong>Phone:</strong> {patientDetails.patientPhone}</p>
              <p><strong>DOB:</strong> {patientDetails.patientDob}</p>
              <p><strong>Employment Status:</strong> {patientDetails.employmentStatus}</p>
              <p><strong>Annual Income:</strong> ₹{patientDetails.annualIncome}</p>

              {/* Address Details */}
              <h3>Address</h3>
              <p><strong>Door:</strong> {patientDetails.address.patientDoor}</p>
              <p><strong>Street:</strong> {patientDetails.address.patientStreet}</p>
              <p><strong>City ID:</strong> {patientDetails.address.cityID}</p>
              <p><strong>State ID:</strong> {patientDetails.address.stateID}</p>
              <p><strong>Country ID:</strong> {patientDetails.address.countryID}</p>

              {/* Insurance Details */}
              <h3>Insurance</h3>
              <p><strong>Insurance ID:</strong> {patientDetails.insurance.insuranceID}</p>
              <p><strong>Provider:</strong> {patientDetails.insurance.insuranceProvider}</p>
              <p><strong>Policy Number:</strong> {patientDetails.insurance.policyNumber}</p>
              <p><strong>Coverage Details:</strong> {patientDetails.insurance.coverageDetails}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
  