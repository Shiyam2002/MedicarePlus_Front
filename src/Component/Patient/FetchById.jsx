import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Component/button.css";

export default class FetchPatientByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: "",
      patients: [],
      selectedPatient: null,
      loading: false,
      error: null,
      responseMessage: "",
      validationError: "",
    };
  }

  // City, state, and country mappings
  cityMap = {
    1: "Salem",
    2: "Chennai",
    3: "Bangalore",
    4: "Mysore",
    5: "Trivandrum",
    6: "Kochi",
    7: "Mumbai",
    8: "Pune",
    9: "Ahmedabad",
    10: "Surat",
  };

  stateMap = {
    1: "Tamil Nadu",
    2: "Karnataka",
    3: "Kerala",
    4: "Maharashtra",
    5: "Gujarat",
  };

  countryMap = {
    1: "India",
    2: "USA",
    3: "UK",
  };

  fetchPatientsByName = (name) => {
    this.setState({
      loading: true,
      error: null,
      responseMessage: "",
      selectedPatient: null,
    });

    fetch(`http://localhost:8080/api/patient/fetchByName/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No patient found or API error");
        }
        return response.json();
      })
      .then((data) => {
        const { Response, Data } = data;
        if (!Data || (Array.isArray(Data) && Data.length === 0)) {
          this.setState({
            patients: [],
            responseMessage: "No data found",
            loading: false,
          });
        } else {
          this.setState({
            patients: Array.isArray(Data) ? Data : [Data],
            responseMessage: Response,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { patientName } = this.state;

    // Validate input
    if (!patientName.trim()) {
      this.setState({ validationError: "Please enter a patient name." });
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(patientName.trim())) {
      this.setState({ validationError: "Please enter only letters." });
      return;
    }

    this.setState({ validationError: "" }); // Clear validation error
    this.fetchPatientsByName(patientName.trim());
  };

  handleChange = (event) => {
    this.setState({ patientName: event.target.value, validationError: "" });
  };

  handleSelectPatient = (patient) => {
    this.setState({ selectedPatient: patient });
  };

  render() {
    const {
      patientName,
      patients,
      selectedPatient,
      loading,
      error,
      responseMessage,
      validationError,
    } = this.state;
    

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Fetch Patient by Name</h1>

        {/* Form to fetch patient by name */}
        <form onSubmit={this.handleSubmit} className="mb-4">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              className={`form-control ${
                validationError ? "is-invalid" : ""
              }`}
              value={patientName}
              onChange={this.handleChange}
              placeholder="Enter patient name"
            />
            {/* Validation Message */}
            {validationError && (
              <div className="invalid-feedback">{validationError}</div>
            )}
          </div>
          <button type="submit" className=" button-26 mt-2"
          >
            Fetch Patient
          </button>
        </form>

        {/* Loading, Error, and Response Messages */}
        {loading && <p className="text-info">Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {responseMessage && <p className="text-success">{responseMessage}</p>}

        

        {/* Display Multiple Patients in Cards */}
        {patients.length > 0 && !selectedPatient && (
          <div className="row">
            {patients.map((patient, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{patient.patientName}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {patient.patientEmail} <br />
                      <strong>Phone:</strong> {patient.patientPhone}
                    </p>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => this.handleSelectPatient(patient)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Display Selected Patient Details */}
        {selectedPatient && (
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Patient Details</h2>
              <p>
                <strong>Name:</strong> {selectedPatient.patientName} <br />
                <strong>Email:</strong> {selectedPatient.patientEmail} <br />
                <strong>Phone:</strong> {selectedPatient.patientPhone} <br />
                <strong>DOB:</strong> {selectedPatient.patientDob} <br />
                <strong>Employment Status:</strong>{" "}
                {selectedPatient.employmentStatus} <br />
                <strong>Annual Income:</strong> ₹{selectedPatient.annualIncome}{" "}
                <br />
              </p>
              <h4>Address</h4>
              <p>
                <strong>Door:</strong> {selectedPatient.address.patientDoor}{" "}
                <br />
                <strong>Street:</strong> {selectedPatient.address.patientStreet}{" "}
                <br />
                <strong>City:</strong> {this.cityMap[selectedPatient.address.cityID]} <br />
                <strong>State:</strong> {this.stateMap[selectedPatient.address.stateID]} <br />
                <strong>Country:</strong> {this.countryMap[selectedPatient.address.countryID]}{" "}
                <br />
              </p>
              <h4>Insurance</h4>
              <p>
                <strong>Insurance ID:</strong>{" "}
                {selectedPatient.insurance.insuranceID} <br />
                <strong>Provider:</strong>{" "}
                {selectedPatient.insurance.insuranceProvider} <br />
                <strong>Policy Number:</strong>{" "}
                {selectedPatient.insurance.policyNumber} <br />
                <strong>Coverage:</strong> {selectedPatient.insurance.coverageDetails}{" "}
                <br />
              </p>
              <button
                className="btn btn-outline-dark mt-2"
                onClick={() => this.setState({ selectedPatient: null })}
              >
                Back to List
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
