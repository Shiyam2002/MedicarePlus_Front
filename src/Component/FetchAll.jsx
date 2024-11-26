import React, { Component } from "react";

export default class FetchAllPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [], // Initialize as empty
      loading: false, // For loading state
      error: null, // For error messages
    };
  }

  // Fetch all patients from the API using Promises
  fetchAllPatients = () => {
    this.setState({ loading: true, error: null }); // Reset loading and errors

    // Wrapping fetch in a Promise for explicit usage
    const fetchPatientsPromise = new Promise((resolve, reject) => {
      fetch("http://localhost:8080/api/patient/patientList")
        .then((response) => {
          if (!response.ok) {
            reject("Failed to fetch patients or API error");
          }
          return response.json();
        })
        .then((data) => {
          if (data?.Data) {
            resolve(data.Data); // Resolve with patients data
          } else {
            reject("Invalid API response structure");
          }
        })
        .catch((error) => reject(error.message));
    });

    // Handling the promise
    fetchPatientsPromise
      .then((patients) => {
        this.setState({
          patients, // Set fetched patients
          loading: false, // Set loading to false
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error, // Store error message
        });
      });
  };

  componentDidMount() {
    this.fetchAllPatients(); // Fetch all patients on component mount
  }

  render() {
    const { patients, loading, error } = this.state;

    return (
      <div>
        <h1>All Patients</h1>
        {loading && <p>Loading...</p>} {/* Show loading state */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message */}
        {!loading && !error && patients.length === 0 && (
          <p>No patients found.</p>
        )}
        {!loading && !error && patients.length > 0 && (
          <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Employment Status</th>
                <th>Annual Income</th>
                <th>Door</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Insurance ID</th>
                <th>Provider</th>
                <th>Policy Number</th>
                <th>Coverage Details</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.patientName}</td>
                  <td>{patient.patientEmail}</td>
                  <td>{patient.patientPhone}</td>
                  <td>{patient.patientDob}</td>
                  <td>{patient.employmentStatus}</td>
                  <td>{patient.annualIncome}</td>
                  <td>{patient.address.patientDoor}</td>
                  <td>{patient.address.patientStreet}</td>
                  <td>{patient.address.cityID}</td>
                  <td>{patient.address.stateID}</td>
                  <td>{patient.address.countryID}</td>
                  <td>{patient.insurance.insuranceID}</td>
                  <td>{patient.insurance.insuranceProvider}</td>
                  <td>{patient.insurance.policyNumber}</td>
                  <td>{patient.insurance.coverageDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
