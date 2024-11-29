import React, { Component } from "react";

export default class Reports extends Component {
  state = {
    queryResults: null,
    currentQuery: "",
    error: null,
    loading: false,
  };

  fetchQueryResults = async (endpoint, queryName) => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8080/api/patient/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({
        queryResults: data,
        currentQuery: queryName,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  renderPatientDetails = (patient) => {
    return (
      <div key={patient.patientEmail} style={{ marginBottom: "20px" }}>
        <h3>{patient.patientName}</h3>
        <p><strong>Email:</strong> {patient.patientEmail}</p>
        <p><strong>Phone:</strong> {patient.patientPhone}</p>
        <p><strong>DOB:</strong> {patient.patientDob}</p>
        <p><strong>Employment Status:</strong> {patient.employmentStatus}</p>
        <p><strong>Annual Income:</strong> ₹{patient.annualIncome}</p>

        <div>
          <h4>Address</h4>
          <p><strong>Door:</strong> {patient.address.patientDoor}</p>
          <p><strong>Street:</strong> {patient.address.patientStreet}</p>
          <p><strong>City ID:</strong> {patient.address.cityID}</p>
          <p><strong>State ID:</strong> {patient.address.stateID}</p>
          <p><strong>Country ID:</strong> {patient.address.countryID}</p>
        </div>

        <div>
          <h4>Insurance</h4>
          <p><strong>Insurance ID:</strong> {patient.insurance.insuranceID}</p>
          <p><strong>Provider:</strong> {patient.insurance.insuranceProvider}</p>
          <p><strong>Policy Number:</strong> {patient.insurance.policyNumber}</p>
          <p><strong>Coverage Details:</strong> {patient.insurance.coverageDetails}</p>
        </div>
      </div>
    );
  };

  renderOrderedPatients = (patient) => {
    return (
      <div key={patient.patientEmail} style={{ marginBottom: "20px" }}>
        <h3>{patient.patientName}</h3>
        <p><strong>Email:</strong> {patient.patientEmail}</p>
      </div>
    );
  };

  renderEmployeeCount = (data) => {
    return (
      <div key={data.employmentStatus} style={{ marginBottom: "20px" }}>
        <h3>{data.employmentStatus}</h3>
        <p><strong>Employee Count:</strong> {data.employeeCount}</p>
      </div>
    );
  };

  renderPatientCount = (count) => {
    return (
      <div style={{ marginBottom: "20px" }}>
        <h3>Total Number of Patients</h3>
        <p><strong>Count:</strong> {count}</p>
      </div>
    );
  };

  render() {
    const { queryResults, currentQuery, error, loading } = this.state;

    const queryList = [
      { name: "Left Join Providers", endpoint: "LeftJoin" },
      { name: "Right Join Providers", endpoint: "RightJoin" },
      { name: "Inner Join Providers", endpoint: "InnerJoin" },
      { name: "Join Providers", endpoint: "Join" },
      { name: "Named Query 1", endpoint: "NameQuery01" },
      { name: "Named Query 2", endpoint: "NameQuery02" },
      { name: "Ordered Patients", endpoint: "PatientOrderBy" },
      { name: "Count Employees", endpoint: "CountEmployee" },
      { name: "Count", endpoint: "Count" },
    ];

    return (
      <div style={{ padding: "20px" }}>
        <h1>Custom Queries</h1>
        <div style={{ marginBottom: "20px" }}>
          {queryList.map((query, index) => (
            <button
              key={index}
              onClick={() => this.fetchQueryResults(query.endpoint, query.name)}
              style={{
                margin: "5px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {query.name}
            </button>
          ))}
        </div>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {queryResults && currentQuery === "Left Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Right Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Inner Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Named Query 1" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}
          {queryResults && currentQuery === "Named Query 2" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}
          {/* Added handling for "Ordered Patients" query */}
          {queryResults && currentQuery === "Ordered Patients" && (
            <div>
              <h2>Ordered Patients</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderOrderedPatients)}
              </div>
            </div>
          )}
          {/* Added handling for "Count Employees" query */}
          {queryResults && currentQuery === "Count Employees" && (
            <div>
              <h2>Employee Count by Employment Status</h2>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderEmployeeCount)}
              </div>
            </div>
          )}
          {/* Added handling for "Count" query */}
          {queryResults && currentQuery === "Count" && (
            <div>
              <h2>Total Patient Count</h2>
              <div>
                {queryResults.Data && (
                  <div>{this.renderPatientCount(queryResults.Data)}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
